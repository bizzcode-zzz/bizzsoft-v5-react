import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>

            <Head title="Forgot Password" />

            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 py-8">

                <div className="w-full max-w-md">

                    {/* Main Card */}

                    <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-xl">

                        {/* Header */}

                        <div className="border-b border-[#30363d] bg-[#161b22] px-6 py-6 text-center text-[#f0f6fc]">

                            <div className="mb-2 text-3xl">
                                🔐
                            </div>

                            <h1 className="text-xl font-bold">
                                Reset Your Password
                            </h1>

                            <p className="mt-1 text-sm text-[#8b949e]">
                                BizzSoft Inventory Management System
                            </p>

                        </div>


                        {/* Form */}

                        <div className="bg-[#161b22] p-6">

                            <p className="mb-5 text-sm leading-6 text-[#8b949e]">
                                Forgot your password? No problem. Enter
                                your email address and we will send you
                                a password reset link.
                            </p>


                            {status && (

                                <div className="mb-5 rounded-md border border-[#238636] bg-[#0d2818] px-4 py-3 text-sm font-medium text-[#3fb950]">

                                    ✓ {status}

                                </div>

                            )}


                            <form onSubmit={submit}>

                                {/* Email */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-[#f0f6fc]"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border
                                            border-[#30363d]
                                            bg-[#0d1117]
                                            px-3
                                            py-2
                                            text-sm
                                            text-[#f0f6fc]
                                            placeholder-[#8b949e]
                                            shadow-sm
                                            focus:border-[#238636]
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-[#238636]
                                        "
                                        placeholder="Enter your account email"
                                        autoComplete="email"
                                        autoFocus
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


                                {/* Submit */}

                                <div className="mt-6">

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="
                                            inline-flex
                                            w-full
                                            items-center
                                            justify-center
                                            rounded-md
                                            border
                                            border-transparent
                                            bg-[#238636]
                                            px-4
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition
                                            duration-150
                                            ease-in-out
                                            hover:bg-[#2ea043]
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-[#238636]
                                            focus:ring-offset-2
                                            focus:ring-offset-[#161b22]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        {processing
                                            ? 'Sending Reset Link...'
                                            : '📧 Email Password Reset Link'}
                                    </button>

                                </div>

                            </form>


                            {/* Back to Login */}

                            <div className="mt-5 text-center">

                                <a
                                    href={route('login')}
                                    className="
                                        text-sm
                                        text-[#8b949e]
                                        underline
                                        transition
                                        hover:text-[#f0f6fc]
                                    "
                                >
                                    ← Back to Login
                                </a>

                            </div>

                        </div>


                        {/* Footer */}

                        <div className="border-t border-[#30363d] bg-[#0d1117] px-6 py-4 text-center">

                            <p className="text-sm font-semibold text-[#f0f6fc]">
                                BizzSoft Inventory Management System
                            </p>

                            <p className="mt-1 text-xs text-[#8b949e]">
                                Version 5 · Built with React + Inertia
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </GuestLayout>
    );
}