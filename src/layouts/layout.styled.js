/* eslint-disable */
import styled from "styled-components";



export const PhoneContainer = styled.div(
	({
		theme: {
			device: { sm, md },
		},
	}) => {

		// sm 640
		// md 768

		return {
			...(md && {}),

			...(sm && {
				// ".display": {
				// 	width: "100svw",
				// 	height: "100svh",
				// 	borderRadius: "0px",
				// },

				// ".header": {
				// 	height: "3.5rem",
				// },

				// ".body": {
				// 	// h-[calc(100%-5rem-5.5rem-1rem)]
				// 	// height: "calc(100%-3.5rem-4rem-1rem)",
				// 	height: "calc(100% - 3.5rem - 4rem - 1rem)",
				// },

				// ".footer": {
				// 	height: "4rem",
				// },

				width: "100%",
				height: "100%",
				border: "none",
				boxShadow: "none",
			}),
		};
	}
);
