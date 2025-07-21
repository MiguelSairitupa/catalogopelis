import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function Show({ movie }) {
    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
            router.delete(route('movies.destroy', movie.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {movie.title}
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('movies.edit', movie.id)}
                            className="inline-flex items-center px-3 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <PencilIcon className="w-4 h-4 mr-1" />
                            Editar
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-3 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <TrashIcon className="w-4 h-4 mr-1" />
                            Eliminar
                        </button>
                        <Link
                            href={route('movies.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Volver a Películas
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={movie.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Movie Poster */}
                                <div className="md:col-span-1">
                                    <img
                                        src={movie.poster_path || '/images/no-poster.jpg'}
                                        alt={movie.title}
                                        className="w-full rounded-lg shadow-lg"
                                    />
                                </div>

                                {/* Movie Details */}
                                <div className="md:col-span-2">
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {movie.title}
                                            </h1>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>{movie.release_date}</span>
                                                <span>•</span>
                                                <span>{movie.duration} minutos</span>
                                                {movie.rating && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="flex items-center">
                                                            ⭐ {movie.rating}/10
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Genres */}
                                        {movie.genres && movie.genres.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    Géneros
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {movie.genres.map((genre) => (
                                                        <span
                                                            key={genre.id}
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                                        >
                                                            {genre.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Description */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                Descripción
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                {movie.description}
                                            </p>
                                        </div>

                                        {/* Trailer */}
                                        {movie.trailer_url && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    Tráiler
                                                </h3>
                                                <a
                                                    href={movie.trailer_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    <PlayIcon className="w-4 h-4 mr-2" />
                                                    Ver Tráiler
                                                </a>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                            <Link
                                                href={route('movies.edit', movie.id)}
                                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            >
                                                <PencilIcon className="w-4 h-4 mr-2" />
                                                Editar Película
                                            </Link>
                                            <button
                                                onClick={handleDelete}
                                                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            >
                                                <TrashIcon className="w-4 h-4 mr-2" />
                                                Eliminar Película
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
