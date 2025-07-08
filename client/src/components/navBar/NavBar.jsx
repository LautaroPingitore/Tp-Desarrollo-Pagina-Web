import React, { useRef, useEffect, useState, useContext } from "react";
import './NavBar.css';
import { Search, Menu, User, Globe, Bell, Home, Plus, Calendar, Settings } from 'lucide-react';

import LoginModal from "../loginModal/loginModal";
import { AuthContext } from "../../context/authContext"; // Ajustá si tu path cambia
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const onSelect = (alojamiento) => {
        navigate(`/misAlojamientos/${usuario.data.id}`, { 
            state: { alojamiento } 
        });
    }


    const onMisReservas = (idUsuario) => {
        navigate(`/misReservas/${usuario.data.id}`, { 
            state: { idUsuario } 
        });
    }

    const onMisNotificaciones = (idUsuario) => {
        navigate(`/misNotificaciones/${usuario.data.id}`, { 
            state: { idUsuario } 
        });
    }

  const [menuOpen, setMenuOpen] = useState(false);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const menuRef = useRef(null);

  const { usuario, logout , tipoUsuario} = useContext(AuthContext); // Acceder al usuario y logout

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMenuOpen(false);
  };

  const closeLoginModal = () => setLoginModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, tipoUsuario]);

  return (
    console.log(usuario),
    <>
      <nav className="bg-black text-gray-100 w-full flex relative justify-between items-center mx-auto px-8 h-20 border-b border-gray-700">
        <div className="inline-flex">
          <a className="_o6689fn" href="/">
            <div className="md:block">
              <img src="./public/image.png" className="tamanioLogo" alt="Logo" />
            </div>
          </a>
        </div>

        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="block">
              <div className="inline relative">
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="inline-flex items-center relative px-2 border border-gray-700 rounded-full hover:bg-gray-700 hover:shadow-lg"
                >
                  <div className="pl-1">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                      style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor' }}>
                      <g fill="none" fillRule="nonzero">
                        <path d="m2 16h28"></path>
                        <path d="m2 24h28"></path>
                        <path d="m2 8h28"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                      style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                    </svg>
                  </div>
                </button>

                {menuOpen && (
                  <>
                  <div
                    ref={menuRef}
                    className="absolute right-0 z-[99999] mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-white/20 focus:outline-hidden"
                  >
                     <div className="py-2">
                     
                    {!usuario ? (
                      <>
                      <button
                            onClick={openLoginModal}
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors font-medium"
                          >
                            Log in
                          </button>
                          <button
                            onClick={openLoginModal}
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors"
                          >
                            Sign up
                          </button>
                      
                        
                      </>
                    ) : (
                      <>
                       <div className="text-left px-4 py-1 border-b border-gray-800">
                            <p className="text-white font-medium leading-none mb-[30px]">{usuario.data.nombre}</p>
                            <p className="text-gray-400 text-sm capitalize leading-none">{tipoUsuario}</p>
                        </div>
                          
                          <button
                            onClick={() => onMisNotificaciones(usuario.data.id)}
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors flex items-center space-x-3"
                          >
                            <Bell className="h-4 w-4" />
                            <span>Notificaciones</span>
                          </button>

                          {tipoUsuario === 'anfitrion' && (
                            <>
                              <button
                              onClick={() => onSelect(usuario.data.id)}
                                className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors flex items-center space-x-3"
                              >
                                <Home className="h-4 w-4" />
                                <span>Mis alojamientos</span>
                              </button>
                              <button
                                className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors flex items-center space-x-3"
                              >
                                <Plus className="h-4 w-4" />
                                <span>Crear alojamiento</span>
                              </button>
                            </>
                          )}
                        <button
                            onClick={() => onMisReservas(usuario.data.id)}
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors flex items-center space-x-3"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>Mis reservas</span>
                          </button>

                          <button
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors flex items-center space-x-3"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Configuración</span>
                          </button>
                          <div className="border-t border-gray-800 my-2"></div>
                        <button
                                onClick={() => {
                                  logout();
                                  navigate('/');
                                  setMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors"
                              >
                                Cerrar sesión
                          </button>
                    </>
                  )}
                  </div>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default NavBar;