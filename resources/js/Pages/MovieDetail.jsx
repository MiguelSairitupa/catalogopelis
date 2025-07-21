import React from 'react';
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import MovieCarousel from '@/Components/MovieCarousel';

const MovieDetail = ({ movie, relatedMovies }) => {
  return (
    <AppLayout>
      <Head title={movie.title} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Hero Section with Background Image */}
        <div className="relative h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.poster_path})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"></div>
          </div>
          
          <div className="container mx-auto relative h-full flex items-end pb-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white">{movie.title}</h1>
              <div className="flex items-center mt-4 space-x-4">
                <span className="text-green-500 font-bold">{movie.rating} ★</span>
                <span className="text-white">{movie.release_date}</span>
                <span className="text-white">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
              </div>
              <p className="mt-4 text-gray-300 line-clamp-3">{movie.description}</p>
              
              <div className="mt-6">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded mr-4">
                  Reproducir
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded">
                  + Mi Lista
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Trailer and Info */}
            <div className="lg:col-span-2">
              {movie.trailer_url && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Tráiler</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src={`https://www.youtube.com/embed/${movie.trailer_url}`}
                      title={`${movie.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
                <p className="text-gray-300">{movie.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-2">Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map(genre => (
                      <span key={genre.id} className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Poster and Related Info */}
            <div>
              <div className="bg-gray-800 p-4 rounded-lg mb-8">
                <img 
                  src={movie.poster_path} 
                  alt={`Poster de ${movie.title}`}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        <div className="container mx-auto pb-12">
          <MovieCarousel 
            title="Películas relacionadas"
            movies={relatedMovies}
          />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default MovieDetail;
