import { useEffect, useState } from 'react';

export default function ThemeToggle({ showLabel = false }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);

        localStorage.setItem(
            'theme',
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);

    return (
        <button
            type="button"
            onClick={() =>
                setDarkMode((previous) => !previous)
            }
            className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-sm
                font-semibold
                text-slate-600
                transition
                hover:bg-slate-50
                dark:border-gray-600
                dark:bg-gray-800
                dark:text-gray-200
                dark:hover:bg-gray-700
            "
        >
            {showLabel
                ? darkMode
                    ? '☀️ Light Mode'
                    : '🌙 Dark Mode'
                : darkMode
                    ? '☀️'
                    : '🌙'}
        </button>
    );
}