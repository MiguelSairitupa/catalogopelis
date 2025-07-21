import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function Show({ movie }) {
    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
            router.delete(route('movies.destroy', movie.id));
        }
    };

    return (
        <AppLayout>
            <Head title={movie.title} />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                                <p className="mt-2 text-gray-300">Detalles de la película</p>
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    href={route('movies.index')}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
                                >
                                    Volver al Catálogo
                                </Link>
                                <Link
                                    href={route('movies.edit', movie.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 inline-flex items-center"
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    Editar
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 inline-flex items-center"
                                >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Póster */}
                                <div className="md:col-span-1">
                                    {movie.poster_path ? (
                                        <img
                                            src={movie.poster_path || '/images/no-poster.jpg'}
                                            alt={`Póster de ${movie.title}`}
                                            className="w-full rounded-lg shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-400">Sin póster</span>
                                        </div>
                                    )}
                                </div>

                                {/* Información */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            Descripción
                                        </h3>
                                        <p className="text-gray-300">{movie.description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-white">Fecha de Estreno</h4>
                                            <p className="text-gray-300">{movie.release_date}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">Duración</h4>
                                            <p className="text-gray-300">{movie.duration} minutos</p>
                                        </div>
                                        {movie.rating && (
                                            <div>
                                                <h4 className="font-semibold text-white">Calificación</h4>
                                                <p className="text-gray-300">{movie.rating}</p>
                                            </div>
                                        )}
                                        {movie.trailer_url && (
                                            <div>
                                                <h4 className="font-semibold text-white">Tráiler</h4>
                                                <a
                                                    href={movie.trailer_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-red-400 hover:text-red-300 inline-flex items-center transition duration-200"
                                                >
                                                    <PlayIcon className="h-4 w-4 mr-1" />
                                                    Ver Tráiler
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {movie.genres && movie.genres.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                Géneros
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {movie.genres.map((genre) => (
                                                    <span
                                                        key={genre.id}
                                                        className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
