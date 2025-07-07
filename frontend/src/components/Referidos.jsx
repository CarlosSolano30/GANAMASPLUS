axios.get(`${import.meta.env.VITE_API_URL}/api/users/referidos/${usuario.userId}`);
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

function Referidos() {
  const [referidos, setReferidos] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/referidos/${userId}`)
      .then(res => setReferidos(res.data));
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">👥 Tus Referidos</h2>
        <ul className="space-y-3">
          {referidos.map(r => (
            <li key={r._id} className="bg-white p-4 rounded-xl shadow">
              <p className="font-semibold text-gray-800">{r.nombre}</p>
              <p className="text-sm text-gray-500">{r.correo}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Referidos;
