import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Historial() {
  const [retiros, setRetiros] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("ganaplus_usuario"));
    setUsuario(storedUser);

    if (storedUser) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/retiros/${storedUser.userId}`)
        .then((res) => setRetiros(res.data))
        .catch(() => alert("Error al cargar historial"));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Historial de Retiros</h2>
      {retiros.length === 0 ? (
        <p>No has realizado retiros todavía.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2">Método</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {retiros.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{new Date(r.fecha).toLocaleDateString()}</td>
                <td className="p-2 text-center">{r.metodo}</td>
                <td className="p-2 text-center">${r.monto}</td>
                <td className="p-2 text-center capitalize">{r.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
