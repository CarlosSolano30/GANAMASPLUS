import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { correo });
      localStorage.setItem("ganaplus_usuario", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Correo no encontrado o error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Iniciar sesión - Gana+</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button className="btn">Iniciar sesión</button>
      </form>
    </div>
  );
}
