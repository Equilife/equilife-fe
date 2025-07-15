/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				'poppins-light': ['Poppins_300Light'],
				'poppins': ['Poppins_400Regular'],
				'poppins-medium': ['Poppins_500Medium'],
				'poppins-semibold': ['Poppins_600SemiBold'],
				'poppins-bold': ['Poppins_700Bold'],
				// 'poppins-extrabold': ['Poppins_900Extrabold']
			},
		},
	},
	plugins: [],
}

