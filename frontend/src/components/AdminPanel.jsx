
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [retiros, setRetiros] = useState([]);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("ganaplus_admin");
    if (stored) {
      setAdmin(JSON.parse(stored));
      fetchRetiros();
    } else {
      const correo = prompt("Correo de administrador:");
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/admin/login`, { correo })
        .then((res) => {
          localStorage.setItem("ganaplus_admin", JSON.stringify(res.data.admin));
          setAdmin(res.data.admin);
          fetchRetiros();
        })
        .catch(() => alert("Acceso denegado"));
    }
  }, []);

  const fetchRetiros = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/retiros`)
      .then((res) => setRetiros(res.data))
      .catch(() => alert("Error al obtener retiros"));
  };

  const cambiarEstado = (id, estado) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/admin/retiros/${id}`, { estado })
      .then(() => fetchRetiros())
      .catch(() => alert("Error al actualizar estado"));
  };

  if (!admin) return <p className="p-4">Verificando acceso...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>
      {retiros.length === 0 ? (
        <p>No hay retiros pendientes.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Usuario</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Método</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {retiros.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.userId?.nombre}</td>
                <td className="p-2">{r.userId?.correo}</td>
                <td className="p-2 text-center">${r.monto}</td>
                <td className="p-2 text-center">{r.metodo}</td>
                <td className="p-2 text-center">
                  <button className="btn bg-green-500" onClick={() => cambiarEstado(r._id, "aprobado")}>✔️ Aprobar</button>
                  <button className="btn bg-red-500 ml-2" onClick={() => cambiarEstado(r._id, "rechazado")}>❌ Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
