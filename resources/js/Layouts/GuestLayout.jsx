import { useEffect } from 'react';

export default function GuestLayout({ children }) {

    useEffect(() => {
        const theme = localStorage.getItem('theme');

        document.documentElement.classList.toggle(
            'dark',
            theme === 'dark'
        );
    }, []);

    return (
        <>
            {children}
        </>
    );
}