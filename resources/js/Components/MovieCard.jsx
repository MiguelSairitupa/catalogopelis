import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, PlayIcon } from '@heroicons/react/24/solid';
import { usePage, router } from '@inertiajs/react';

const MovieCard = ({ movie, showAddToList = true }) => {
  const { auth } = usePage().props;
  const [isInList, setIsInList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check if movie is in user's list on component mount
    if (auth.user && movie.id) {
      checkIfInList();
    }
  }, [movie.id, auth.user]);

  const checkIfInList = async () => {
    try {
      const response = await fetch(`/api/user-list/check/${movie.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'same-origin'
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsInList(data.in_list);
      }
    } catch (error) {
      console.error('Error checking list status:', error);
    }
  };

  const toggleList = () => {
    if (!auth.user) {
      router.visit('/login');
      return;
    }

    setIsLoading(true);
    
    if (isInList) {
      // Remove from list
      router.delete(`/api/user-list/${movie.id}`, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setIsInList(false);
        },
        onError: (errors) => {
          console.error('Error removing from list:', errors);
        },
        onFinish: () => {
          setIsLoading(false);
        }
      });
    } else {
      // Add to list
      router.post('/api/user-list', 
        { movie_id: movie.id },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            setIsInList(true);
          },
          onError: (errors) => {
            console.error('Error adding to list:', errors);
          },
          onFinish: () => {
            setIsLoading(false);
          }
        }
      );
    }
  };

  const handleMovieClick = () => {
    router.visit(`/movies/${movie.id}`);
  };

  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      {/* Imagen del póster con efecto hover */}
      <div className="relative aspect-[2/3]" onClick={handleMovieClick}>
        <LazyLoadImage 
          src={movie.poster_path} 
          alt={movie.title} 
          effect="blur"
          className="w-full h-full object-cover"
        />
        {/* Overlay con botón de play */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <PlayIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Degradado inferior para el título */}
        <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Información de la película */}
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-white font-bold text-sm sm:text-base truncate mb-1">{movie.title}</h3>
        
        {/* Géneros */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genres.slice(0, window.innerWidth < 640 ? 1 : 2).map((genre) => (
              <span key={genre.id} className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                {genre.name}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
            {/* Rating */}
            {movie.rating && (
              <span className="text-yellow-400 text-xs sm:text-sm font-medium">
                ★ {movie.rating}
              </span>
            )}
            {/* Año */}
            {movie.release_date && (
              <span className="text-gray-400 text-xs sm:text-sm truncate">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>
          
          {/* Botón Mi Lista */}
          {showAddToList && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleList();
              }}
              disabled={isLoading}
              className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 flex-shrink-0 ml-2"
              title={isInList ? 'Remover de Mi Lista' : 'Agregar a Mi Lista'}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent rounded-full"></div>
              ) : isInList ? (
                <HeartSolid className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" /> 
              ) : (
                <HeartOutline className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Efecto de borde al hacer hover */}
      <div className="absolute inset-0 border-2 sm:border-4 border-transparent group-hover:border-red-500 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default MovieCard;
