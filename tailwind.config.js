/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'icon-gradient': 'linear-gradient(0deg, rgba(0,0,0,0.7205383129814426) 0%, rgba(0,0,0,0.26395567992822133) 28%, rgba(255,255,255,1) 100%)',
            },
            colors: {
                primary: "#ffb70b",
            },
            spacing: {
                'gap-container': 'var(--gap-container)',
                'lofi-menu-height': 'var(--lofi-menu-height)',
                'lofi-panel-position': 'var(--lofi-panel-position)',
            },
            width: {
                'screen-padding': 'var(--w-screen-padding)',
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
                flickerNightMode: {
                    '0%': {opacity: '1'},
                    '50%': {opacity: '0', transform: 'translateX(-7px)'},
                    '100%': {opacity: '1', transform: 'translateX(-14px)'},
                },
                flickerDayMode: {
                    '0%': {opacity: '1', transform: 'translateX(-14px)'},
                    '50%': {opacity: '0', transform: 'translateX(-7px)'},
                    '100%': {opacity: '1'},
                }
            },
            animation: {
                switch: 'switch 1s ease-in-out forwards',
                reverseSwitch: 'reverseSwitch 1s ease-in-out forwards',
                flickerNightMode: 'flickerNightMode 1s ease-in-out forwards',
                flickerDayMode: 'flickerDayMode 1s ease-in-out forwards',
            },
        },
    },
    plugins: [],
}
