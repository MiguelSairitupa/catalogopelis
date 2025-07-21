import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import MovieCard from '@/Components/MovieCard';
import MovieSearch from '@/Components/MovieSearch';
import { useState } from 'react';

export default function Index({ movies, genres }) {
    const [filteredMovies, setFilteredMovies] = useState(movies || []);

    return (
        <AppLayout>
            <Head title="Películas" />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-6 sm:py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Catálogo de Películas</h1>
                                <p className="mt-2 text-sm sm:text-base text-gray-300">Descubre y administra tu colección de películas</p>
                            </div>
                            <Link
                                href={route('movies.create')}
                                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                            >
                                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="hidden sm:inline">Agregar Película</span>
                                <span className="sm:hidden">Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {movies && movies.length > 0 ? (
                        <>
                            {/* Search and Filter Component */}
                            <MovieSearch
                                movies={movies}
                                genres={genres}
                                onFilteredMovies={setFilteredMovies}
                            />
                            
                            {/* Movies Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                                {filteredMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                            
                            {/* No results message */}
                            {filteredMovies.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="text-gray-400 text-xl mb-6">
                                        No se encontraron películas con los filtros aplicados
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-gray-400 text-xl mb-6">
                                No se encontraron películas
                            </div>
                            <Link
                                href={route('movies.create')}
                                className="inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Agregar Tu Primera Película
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
