/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#ffb70b",
            },
            spacing: {
                "gap-container": '10px',
                "lofi-menu-height": "var(--lofi-menu-height)",
                "lofi-panel-position": "var(--lofi-panel-position)",
            },
            height: {}
        },
    },
    plugins: [],
}