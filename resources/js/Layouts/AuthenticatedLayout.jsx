import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeToggle from '@/Components/BizzSoft/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gray-900 dark:text-gray-100">

            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <nav className="border-b border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-16 justify-between">

                        {/* Brand + Navigation */}

                        <div className="flex">

                            {/* BizzSoft Logo */}

                            <div className="flex shrink-0 items-center">

                                <Link
                                    href="/"
                                    className="flex items-center gap-3"
                                >

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">

                                        <svg
                                            viewBox="0 0 48 48"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M24 4L40 13V31L24 40L8 31V13L24 4Z"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinejoin="round"
                                            />

                                            <path
                                                d="M24 13L32 17.5V26.5L24 31L16 26.5V17.5L24 13Z"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinejoin="round"
                                            />

                                            <path
                                                d="M24 13V31M16 17.5L24 22L32 17.5"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            />
                                        </svg>

                                    </div>

                                    <div className="hidden sm:block">

                                        <div className="text-xl font-extrabold tracking-tight text-[#102a56] dark:text-white">
                                            Bizz<span className="text-blue-600">
                                                Soft
                                            </span>
                                        </div>

                                        <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
                                            Inventory Management
                                        </div>

                                    </div>

                                </Link>

                            </div>


                            {/* Desktop Navigation */}

                            <div className="hidden space-x-1 sm:-my-px sm:ms-8 sm:flex sm:items-center">

                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route('products.index')}
                                    active={route().current('products.*')}
                                >
                                    Products
                                </NavLink>

                                <NavLink
                                    href={route('categories.index')}
                                    active={route().current('categories.*')}
                                >
                                    Categories
                                </NavLink>

                                <NavLink
                                    href={route('suppliers.index')}
                                    active={route().current('suppliers.*')}
                                >
                                    Suppliers
                                </NavLink>

                                <NavLink
                                    href={route('purchases.index')}
                                    active={route().current('purchases.*')}
                                >
                                    Purchases
                                </NavLink>

                                <NavLink
                                    href={route('sales.index')}
                                    active={route().current('sales.*')}
                                >
                                    Sales
                                </NavLink>

                                <NavLink
                                    href={route('reports.index')}
                                    active={route().current('reports.*')}
                                >
                                    Reports
                                </NavLink>

                                <NavLink
                                    href={route('users.index')}
                                    active={route().current('users.*')}
                                >
                                    Users
                                </NavLink>

                                <NavLink
                                    href={route('activity-logs.index')}
                                    active={route().current('activity-logs.*')}
                                >
                                    Activity Logs
                                </NavLink>

                            </div>

                        </div>


                        {/* User Dropdown */}

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">

                            <ThemeToggle />

                            <div className="relative ms-3">

                                <Dropdown>

                                    <Dropdown.Trigger>

                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >

                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                                {user.name?.charAt(0)?.toUpperCase()}
                                            </span>

                                            <span>
                                                {user.name}
                                            </span>

                                            <svg
                                                className="h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                        </button>

                                    </Dropdown.Trigger>


                                    <Dropdown.Content>

                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>

                                    </Dropdown.Content>

                                </Dropdown>

                            </div>

                        </div>


                        {/* Mobile Menu Button */}

                        <div className="-me-2 flex items-center sm:hidden">

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) =>
                                            !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                            >

                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >

                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />

                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />

                                </svg>

                            </button>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MOBILE NAVIGATION
                ================================================== */}

                <div
                    className={
                        (showingNavigationDropdown
                            ? 'block'
                            : 'hidden') +
                        ' border-t border-slate-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:hidden'
                    }
                >

                    <div className="space-y-1 px-4 pb-4 pt-3">

                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('products.index')}
                            active={route().current('products.*')}
                        >
                            Products
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('categories.index')}
                            active={route().current('categories.*')}
                        >
                            Categories
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('suppliers.index')}
                            active={route().current('suppliers.*')}
                        >
                            Suppliers
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('purchases.index')}
                            active={route().current('purchases.*')}
                        >
                            Purchases
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('sales.index')}
                            active={route().current('sales.*')}
                        >
                            Sales
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('reports.index')}
                            active={route().current('reports.*')}
                        >
                            Reports
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('users.index')}
                            active={route().current('users.*')}
                        >
                            Users
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('activity-logs.index')}
                            active={route().current('activity-logs.*')}
                        >
                            Activity Logs
                        </ResponsiveNavLink>

                    </div>


                    {/* Mobile User */}

                    <div className="border-t border-slate-100 bg-slate-50 px-4 pb-4 pt-4 dark:border-gray-700 dark:bg-gray-800">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <div>

                                <div className="font-semibold text-[#102a56] dark:text-white">
                                    {user.name}
                                </div>

                                <div className="text-sm text-slate-500 dark:text-gray-400">
                                    {user.email}
                                </div>

                            </div>

                        </div>

                        {/* MOBILE THEME TOGGLE */}

                        <ThemeToggle showLabel />

                        <div className="mt-4 space-y-1">

                            <ResponsiveNavLink
                                href={route('profile.edit')}
                            >
                                Profile
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>

                        </div>

                    </div>

                </div>

            </nav>


            {/* =====================================================
                PAGE HEADER
            ====================================================== */}

            {header && (

                <header className="border-b border-slate-200 bg-white dark:border-gray-700 dark:bg-gray-900">

                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

                        {header}

                    </div>

                </header>

            )}


            {/* =====================================================
                PAGE CONTENT
            ====================================================== */}

            <main>
                {children}
            </main>

        </div>
    );
}