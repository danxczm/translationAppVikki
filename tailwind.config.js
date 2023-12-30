/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'background-blue': '#EEF5FF',
            },
        },
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },
    plugins: [],
};
