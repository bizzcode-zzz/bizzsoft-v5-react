import { Head, Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/BizzSoft/ThemeToggle';

function BizzSoftLogo({ light = false }) {
    return (
        <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <svg
                    viewBox="0 0 48 48"
                    className="h-7 w-7 text-white"
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

            <div>

                <div
                    className={`text-2xl font-extrabold tracking-tight ${light
                            ? 'text-white'
                            : 'text-[#102a56] dark:text-blue-300'
                        }`}
                >
                    Bizz<span className="text-blue-600">Soft</span>
                </div>

                <div
                    className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${light
                            ? 'text-blue-100'
                            : 'text-slate-500 dark:text-gray-400'
                        }`}
                >
                    Inventory Management System
                </div>

            </div>

        </div>
    );
}


function FeatureIcon({ type }) {

    const icons = {
        product: '📦',
        supplier: '🚚',
        purchase: '🧾',
        sales: '🛒',
        reports: '📊',
        users: '👥',
    };

    return (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-900/40">
            {icons[type]}
        </div>
    );
}


export default function Welcome({
    canLogin,
    canRegister,
}) {

    return (
        <>
            <Head title="BizzSoft Inventory Management System" />

            <div className="min-h-screen bg-white text-slate-800 dark:bg-gray-950 dark:text-gray-200">


                {/* =====================================================
                    NAVBAR
                ====================================================== */}

                <header className="border-b border-slate-100 bg-white dark:border-gray-800 dark:bg-gray-950">

                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                        <Link href="/">
                            <BizzSoftLogo />
                        </Link>


                        <nav className="hidden items-center gap-8 md:flex">

                            <a
                                href="#home"
                                className="text-sm font-semibold text-blue-600 dark:text-blue-400"
                            >
                                Home
                            </a>

                            <a
                                href="#features"
                                className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Features
                            </a>

                            <a
                                href="#technology"
                                className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Technology
                            </a>

                            <a
                                href="#about"
                                className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                About
                            </a>

                        </nav>


                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            {canLogin && (
                                <Link
                                    href={route('login')}
                                    className="hidden rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50 sm:inline-flex"
                                >
                                    Log in
                                </Link>
                            )}

                        </div>

                    </div>

                </header>


                {/* =====================================================
                    HERO
                ====================================================== */}

                <section
                    id="home"
                    className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
                >

                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">


                        {/* Hero Text */}

                        <div>

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                <span>✦</span>
                                Modern • Secure • Efficient
                            </div>


                            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-[#102a56] dark:text-blue-300 sm:text-6xl">
                                Bizz
                                <span className="text-blue-600 dark:text-blue-400">
                                    Soft
                                </span>
                            </h1>


                            <h2 className="mt-2 text-2xl font-bold text-[#193d70] dark:text-gray-100 sm:text-3xl">
                                Inventory Management System
                            </h2>


                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-gray-300">
                                A modern and powerful inventory system built
                                with Laravel, Inertia.js, React and Tailwind
                                CSS. Designed to help businesses manage
                                products, stock, suppliers, purchases, sales,
                                and reports — all in one place.
                            </p>


                            <div className="mt-8 flex flex-wrap gap-4">

                                {canLogin && (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                    >
                                        <span>↪</span>
                                        Log in to System
                                        <span>→</span>
                                    </Link>
                                )}


                                <a
                                    href="#features"
                                    className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-500 dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
                                >
                                    <span>ⓘ</span>
                                    Learn More
                                </a>

                            </div>

                        </div>


                        {/* Dashboard Visual */}

                        <div className="relative">

                            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />


                            <div className="relative rounded-3xl border border-white bg-white p-3 shadow-2xl shadow-blue-900/10 dark:border-gray-700 dark:bg-gray-800">

                                <div className="rounded-2xl bg-[#0f172a] p-4">

                                    <div className="mb-4 flex items-center justify-between">

                                        <div className="flex items-center gap-2">

                                            <div className="h-3 w-3 rounded-full bg-red-400" />
                                            <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                            <div className="h-3 w-3 rounded-full bg-green-400" />

                                        </div>

                                        <span className="text-xs text-slate-400">
                                            BizzSoft Dashboard
                                        </span>

                                    </div>


                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                                        <div className="rounded-xl bg-white p-3 dark:bg-gray-700">

                                            <p className="text-[10px] text-slate-500 dark:text-gray-400">
                                                Products
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
                                                1,248
                                            </p>

                                        </div>


                                        <div className="rounded-xl bg-white p-3 dark:bg-gray-700">

                                            <p className="text-[10px] text-slate-500 dark:text-gray-400">
                                                Low Stock
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-red-500 dark:text-red-400">
                                                23
                                            </p>

                                        </div>


                                        <div className="rounded-xl bg-white p-3 dark:bg-gray-700">

                                            <p className="text-[10px] text-slate-500 dark:text-gray-400">
                                                Suppliers
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
                                                56
                                            </p>

                                        </div>


                                        <div className="rounded-xl bg-white p-3 dark:bg-gray-700">

                                            <p className="text-[10px] text-slate-500 dark:text-gray-400">
                                                Sales
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                                                ₱128K
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-4 grid grid-cols-3 gap-3">

                                        <div className="col-span-2 rounded-xl bg-white p-4 dark:bg-gray-700">

                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm font-bold text-slate-800 dark:text-white">
                                                    Sales Overview
                                                </span>

                                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                                    This Month
                                                </span>

                                            </div>


                                            <div className="flex h-32 items-end gap-2">

                                                {[45, 65, 52, 80, 62, 92, 75].map(
                                                    (height, index) => (

                                                        <div
                                                            key={index}
                                                            className="flex flex-1 items-end"
                                                        >

                                                            <div
                                                                className="w-full rounded-t-md bg-blue-500"
                                                                style={{
                                                                    height: `${height}%`,
                                                                }}
                                                            />

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>


                                        <div className="rounded-xl bg-white p-4 dark:bg-gray-700">

                                            <span className="text-sm font-bold text-slate-800 dark:text-white">
                                                Recent
                                            </span>


                                            <div className="mt-4 space-y-4">

                                                <div className="flex items-center gap-2">

                                                    <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/50" />

                                                    <div className="h-2 w-16 rounded bg-slate-200 dark:bg-gray-600" />

                                                </div>


                                                <div className="flex items-center gap-2">

                                                    <div className="h-7 w-7 rounded-full bg-green-100 dark:bg-green-900/50" />

                                                    <div className="h-2 w-12 rounded bg-slate-200 dark:bg-gray-600" />

                                                </div>


                                                <div className="flex items-center gap-2">

                                                    <div className="h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/50" />

                                                    <div className="h-2 w-14 rounded bg-slate-200 dark:bg-gray-600" />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    FEATURES
                ====================================================== */}

                <section
                    id="features"
                    className="bg-white py-20 dark:bg-gray-950"
                >

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                ✦ System Features
                            </div>


                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300 sm:text-4xl">
                                Everything you need to manage your inventory
                            </h2>


                            <p className="mt-4 text-slate-600 dark:text-gray-300">
                                Powerful features designed for efficiency,
                                accuracy and growth.
                            </p>

                        </div>


                        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            <FeatureCard
                                type="product"
                                title="Product Management"
                                description="Manage products, stock levels, categories and reorder levels."
                            />

                            <FeatureCard
                                type="supplier"
                                title="Supplier Management"
                                description="Maintain supplier information and purchasing relationships."
                            />

                            <FeatureCard
                                type="purchase"
                                title="Purchase Management"
                                description="Record purchases with automatic stock increases and transaction safety."
                            />

                            <FeatureCard
                                type="sales"
                                title="Sales Management"
                                description="Process sales with automatic stock deduction and negative-stock protection."
                            />

                            <FeatureCard
                                type="reports"
                                title="Reports"
                                description="Generate Sales, Purchase, Inventory and Low Stock reports with Print/PDF support."
                            />

                            <FeatureCard
                                type="users"
                                title="User & RBAC"
                                description="Database-driven roles and permissions for controlled system access."
                            />

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    TECHNOLOGY
                ====================================================== */}

                <section
                    id="technology"
                    className="bg-gradient-to-b from-blue-50 to-white py-20 dark:from-gray-900 dark:to-gray-950"
                >

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                &lt;/&gt; Technology Stack
                            </div>


                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300 sm:text-4xl">
                                Built with Modern Technologies
                            </h2>


                            <p className="mt-4 text-slate-600 dark:text-gray-300">
                                Combining powerful tools for performance,
                                scalability and developer experience.
                            </p>

                        </div>


                        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

                            <TechCard
                                icon="L"
                                name="Laravel"
                                detail="Backend"
                            />

                            <TechCard
                                icon="»"
                                name="Inertia.js"
                                detail="Bridge"
                            />

                            <TechCard
                                icon="⚛"
                                name="React"
                                detail="Frontend"
                            />

                            <TechCard
                                icon="〰"
                                name="Tailwind CSS"
                                detail="UI"
                            />

                            <TechCard
                                icon="🐬"
                                name="MySQL"
                                detail="Database"
                            />

                            <TechCard
                                icon="E"
                                name="Eloquent ORM"
                                detail="ORM"
                            />

                        </div>

                    </div>

                </section>


                {/* =====================================================
    ABOUT / DEVELOPER
====================================================== */}

<section
    id="about"
    className="bg-white py-20 dark:bg-gray-950"
>

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                ✦ About BizzSoft
            </div>


            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300 sm:text-4xl">
                Built to manage business inventory smarter
            </h2>


            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-gray-300">
                A modern inventory management system designed to
                simplify business operations and help teams work
                smarter, faster, and more efficiently.
            </p>

        </div>


        {/* Developer / BizzSoft Card */}

        <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5 dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/20">

            <div className="grid lg:grid-cols-[360px_1fr]">


                {/* =================================================
                    DEVELOPER PROFILE
                ================================================== */}

                <div className="flex flex-col items-center justify-center border-b border-slate-200 bg-gradient-to-br from-blue-50 to-sky-50 px-8 py-10 text-center dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 lg:border-b-0 lg:border-r">

                    {/* Profile Photo */}

                    <div className="rounded-full border-4 border-white p-1 shadow-xl shadow-blue-900/10 dark:border-gray-700 dark:shadow-black/30">

                        <img
                            src="/images/alwin-john.jpg"
                            alt="Alwin John"
                            className="h-40 w-40 rounded-full object-cover"
                        />

                    </div>


                    {/* Name */}

                    <h3 className="mt-6 text-3xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Alwin John
                    </h3>


                    {/* Title */}

                    <p className="mt-1 text-lg font-bold text-blue-600 dark:text-blue-400">
                        Full-Stack Developer
                    </p>


                    {/* Divider */}

                    <div className="my-5 flex w-full max-w-xs items-center gap-3">

                        <div className="h-px flex-1 bg-blue-200 dark:bg-gray-700" />

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            &lt;/&gt;
                        </div>

                        <div className="h-px flex-1 bg-blue-200 dark:bg-gray-700" />

                    </div>


                    {/* Developer Description */}

                    <p className="max-w-xs text-sm leading-6 text-slate-600 dark:text-gray-300">
                        Passionate about building secure, scalable,
                        and user-friendly web applications that solve
                        real business problems.
                    </p>


                    {/* Developer Badge */}

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-blue-300">
                        🚀 Creator of BizzSoft
                    </div>

                </div>


                {/* =================================================
                    BIZZSOFT INFORMATION
                ================================================== */}

                <div className="p-8 sm:p-10 lg:p-12">

                    <div className="max-w-3xl">

                        <h3 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                            BizzSoft Inventory Management System
                        </h3>


                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-gray-300">
                            BizzSoft is a comprehensive web application
                            designed to help businesses streamline their
                            inventory, purchases, sales, and reporting —
                            all in one secure platform.
                        </p>


                        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-gray-300">
                            Built with modern technologies and engineering
                            practices, BizzSoft combines performance,
                            reliability, role-based access control, and
                            an intuitive user experience.
                        </p>


                        {/* =================================================
                            HIGHLIGHTS
                        ================================================== */}

                        <div className="mt-8 grid gap-5 sm:grid-cols-2">


                            {/* Secure */}

                            <div className="flex gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-900/40">
                                    🛡️
                                </div>

                                <div>

                                    <h4 className="font-bold text-[#102a56] dark:text-blue-300">
                                        Secure & Reliable
                                    </h4>

                                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-gray-400">
                                        Built with authentication,
                                        permissions, and role-based
                                        access control.
                                    </p>

                                </div>

                            </div>


                            {/* Fast */}

                            <div className="flex gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-900/40">
                                    ⚡
                                </div>

                                <div>

                                    <h4 className="font-bold text-[#102a56] dark:text-blue-300">
                                        Fast & Efficient
                                    </h4>

                                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-gray-400">
                                        Designed for efficient inventory
                                        and transaction management.
                                    </p>

                                </div>

                            </div>


                            {/* Reports */}

                            <div className="flex gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-900/40">
                                    📊
                                </div>

                                <div>

                                    <h4 className="font-bold text-[#102a56] dark:text-blue-300">
                                        Insightful Reports
                                    </h4>

                                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-gray-400">
                                        Sales, purchase, inventory,
                                        and low-stock reporting.
                                    </p>

                                </div>

                            </div>


                            {/* Responsive */}

                            <div className="flex gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-900/40">
                                    💻
                                </div>

                                <div>

                                    <h4 className="font-bold text-[#102a56] dark:text-blue-300">
                                        Modern & Responsive
                                    </h4>

                                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-gray-400">
                                        A responsive interface designed
                                        for desktop and mobile devices.
                                    </p>

                                </div>

                            </div>


                        </div>


                        {/* Developer Credit */}

                        <div className="mt-10 border-t border-slate-200 pt-6 text-center dark:border-gray-700">

                            <p className="text-sm font-semibold text-slate-600 dark:text-gray-300">
                                Proudly developed with ❤️ by{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                    Alwin John
                                </span>
                            </p>


                            <p className="mt-1 text-xs text-slate-400 dark:text-gray-500">
                                Full-Stack Developer · Creator of BizzSoft
                            </p>

                        </div>

                    </div>

                </div>


            </div>

        </div>

    </div>

</section>


                {/* =====================================================
                    CTA / FOOTER
                ====================================================== */}

                <footer className="bg-[#0b3b78]">

                    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

                        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-blue-900/40 px-6 py-6 md:flex-row">

                            <div className="flex items-center gap-5">

                                <BizzSoftLogo light />

                                <div className="hidden h-10 w-px bg-blue-300/30 md:block" />

                                <div className="hidden md:block">

                                    <p className="font-bold text-white">
                                        Manage Smarter. Grow Faster.
                                    </p>

                                    <p className="text-sm text-blue-100">
                                        Your reliable partner for efficient
                                        inventory management.
                                    </p>

                                </div>

                            </div>


                            <div className="flex gap-3">

                                {canLogin && (
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                                    >
                                        ↪ Log in
                                    </Link>
                                )}

                            </div>


                        </div>


                        <div className="mt-6 text-center text-xs text-blue-200">
                            © {new Date().getFullYear()} BizzSoft Inventory
                            Management System. Built with Laravel, Inertia.js,
                            React and Tailwind CSS.
                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}


/* =============================================================
   FEATURE CARD
============================================================= */

function FeatureCard({
    type,
    title,
    description,
}) {
    return (
        <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700 dark:hover:shadow-blue-900/20">

            <FeatureIcon type={type} />

            <div className="flex-1">

                <h3 className="font-bold text-[#102a56] dark:text-blue-300">
                    {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-gray-400">
                    {description}
                </p>

            </div>


            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/40 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                →
            </div>

        </div>
    );
}


/* =============================================================
   TECHNOLOGY CARD
============================================================= */

function TechCard({
    icon,
    name,
    detail,
}) {
    return (
        <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700">

            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {icon}
            </div>

            <div className="mt-2 text-sm font-bold text-[#102a56] dark:text-blue-300">
                {name}
            </div>

            <div className="mt-1 text-xs text-slate-400 dark:text-gray-500">
                {detail}
            </div>

        </div>
    );
}