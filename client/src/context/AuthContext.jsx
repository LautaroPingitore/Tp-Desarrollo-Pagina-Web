import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
  const usuarioGuardado = localStorage.getItem('usuario');

  if (usuarioGuardado && usuarioGuardado !== 'undefined') {
    try {
      setUsuario(JSON.parse(usuarioGuardado));
    } catch (error) {
      console.error('Error al parsear usuario:', error);
      localStorage.removeItem('usuario'); // limpiar si está corrupto
    }
  }
}, []);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};