import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

const AppLayout = ({ children }) => {
  const navigation = [
    { name: 'Inicio', href: '/dashboard', current: true },
    { name: 'Catálogo', href: '/movies', current: false },
    { name: 'Géneros', href: '/genres', current: false },
    { name: 'Mi Lista', href: '/my-list', current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Barra de navegación */}
      <Disclosure as="nav" className="bg-black bg-opacity-80 backdrop-blur-sm sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/dashboard" className="text-red-500 font-bold text-2xl hover:text-red-400 transition-colors">
                      N
                    </Link>
                  </div>
                  
                  {/* Enlaces desktop */}
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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

                {/* Campo de búsqueda - Desktop */}
                <div className="hidden md:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
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
                        className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm"
                        placeholder="Buscar películas..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>

                {/* Menú usuario desktop */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500">
                          <span className="sr-only">Abrir menú usuario</span>
                          <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-red-500 transition-colors" />
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
                                className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors`}
                              >
                                Perfil
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/settings"
                                className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors`}
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
                                className={`${active ? 'bg-gray-700' : ''} block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors`}
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

                {/* Botón menú móvil */}
                <div className="md:hidden flex items-center space-x-2">
                  {/* Icono de búsqueda móvil */}
                  <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  {/* Botón hamburguesa */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                    <span className="sr-only">Abrir menú principal</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Menú móvil */}
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
                {/* Campo de búsqueda móvil */}
                <div className="px-3 py-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Buscar películas..."
                      type="search"
                    />
                  </div>
                </div>
                
                {/* Enlaces de navegación móvil */}
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      item.current
                        ? 'text-white bg-gray-900'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                
                {/* Separador */}
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="h-10 w-10 text-gray-300" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">Usuario</div>
                      <div className="text-sm font-medium text-gray-400">usuario@ejemplo.com</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Disclosure.Button
                      as={Link}
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      Perfil
                    </Disclosure.Button>
                    <Disclosure.Button
                      as={Link}
                      href="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      Configuración
                    </Disclosure.Button>
                    <Disclosure.Button
                      as={Link}
                      href="/logout"
                      method="post"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      Cerrar sesión
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
