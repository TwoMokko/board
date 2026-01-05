import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                dark: 'var(--dark-color)',
                main: 'var(--bg-main-color)',
                primary: 'var(--primary-color)',
                secondary: 'var(--secondary-color)',
                secondaryLight: 'var(--secondary-light-color)',
            },
        },
    },
    plugins: [],
};
