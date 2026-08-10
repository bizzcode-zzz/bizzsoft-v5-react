import { Link } from '@inertiajs/react';

export default function Button({
    children,
    variant = 'primary',
    type = 'button',
    disabled = false,
    href = null,
    className = '',
    ...props
}) {
    const variants = {
        primary:
            'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20',

        secondary:
            'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200',

        danger:
            'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20',
    };

    const classes = `
        inline-flex
        items-center
        justify-center
        rounded-xl
        border
        border-transparent
        px-4
        py-2.5
        text-sm
        font-semibold
        transition
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        focus:ring-offset-white
        ${variants[variant] ?? variants.primary}
        ${className}
    `;

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                ${classes}
                disabled:cursor-not-allowed
                disabled:opacity-50
            `}
            {...props}
        >
            {children}
        </button>
    );
}