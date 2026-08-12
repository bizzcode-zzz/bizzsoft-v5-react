export default function Card({
    children,
    title,
    className = '',
}) {
    return (
        <div
            className={`
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                shadow-blue-900/5
                transition
                duration-200
                hover:shadow-md
                dark:border-gray-700
                dark:bg-gray-800
                dark:shadow-black/20
                ${className}
            `}
        >

            {title && (
                <div className="border-b border-slate-100 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-800">

                    <h3 className="text-base font-bold text-[#102a56] dark:text-white">
                        {title}
                    </h3>

                </div>
            )}

            <div className="p-5 text-slate-700 dark:text-gray-200">
                {children}
            </div>

        </div>
    );
}