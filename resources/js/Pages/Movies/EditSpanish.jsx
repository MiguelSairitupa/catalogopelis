import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ movie, genres }) {
    const { data, setData, post, processing, errors } = useForm({
        title: movie.title || '',
        description: movie.description || '',
        release_date: movie.release_date || '',
        duration: movie.duration || '',
        poster: null,
        trailer_url: movie.trailer_url || '',
        rating: movie.rating || '',
        genres: movie.genres ? movie.genres.map(g => g.id) : [],
        _method: 'PUT'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('movies.update', movie.id));
    };

    const handleGenreChange = (genreId) => {
        const updatedGenres = data.genres.includes(genreId)
            ? data.genres.filter(id => id !== genreId)
            : [...data.genres, genreId];
        setData('genres', updatedGenres);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar Película: {movie.title}
                    </h2>
                    <Link
                        href={route('movies.show', movie.id)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        ← Volver a la Película
                    </Link>
                </div>
            }
        >
            <Head title={`Editar ${movie.title}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                {/* Current Poster Preview */}
                                {movie.poster_path && (
                                    <div>
                                        <InputLabel value="Póster Actual" />
                                        <img
                                            src={movie.poster_path}
                                            alt={movie.title}
                                            className="mt-2 w-32 h-48 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                )}

                                <div>
                                    <InputLabel htmlFor="title" value="Título" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Descripción" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="release_date" value="Fecha de Estreno" />
                                        <TextInput
                                            id="release_date"
                                            type="date"
                                            name="release_date"
                                            value={data.release_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('release_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.release_date} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="duration" value="Duración (minutos)" />
                                        <TextInput
                                            id="duration"
                                            type="number"
                                            name="duration"
                                            value={data.duration}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('duration', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.duration} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="poster" value="Nueva Imagen del Póster (opcional)" />
                                    <input
                                        id="poster"
                                        type="file"
                                        name="poster"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        onChange={(e) => setData('poster', e.target.files[0])}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Deja vacío para mantener el póster actual
                                    </p>
                                    <InputError message={errors.poster} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="trailer_url" value="URL del Tráiler (opcional)" />
                                        <TextInput
                                            id="trailer_url"
                                            type="url"
                                            name="trailer_url"
                                            value={data.trailer_url}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('trailer_url', e.target.value)}
                                        />
                                        <InputError message={errors.trailer_url} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="rating" value="Calificación (0-10)" />
                                        <TextInput
                                            id="rating"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            name="rating"
                                            value={data.rating}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('rating', e.target.value)}
                                        />
                                        <InputError message={errors.rating} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel value="Géneros" />
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {genres && genres.map((genre) => (
                                            <label key={genre.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.genres.includes(genre.id)}
                                                    onChange={() => handleGenreChange(genre.id)}
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{genre.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.genres} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('movies.show', movie.id)}
                                        className="bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                                    >
                                        Cancelar
                                    </Link>

                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Actualizar Película
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
