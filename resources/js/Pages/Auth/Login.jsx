import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <Head title="Iniciar Sesión" />
            
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <span className="text-red-600 text-4xl font-bold">MovieCatalog</span>
                    </Link>
                </div>

                <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-center text-white mb-6">Iniciar Sesión</h1>

                    {status && <div className="mb-4 text-green-500 text-center">{status}</div>}

                    <form onSubmit={handleSubmit}>
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
                                autoComplete="username"
                                autoFocus
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-300 mb-2">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                                    Recordarme
                                </label>
                            </div>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                            disabled={processing}
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <span className="text-gray-400">¿No tienes cuenta? </span>
                        <Link href={route('register')} className="text-red-400 hover:text-red-300 font-medium">
                            Regístrate ahora
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
