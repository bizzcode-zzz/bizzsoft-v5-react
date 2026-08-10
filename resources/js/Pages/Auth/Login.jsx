import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>

            <Head title="Log in" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10">

                <div className="mx-auto w-full max-w-md">

                    {/* =================================================
                        BIZZSOFT BRAND
                    ================================================== */}

                    <div className="mb-6 flex flex-col items-center">

                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25">

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


                            <div className="text-left">

                                <div className="text-2xl font-extrabold tracking-tight text-[#102a56]">
                                    Bizz<span className="text-blue-600">
                                        Soft
                                    </span>
                                </div>

                                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Inventory Management System
                                </div>

                            </div>

                        </Link>

                    </div>


                    {/* =================================================
                        LOGIN CARD
                    ================================================== */}

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-900/10">

                        {/* Header */}

                        <div className="border-b border-slate-100 px-6 py-7 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl">
                                🔐
                            </div>

                            <h1 className="mt-4 text-2xl font-extrabold text-[#102a56]">
                                Welcome Back
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Sign in to your BizzSoft account
                            </p>

                        </div>


                        {/* Login Form */}

                        <div className="p-6 sm:p-8">

                            {status && (

                                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                    {status}
                                </div>

                            )}


                            <form onSubmit={submit}>

                                {/* Email */}

                                <div>

                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                        className="font-semibold text-slate-700"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />

                                </div>


                                {/* Password */}

                                <div className="mt-5">

                                    <InputLabel
                                        htmlFor="password"
                                        value="Account Password"
                                        className="font-semibold text-slate-700"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />

                                </div>


                                {/* Remember Me */}

                                <div className="mt-5">

                                    <label className="flex items-center">

                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                        />

                                        <span className="ms-2 text-sm text-slate-600">
                                            Remember me
                                        </span>

                                    </label>

                                </div>


                                {/* Login Actions */}

                                <div className="mt-6">

                                    {canResetPassword && (

                                        <div className="mb-4 text-right">

                                            <Link
                                                href={route(
                                                    'password.request'
                                                )}
                                                className="text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>

                                        </div>

                                    )}


                                    <PrimaryButton
                                        className="w-full justify-center rounded-xl bg-blue-600 py-3 text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:bg-blue-700"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Logging in...'
                                            : '🔐 Login to Dashboard'}
                                    </PrimaryButton>

                                </div>

                            </form>

                        </div>


                        {/* =================================================
                            DEMO LOGIN DETAILS
                        ================================================== */}

                        <div className="border-t border-slate-100 bg-slate-50 px-6 py-6">

                            <h2 className="mb-4 text-center text-sm font-bold text-[#102a56]">
                                🔐 Demo Login Details
                            </h2>


                            {/* Admin */}

                            <div className="mb-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                                <p className="text-sm font-bold text-[#102a56]">
                                    👑 Administrator
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Email: admin@bizzsoft.dev
                                </p>

                                <p className="text-sm text-slate-500">
                                    Password: password
                                </p>

                            </div>


                            {/* Staff */}

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                                <p className="text-sm font-bold text-[#102a56]">
                                    👤 Staff
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Email: staff@bizzsoft.dev
                                </p>

                                <p className="text-sm text-slate-500">
                                    Password: password
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        FOOTER
                    ================================================== */}

                    <div className="mt-6 text-center">

                        <p className="text-sm font-semibold text-[#102a56]">
                            BizzSoft Inventory Management System
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Version 5 · Built with React + Inertia
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Secure Database-Driven RBAC
                        </p>

                    </div>

                </div>

            </div>

        </GuestLayout>
    );
}