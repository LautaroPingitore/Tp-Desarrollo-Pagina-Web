import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const tipoGuardado = localStorage.getItem('tipoUsuario');

    if (usuarioGuardado && usuarioGuardado !== 'undefined') {
      try {
        const userParsed = JSON.parse(usuarioGuardado);
        setUsuario(userParsed);
        if (tipoGuardado) {
          setTipoUsuario(tipoGuardado); // cargar tipo si existe
        } else if (userParsed?.tipo) {
          setTipoUsuario(userParsed.tipo); // usar tipo dentro del objeto usuario si existe
        }
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        localStorage.removeItem('usuario');
        localStorage.removeItem('tipoUsuario');
      }
    }
  }, []);

  const login = (usuarioData, tipo) => {
    setUsuario(usuarioData);
    setTipoUsuario(tipo)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    localStorage.setItem('tipoUsuario', tipo)
  };

  const logout = () => {
    setUsuario(null);
    setTipoUsuario(null);
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('usuario');
  };

  const cambiarTipoUsuario = (tipo) => {
    setTipoUsuario(tipo);
    localStorage.setItem('tipoUsuario', tipo);
  };


  return (
    <AuthContext.Provider value={{ usuario, login, logout, cambiarTipoUsuario, tipoUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
