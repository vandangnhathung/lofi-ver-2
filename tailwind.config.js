/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ffb70b",
            },
            spacing: {
                'gap-container': '10px',
                'lofi-menu-height': 'var(--lofi-menu-height)',
                'lofi-panel-position': 'var(--lofi-panel-position)',
            },
            keyframes: {
                switch: {
                    '0%': {left: '4px'},
                    '50%': {left: '4px', width: '35px'},
                    '100%': {left: '33px', width: '23px'},
                },
                reverseSwitch: {
                    '0%': {left: '33px'},
                    '50%': {left: '15px', width: '35px'},
                    '100%': {left: '4px', width: '23px'},
                },
            },
            animation: {
                switch: 'switch 1s ease-in-out forwards',
                reverseSwitch: 'reverseSwitch 1s ease-in-out forwards',
            },
        },
    },
    plugins: [],
}
