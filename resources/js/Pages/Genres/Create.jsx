import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('genres.store'));
    };

    return (
        <AppLayout>
            <Head title="Crear Género" />
            
            <div className="py-6 sm:py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl rounded-lg">
                        <div className="p-4 sm:p-6 lg:p-8 bg-gray-800 border-b border-gray-700">
                            <h1 className="text-xl sm:text-2xl font-medium text-white">
                                Crear Nuevo Género
                            </h1>
                            <p className="mt-2 text-sm sm:text-base text-gray-400">
                                Agrega un nuevo género para categorizar las películas.
                            </p>
                        </div>

                        <div className="p-4 sm:p-6 lg:p-8 bg-gray-800">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Campo Nombre */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Nombre del Género *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                                        placeholder="Ej: Acción, Drama, Comedia..."
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                {/* Campo Descripción */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                        Descripción (Opcional)
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm sm:text-base"
                                        placeholder="Describe brevemente este género..."
                                    />
                                    {errors.description && (
                                        <p className="mt-2 text-sm text-red-400">{errors.description}</p>
                                    )}
                                </div>

                                {/* Botones */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-gray-700 space-y-3 sm:space-y-0">
                                    <a
                                        href={route('genres.index')}
                                        className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        Cancelar
                                    </a>
                                    
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creando...
                                            </>
                                        ) : (
                                            'Crear Género'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
