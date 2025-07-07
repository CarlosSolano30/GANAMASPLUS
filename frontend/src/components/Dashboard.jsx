import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Dashboard() {
  const [nombre, setNombre] = useState('');
  const [puntos, setPuntos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Usuario';
    setNombre(name);
    setPuntos(0); // Reemplazar por puntos reales si tienes backend listo
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hola, {nombre} 👋</h2>
          <p className="text-gray-600 mb-4">Tienes <span className="text-blue-600 font-semibold">{puntos}</span> puntos</p>

          <div className="space-y-3">
            <button className="btn" onClick={() => navigate('/referidos')}>👥 Ver Referidos</button>
            <button className="btn" onClick={() => navigate('/historial')}>📜 Historial de Retiros</button>
            <button className="btn" onClick={() => navigate('/retiro')}>💰 Solicitar Retiro</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
