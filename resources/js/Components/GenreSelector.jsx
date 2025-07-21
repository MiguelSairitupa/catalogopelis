import React, { useState } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const GenreSelector = ({ genres, selectedGenres, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGenreToggle = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onChange(updatedGenres);
  };

  const removeGenre = (genreId) => {
    const updatedGenres = selectedGenres.filter(id => id !== genreId);
    onChange(updatedGenres);
  };

  const getSelectedGenreNames = () => {
    return genres
      .filter(genre => selectedGenres.includes(genre.id))
      .map(genre => genre.name);
  };

  return (
    <div className="relative">
      {/* Selected genres display */}
      <div className="mb-2">
        <div className="flex flex-wrap gap-2">
          {getSelectedGenreNames().map((genreName, index) => {
            const genre = genres.find(g => g.name === genreName);
            return (
              <span
                key={genre.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-600 text-white"
              >
                {genreName}
                <button
                  type="button"
                  onClick={() => removeGenre(genre.id)}
                  className="ml-2 hover:bg-red-700 rounded-full p-1"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {/* Dropdown trigger */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 flex items-center justify-between"
        >
          <span className="text-gray-300">
            {selectedGenres.length === 0 
              ? 'Seleccionar géneros...' 
              : `${selectedGenres.length} género${selectedGenres.length !== 1 ? 's' : ''} seleccionado${selectedGenres.length !== 1 ? 's' : ''}`
            }
          </span>
          <ChevronDownIcon 
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {genres.map((genre) => (
                <label
                  key={genre.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
                    className="rounded border-gray-500 text-red-600 shadow-sm focus:ring-red-500 mr-3"
                  />
                  <span className="text-white">{genre.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default GenreSelector;
