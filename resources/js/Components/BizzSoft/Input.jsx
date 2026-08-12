export default function Input({
    label,
    error,
    hint,
    className = '',
    ...props
}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full max-w-md
                    rounded-md
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2
                    text-sm
                    text-gray-900
                    placeholder-gray-400
                    outline-none
                    transition
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-600
                    dark:border-gray-600
                    dark:bg-gray-800
                    dark:text-white
                    dark:placeholder-gray-400
                    dark:focus:border-green-500
                    dark:focus:ring-green-500
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${error
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }
                    ${className}
                `}
            />

            {hint && !error && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {hint}
                </p>
            )}

            {error && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}