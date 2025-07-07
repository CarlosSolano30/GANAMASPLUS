import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    referidoPor: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/registro`,
        form
      );
      localStorage.setItem("ganaplus_usuario", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Registro - Gana+</h2>
      <form onSubmit={handleRegistro} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={form.correo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="referidoPor"
          placeholder="Código de referido (opcional)"
          value={form.referidoPor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button className="btn">Registrarse</button>
      </form>
    </div>
  );
}
