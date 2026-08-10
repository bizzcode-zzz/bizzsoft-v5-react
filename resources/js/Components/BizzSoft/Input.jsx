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
                <label className="mb-2 block text-sm font-semibold text-[#f0f6fc]">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full max-w-md
                    rounded-md
                    border
                    border-[#30363d]
                    bg-[#0d1117]
                    px-3
                    py-2
                    text-sm
                    text-[#f0f6fc]
                    placeholder-[#8b949e]
                    outline-none
                    transition
                    focus:border-[#238636]
                    focus:ring-2
                    focus:ring-[#238636]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${error ? 'border-[#f85149]' : ''}
                    ${className}
                `}
            />

            {hint && !error && (
                <p className="mt-1 text-xs text-[#8b949e]">
                    {hint}
                </p>
            )}

            {error && (
                <p className="mt-1 text-xs text-[#f85149]">
                    {error}
                </p>
            )}
        </div>
    );
}