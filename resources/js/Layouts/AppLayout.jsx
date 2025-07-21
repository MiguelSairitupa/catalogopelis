import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

const AppLayout = ({ children }) => {
  const navigation = [
    { name: 'Inicio', href: '/dashboard', current: true },
    { name: 'Catálogo', href: '/movies', current: false },
    { name: 'Mi Lista', href: '/my-list', current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Barra de navegación */}
      <Disclosure as="nav" className="bg-black bg-opacity-80 backdrop-blur-sm">
        {({ open }) => (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo y enlaces izquierda */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-red-500 font-bold text-2xl">N</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          item.current
                            ? 'text-white bg-gray-900'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campo de búsqueda */}
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Buscar
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent sm:text-sm"
                      placeholder="Buscar películas..."
                      type="search"
                    />
                  </div>
                </div>
              </div>

              {/* Menú usuario derecha */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500">
                        <span className="sr-only">Abrir menú usuario</span>
                        <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-green-500" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}
                            >
                              Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={route('settings.index')}
                              className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}
                            >
                              Configuración
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/logout"
                              method="post"
                              as="button"
                              className={`${active ? 'bg-gray-700' : ''} block w-full text-left px-4 py-2 text-sm text-gray-300`}
                            >
                              Cerrar sesión
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
