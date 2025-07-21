import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import MovieCard from '@/Components/MovieCard';
import { HeartIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function MyList({ movies }) {
    return (
        <AppLayout>
            <Head title="Mi Lista" />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Mi Lista</h1>
                                    <p className="mt-2 text-gray-300">
                                        {movies.length > 0 
                                            ? `${movies.length} película${movies.length !== 1 ? 's' : ''} en tu lista`
                                            : 'Tu lista está vacía'
                                        }
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route('movies.index')}
                                className="inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Explorar Películas
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {movies && movies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {movies.map((movie) => (
                                <MovieCard 
                                    key={movie.id} 
                                    movie={movie} 
                                    showAddToList={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <HeartIcon className="mx-auto h-24 w-24 text-gray-600 mb-6" />
                            <div className="text-gray-400 text-xl mb-6">
                                Tu lista está vacía
                            </div>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Explora nuestro catálogo y agrega películas a tu lista personal para verlas más tarde.
                            </p>
                            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                                <Link
                                    href={route('movies.index')}
                                    className="inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Explorar Catálogo
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-6 py-3 bg-gray-700 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                                >
                                    Volver al Inicio
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
