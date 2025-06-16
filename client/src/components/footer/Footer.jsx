const Footer = () => {
    return (
        <footer className="footer w-full bg-black text-white border-t border-gray-700">
            <div className="w-full container mx-auto px-4 py-6 bg-black">
                <div className="flex flex-col items-center">
                    <p className="text-gray-400 text-sm mb-2">© 2025 Grupo 2. Lautaro Pingitore, Franco Vinaccia, Facundo Soca, Luka Portnoi, Santino Bouvet.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">Política de privacidad</a>
                        <a href="#" className="text-gray-400 hover:text-white">Términos de servicio</a>
                        <a href="#" className="text-gray-400 hover:text-white">Contacto</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;