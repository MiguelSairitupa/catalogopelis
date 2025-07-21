import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from '@inertiajs/react';

export default function Dropdown({ trigger, children }) {
    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                    {trigger}
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
                <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child) && child.type.name === 'DropdownLink') {
                            return React.cloneElement(child, {
                                href: child.props.href || (child.props.to === 'profile.edit' ? '/profile' : 
                                     child.props.to === 'logout' ? '/logout' : '#')
                            });
                        }
                        return child;
                    })}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

Dropdown.Link = function DropdownLink({ className = '', children, active = false, ...props }) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    {...props}
                    className={
                        'block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out ' +
                        (active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100') +
                        ' ' +
                        className
                    }
                >
                    {children}
                </Link>
            )}
        </Menu.Item>
    );
};
