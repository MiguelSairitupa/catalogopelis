import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import MovieCard from '@/Components/MovieCard';

export default function Show({ genre }) {
    return (
        <AppLayout>
            <Head title={`Género: ${genre.name}`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header del género */}
                    <div className="bg-gradient-to-r from-red-900 to-gray-900 rounded-lg shadow-xl p-8 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    {genre.name}
                                </h1>
                                {genre.description && (
                                    <p className="text-gray-300 text-lg max-w-3xl">
                                        {genre.description}
                                    </p>
                                )}
                                <div className="mt-4 flex items-center space-x-4">
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {genre.movies?.length || 0} películas
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex space-x-3">
                                <a
                                    href={route('genres.edit', genre.id)}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                </a>
                                
                                <a
                                    href={route('genres.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Volver
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Películas del género */}
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Películas de {genre.name}
                        </h2>
                        
                        {genre.movies && genre.movies.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {genre.movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6zm3-2V2h6v2H9z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-300">
                                    No hay películas
                                </h3>
                                <p className="mt-1 text-sm text-gray-400">
                                    Aún no hay películas asignadas a este género.
                                </p>
                                <div className="mt-6">
                                    <a
                                        href={route('movies.create')}
                                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Agregar Película
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mostrar más películas si hay más de 12 */}
                    {genre.movies && genre.movies.length >= 12 && (
                        <div className="mt-8 text-center">
                            <a
                                href={`/movies?genre=${genre.id}`}
                                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Ver todas las películas de {genre.name}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
