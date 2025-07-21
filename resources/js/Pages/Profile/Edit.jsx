import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Perfil" />

            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                        <p className="mt-2 text-gray-300">Administra tu información personal y configuración de cuenta</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Profile Information */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Información del Perfil</h2>
                                <p className="text-gray-400">Actualiza tu información personal y dirección de correo electrónico</p>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        {/* Password Update */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Actualizar Contraseña</h2>
                                <p className="text-gray-400">Asegúrate de usar una contraseña larga y aleatoria para mantener tu cuenta segura</p>
                            </div>
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        {/* Delete Account */}
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 border-red-500/20">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-red-400 mb-2">Eliminar Cuenta</h2>
                                <p className="text-gray-400">Una vez que tu cuenta sea eliminada, todos sus recursos y datos serán permanentemente borrados</p>
                            </div>
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
