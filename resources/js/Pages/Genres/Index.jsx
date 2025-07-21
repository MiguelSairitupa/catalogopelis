import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon, TagIcon } from '@heroicons/react/24/outline';

export default function Index({ genres }) {
    return (
        <AppLayout>
            <Head title="Géneros" />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <TagIcon className="h-8 w-8 text-red-500 mr-3" />
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Géneros</h1>
                                    <p className="mt-2 text-gray-300">Gestiona los géneros de películas</p>
                                </div>
                            </div>
                            <Link
                                href={route('genres.create')}
                                className="inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Nuevo Género
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {genres && genres.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {genres.map((genre) => (
                                <div key={genre.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700">
                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                                            <h3 className="text-lg sm:text-xl font-bold text-white flex-1 pr-2">
                                                {genre.name}
                                            </h3>
                                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                                {genre.movies_count || 0} películas
                                            </span>
                                        </div>
                                        
                                        {genre.description && (
                                            <p className="text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                                                {genre.description}
                                            </p>
                                        )}
                                        
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                                            <Link
                                                href={route('genres.show', genre.id)}
                                                className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors text-center sm:text-left"
                                            >
                                                Ver Películas
                                            </Link>
                                            <div className="flex justify-center sm:justify-end space-x-2">
                                                <Link
                                                    href={route('genres.edit', genre.id)}
                                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                                >
                                                    Editar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <TagIcon className="mx-auto h-24 w-24 text-gray-600 mb-6" />
                            <div className="text-gray-400 text-xl mb-6">
                                No hay géneros disponibles
                            </div>
                            <Link
                                href={route('genres.create')}
                                className="inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Crear Primer Género
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
