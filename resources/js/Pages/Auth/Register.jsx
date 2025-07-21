import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <Head title="Regístrate" />
            
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <span className="text-red-600 text-4xl font-bold">MovieCatalog</span>
                    </Link>
                </div>

                <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-center text-white mb-6">Crear Cuenta</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 mb-2">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                                autoComplete="name"
                                autoFocus
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 mb-2">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                                autoComplete="email"
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-300 mb-2">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                                autoComplete="new-password"
                            />
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password_confirmation" className="block text-gray-300 mb-2">Confirmar Contraseña</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                                autoComplete="new-password"
                            />
                            {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                            disabled={processing}
                        >
                            Registrarse
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <span className="text-gray-400">¿Ya tienes cuenta? </span>
                        <Link href={route('login')} className="text-red-400 hover:text-red-300 font-medium">
                            Inicia Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
