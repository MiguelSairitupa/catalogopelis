import AppLayout from '@/Layouts/AppLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GenreSelector from '@/Components/GenreSelector';
import { Head, Link, useForm } from '@inertiajs/react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Create({ genres }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        release_date: '',
        duration: '',
        poster: null,
        trailer_url: '',
        rating: '',
        genres: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('movies.store'), {
            forceFormData: true,
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
            onSuccess: () => {
                reset();
            }
        });
    };

    const handleGenreChange = (genreId) => {
        const updatedGenres = data.genres.includes(genreId)
            ? data.genres.filter(id => id !== genreId)
            : [...data.genres, genreId];
        setData('genres', updatedGenres);
    };

    return (
        <AppLayout>
            <Head title="Crear Película" />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-white">Crear Nueva Película</h1>
                                <p className="mt-2 text-gray-300">Agrega una nueva película al catálogo</p>
                            </div>
                            <Link
                                href={route('movies.index')}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Volver al Catálogo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                        <div className="p-8">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <InputLabel htmlFor="title" value="Título" className="text-gray-300" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="description" value="Descripción" className="text-gray-300" />
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                            rows="4"
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="release_date" value="Fecha de Estreno" className="text-gray-300" />
                                            <TextInput
                                                id="release_date"
                                                type="date"
                                                name="release_date"
                                                value={data.release_date}
                                                className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                                                onChange={(e) => setData('release_date', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.release_date} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="duration" value="Duración (minutos)" className="text-gray-300" />
                                            <TextInput
                                                id="duration"
                                                type="number"
                                                name="duration"
                                                value={data.duration}
                                                className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                                                onChange={(e) => setData('duration', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.duration} className="mt-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="poster" value="Imagen del Póster" className="text-gray-300" />
                                        <input
                                            id="poster"
                                            type="file"
                                            name="poster"
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                            onChange={(e) => setData('poster', e.target.files[0])}
                                            required
                                        />
                                        <InputError message={errors.poster} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="trailer_url" value="URL del Tráiler" className="text-gray-300" />
                                            <TextInput
                                                id="trailer_url"
                                                type="url"
                                                name="trailer_url"
                                                value={data.trailer_url}
                                                className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                                                onChange={(e) => setData('trailer_url', e.target.value)}
                                            />
                                            <InputError message={errors.trailer_url} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="rating" className="text-gray-300">
                                                <div className="flex items-center">
                                                    <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                                                    Rating (1.0 - 10.0)
                                                </div>
                                            </InputLabel>
                                            <div className="relative mt-1">
                                                <input
                                                    id="rating"
                                                    type="number"
                                                    name="rating"
                                                    min="1.0"
                                                    max="10.0"
                                                    step="0.1"
                                                    value={data.rating}
                                                    placeholder="Ej: 8.5"
                                                    className="block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm pl-10"
                                                    onChange={(e) => setData('rating', e.target.value)}
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-400">
                                                Calificación de la película del 1.0 al 10.0 (ej: 8.5)
                                            </p>
                                            <InputError message={errors.rating} className="mt-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel value="Géneros" className="text-gray-300" />
                                        <div className="mt-2">
                                            <GenreSelector
                                                genres={genres || []}
                                                selectedGenres={data.genres}
                                                onChange={(selectedGenres) => setData('genres', selectedGenres)}
                                                error={errors.genres}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end space-x-4">
                                        <Link
                                            href={route('movies.index')}
                                            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
                                        >
                                            Cancelar
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
                                        >
                                            {processing ? 'Creando...' : 'Crear Película'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
