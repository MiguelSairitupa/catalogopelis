import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Settings() {
    const { data, setData, post, processing, errors } = useForm({
        theme: 'dark',
        language: 'es',
        notifications: true,
        autoplay: true,
        quality: 'hd',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.update'));
    };

    return (
        <AppLayout>
            <Head title="Configuración" />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-white">Configuración</h1>
                        <p className="mt-2 text-gray-300">Personaliza tu experiencia en el catálogo de películas</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Appearance Settings */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Apariencia</h2>
                                <p className="text-gray-400">Personaliza la apariencia de la aplicación</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="theme" value="Tema" className="text-white" />
                                    <select
                                        id="theme"
                                        value={data.theme}
                                        onChange={(e) => setData('theme', e.target.value)}
                                        className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                    >
                                        <option value="dark">Oscuro</option>
                                        <option value="light">Claro</option>
                                        <option value="auto">Automático</option>
                                    </select>
                                    <InputError message={errors.theme} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="language" value="Idioma" className="text-white" />
                                    <select
                                        id="language"
                                        value={data.language}
                                        onChange={(e) => setData('language', e.target.value)}
                                        className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                    >
                                        <option value="es">Español</option>
                                        <option value="en">English</option>
                                    </select>
                                    <InputError message={errors.language} className="mt-2" />
                                </div>
                            </form>
                        </div>

                        {/* Playback Settings */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Reproducción</h2>
                                <p className="text-gray-400">Configura las opciones de reproducción de contenido</p>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-white font-medium">Reproducción automática</label>
                                        <p className="text-gray-400 text-sm">Reproduce automáticamente los tráilers al pasar el cursor</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.autoplay}
                                            onChange={(e) => setData('autoplay', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                    </label>
                                </div>

                                <div>
                                    <InputLabel htmlFor="quality" value="Calidad de video preferida" className="text-white" />
                                    <select
                                        id="quality"
                                        value={data.quality}
                                        onChange={(e) => setData('quality', e.target.value)}
                                        className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                                    >
                                        <option value="auto">Automática</option>
                                        <option value="hd">HD (720p)</option>
                                        <option value="fhd">Full HD (1080p)</option>
                                        <option value="4k">4K (2160p)</option>
                                    </select>
                                    <InputError message={errors.quality} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Notificaciones</h2>
                                <p className="text-gray-400">Gestiona tus preferencias de notificaciones</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-white font-medium">Notificaciones push</label>
                                        <p className="text-gray-400 text-sm">Recibe notificaciones sobre nuevas películas y actualizaciones</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.notifications}
                                            onChange={(e) => setData('notifications', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Cuenta</h2>
                                <p className="text-gray-400">Gestiona tu información de cuenta</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-medium">Información del perfil</p>
                                        <p className="text-gray-400 text-sm">Actualiza tu información personal</p>
                                    </div>
                                    <a
                                        href="/profile"
                                        className="inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150"
                                    >
                                        Editar Perfil
                                    </a>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-medium">Privacidad y seguridad</p>
                                        <p className="text-gray-400 text-sm">Configura tu privacidad y seguridad</p>
                                    </div>
                                    <button className="inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150">
                                        Configurar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <PrimaryButton
                                onClick={handleSubmit}
                                disabled={processing}
                                className="bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:ring-red-500"
                            >
                                Guardar Configuración
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
