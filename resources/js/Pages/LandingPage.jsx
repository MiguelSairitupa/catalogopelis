import React from 'react';
import { Link } from '@inertiajs/react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">Bienvenido a <span className="text-red-500">MovieCatalog</span></h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">Tu plataforma para explorar, guardar y disfrutar de tus películas favoritas. Descubre nuevas historias y comparte tus experiencias.</p>
        
        <div className="flex justify-center gap-6">
          <Link 
            href="/register" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Regístrate Gratis
          </Link>
          <Link 
            href="/login" 
            className="bg-transparent hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg border-2 border-white text-lg transition duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">¿Por qué elegirnos?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center px-4">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Catálogo Ilimitado</h3>
            <p className="text-gray-300">Accede a miles de películas de todos los géneros. Desde clásicos hasta los últimos estrenos.</p>
          </div>
          
          <div className="text-center px-4">
            <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Listas Personalizadas</h3>
            <p className="text-gray-300">Guarda tus películas favoritas y crea listas personalizadas para verlas cuando quieras.</p>
          </div>
          
          <div className="text-center px-4">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Tráilers Exclusivos</h3>
            <p className="text-gray-300">Disfruta de tráilers y contenido exclusivo antes que nadie.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Únete a nuestra comunidad de amantes del cine y descubre una nueva forma de disfrutar películas.</p>
          <Link 
            href="/register" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition duration-300 inline-block"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
