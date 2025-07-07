import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Retiro() {
  const [usuario, setUsuario] = useState(null);
  const [monto, setMonto] = useState("");
  const [metodo, setMetodo] = useState("nequi");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("ganaplus_usuario"));
    setUsuario(storedUser);
  }, []);

  const solicitarRetiro = async (e) => {
    e.preventDefault();

    const valor = parseInt(monto);
    if (isNaN(valor) || valor < 25000) {
      return alert("El retiro mínimo es de 25.000 COP");
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/retiros`, {
        userId: usuario.userId,
        monto: valor,
        metodo,
      });

      alert("Retiro solicitado exitosamente");
      setMonto("");
    } catch (err) {
      alert("Error al solicitar el retiro: " + err.response?.data?.message || "");
    }
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Solicitar Retiro</h2>
      <form onSubmit={solicitarRetiro} className="space-y-4">
        <input
          type="number"
          placeholder="Monto (COP)"
          className="w-full border p-2 rounded"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
        <select
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="nequi">Nequi</option>
          <option value="paypal">PayPal</option>
        </select>
        <button className="btn">Solicitar Retiro</button>
      </form>
    </div>
  );
}

