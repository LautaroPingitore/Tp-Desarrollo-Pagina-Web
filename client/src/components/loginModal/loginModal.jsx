import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Home } from 'lucide-react';

const loginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('guest');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-black border border-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800 sticky top-0 bg-black z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Iniciar Sesión
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-900 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('guest')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 sm:py-4 text-sm font-medium transition-colors ${
              activeTab === 'guest'
                ? 'text-emerald-300 border-b-2 border-emerald-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Huésped</span>
          </button>
          <button
            onClick={() => setActiveTab('host')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 sm:py-4 text-sm font-medium transition-colors ${
              activeTab === 'host'
                ? 'text-emerald-300 border-b-2 border-emerald-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Anfitrión</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full !text-black bg-gradient-to-r from-emerald-300 to-emerald-400 hover:from-emerald-400 hover:to-emerald-500 cursor-pointer font-semibold py-3 rounded-lg hover:bg-emerald-400 transition-colors text-sm sm:text-base"
            >
              {isLogin 
                ? `Iniciar Sesión` 
                : `Registrarse`
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">o</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="!text-white cursor-pointer hover:text-emerald-400 font-medium transition-colors"
              >
                {isLogin ? 'Sign in' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginModal;