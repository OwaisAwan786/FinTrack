/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-color': 'var(--bg-color)',
                'surface-color': 'var(--surface-color)',
                'text-primary': 'var(--text-primary)',
                'primary-glow': 'var(--primary-glow)',
            },
        },
    },
    plugins: [],
}
