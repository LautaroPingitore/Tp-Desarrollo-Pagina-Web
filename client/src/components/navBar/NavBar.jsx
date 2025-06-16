import React, { useRef, useEffect, useState } from "react";
import './NavBar.css'; // Asegúrate de tener este archivo CSS para los estilos


const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const menuRef = useRef(null);

  // Cierra el menú si se hace clic fuera
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
  }, [menuOpen]);

    
    return (
        <nav className="bg-black text-gray-100 w-full flex relative justify-between items-center mx-auto px-8 h-20 border-b border-gray-700">
            <div className="inline-flex">
                <a className="_o6689fn" href="/"
                    ><div className="md:block">
                            <img src="./public/image.png" className="tamanioLogo"  ></img>
                    </div>
                </a>
            </div>


          

            <div className="flex-initial">
                <div className="flex justify-end items-center relative">
                
                    <div className="flex mr-4 items-center">
                
                    
                    </div>

                    <div className="block">
                        <div className="inline relative">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex items-center relative px-2 border border-gray-700 rounded-full hover:bg-gray-700 hover:shadow-lg"
                        >
                            {/* Íconos del botón */}
                            <div className="pl-1">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', overflow: 'visible' }}
                                >
                                    <g fill="none" fillRule="nonzero">
                                        <path d="m2 16h28"></path>
                                        <path d="m2 24h28"></path>
                                        <path d="m2 8h28"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}
                                >
                                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                                </svg>
                            </div>
                        </button>                        {menuOpen && (
                            <div ref={menuRef} className="absolute right-0 z-[99999] mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-white/20 focus:outline-hidden" role="menu" aria-orientation="vertical">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-300">Sign in</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-300">Settings</a>
                            </div>
                        )}
                    </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}



export default NavBar;