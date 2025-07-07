import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('userName');
    if (nombreGuardado) setUserName(nombreGuardado);
  }, []);

  const salir = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600">Gana+</h1>
      <nav className="flex flex-wrap gap-4 mt-3 md:mt-0 text-gray-700 font-medium">
        <Link to="/dashboard" className="hover:text-blue-600">Inicio</Link>
        <Link to="/referidos" className="hover:text-blue-600">Referidos</Link>
        <Link to="/historial" className="hover:text-blue-600">Historial</Link>
        <Link to="/retiro" className="hover:text-blue-600">Retiros</Link>
        <button onClick={salir} className="hover:text-red-500">Salir</button>
      </nav>
    </header>
  );
}

export default Header;
