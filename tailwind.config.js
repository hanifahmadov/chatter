/** @type {import('tailwindcss').Config} */
const textshadow = require('tailwindcss-textshadow');

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
		  textShadow: {
			custom_000: '1px 1px 2px rgba(0, 0, 0, 0)',
			custom_005: '1px 1px 2px rgba(0, 0, 0, 0.05)',
			custom_01: '1px 1px 2px rgba(0, 0, 0, .1)',
			custom_02: '1px 1px 2px rgba(0, 0, 0, .2)',
			custom_03: '1px 1px 2px rgba(0, 0, 0, .3)',
			custom_04: '1px 1px 2px rgba(0, 0, 0, .4)',
			custom_05: '1px 1px 2px rgba(0, 0, 0, .5)',
			custom_06: '1px 1px 2px rgba(0, 0, 0, .6)',
			custom_07: '1px 1px 2px rgba(0, 0, 0, .7)',
			custom_08: '1px 1px 2px rgba(0, 0, 0, .8)',
			custom_09: '1px 1px 2px rgba(0, 0, 0, .9)',
			custom_1: '1px 1px 2px rgba(0, 0, 0, 1)',
		  },
		},
	  },
	  plugins: [textshadow],
};
