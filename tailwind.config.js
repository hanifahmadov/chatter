/** @type {import('tailwindcss').Config} */
const textshadow = require("tailwindcss-textshadow");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
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
			},

			boxShadow: {
				custom01: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)",
				custom02: "0px 0px 0px 1px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 1px rgba(209, 213, 219,1)",
				custom03: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				custom04: "0px 1px 0px 0px rgba(27, 31, 36, 0.04)"
			},
		},
	},
	plugins: [textshadow],
};
