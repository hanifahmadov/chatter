/** @type {import('tailwindcss').Config} */
const textshadow = require("tailwindcss-textshadow");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			keyframes: {
				dotPulse: {
					"0%": { opacity: 0.2, color: "black" }, // Dimmed at the start
					"20%": { opacity: 1 }, // Bright at 20%
					"80%": { opacity: 1 }, // Stay bright
					"100%": { opacity: 0.2 }, // Dimmed again at the end
				},
			},

			animation: {
				"dot-1": "dotPulse 1s linear 0s infinite",
				"dot-2": "dotPulse 1s linear 0.1s infinite",
				"dot-3": "dotPulse 1s linear 0.2s infinite",
				"dot-4": "dotPulse 1s linear 0.3s infinite",
				"dot-5": "dotPulse 1s linear 0.4s infinite",
				"dot-6": "dotPulse 1s linear 0.5s infinite",
				"dot-7": "dotPulse 1s linear 0.6s infinite",
			},

			fontFamily: {
				sans: [
					"-apple-system",
					"BlinkMacSystemFont",
					'"Segoe UI"',
					"Roboto",
					'"Helvetica Neue"',
					"Arial",
					"sans-serif",
				],
			},

			textShadow: {
				custom_000: "1px 1px 2px rgba(0, 0, 0, 0)",
				custom_005: "1px 1px 2px rgba(0, 0, 0, 0.05)",
				custom_01: "1px 1px 2px rgba(0, 0, 0, .1)",
				custom_02: "1px 1px 2px rgba(0, 0, 0, .2)",
				custom_03: "1px 1px 2px rgba(0, 0, 0, .3)",
				custom_04: "1px 1px 2px rgba(0, 0, 0, .4)",
				custom_05: "1px 1px 2px rgba(0, 0, 0, .5)",
				custom_06: "1px 1px 2px rgba(0, 0, 0, .6)",
				custom_07: "1px 1px 2px rgba(0, 0, 0, .7)",
				custom_08: "1px 1px 2px rgba(0, 0, 0, .8)",
				custom_09: "1px 1px 2px rgba(0, 0, 0, .9)",
				custom_1: "1px 1px 2px rgba(0, 0, 0, 1)",

				custom_white_005: "1px 1px 2px rgba(255, 255, 255, 0.05)",
				custom_white_01: "1px 1px 2px rgba(255, 255, 255, .1)",
				custom_white_02: "1px 1px 2px rgba(255, 255, 255, .2)",
				custom_white_03: "1px 1px 2px rgba(255, 255, 255, .3)",
				custom_white_04: "1px 1px 2px rgba(255, 255, 255, .4)",
				custom_white_05: "1px 1px 2px rgba(255, 255, 255, .5)",

				custom_white_06: "1px 1px 2px rgba(255, 255, 255, .6)",
				custom_white_07: "1px 1px 2px rgba(255, 255, 255, .7)",
				custom_white_08: "1px 1px 2px rgba(255, 255, 255, .8)",
				custom_white_09: "1px 1px 2px rgba(255, 255, 255, .9)",
			},

			boxShadow: {
				custom_01: "0px 3px 5px rgba(0, 0, 0, 0.04);",
				custom_02: "0px 0px 0px 1px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 1px rgba(209, 213, 219,1)",
				custom_03: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				custom_04: "0px 1px 0px 0px rgba(27, 31, 36, 0.04)",
				custom_05: "0 2px 4px 0 rgba(0, 0, 0, .13), 0 1px 1px 0 rgba(0, 0, 0, .11)",
				custom_06:
					"0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15)",
				custom_07: "0 7px 30px -10px rgba(150,170,180,0.5)",
				custom_08: "0px 0px 0px 1px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 1px rgba(209, 213, 219,1)",
				custom_09: "0 7px 30px -10px rgba(150,170,180,0.5)",
			},
		},
	},
	plugins: [textshadow, require("tailwind-scrollbar"), require("tailwindcss-animate")],
};

// <div className='root h-screen w-screen'>
// 	<div className='header h-5rem w-full'>

// 	</div>

// 	<div>

// 	</div>

// 	<div className='footer h-5'>

// 	</div>
// </div>
