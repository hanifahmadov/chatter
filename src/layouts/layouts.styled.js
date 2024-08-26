/* eslint-disable */
import styled from "styled-components";
import { motion } from "framer-motion";

export const Loading = styled.div(({ theme: {} }) => ({
	width: "100%",
	height: "100%",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",

	color: "rgba(255, 255, 255, 1)",
	fontSize: "3rem",
	fontWeight: "500",
	letterSpacing: "3px",
}));

// REGISTER
export const RegisterLayout_Container = styled.div(({ theme: {} }) => ({
	width: "100%",
	height: "100%",
	padding: "0.01px",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",

	// background: "green",
}));

export const Loading_Container = styled.div(({ theme: {} }) => {
	return {
		width: "100%",
		height: "100%",

		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		color: "rgba(0, 0, 0, 1)",
		fontSize: "1.1rem",
		textShadow:'1px 1px 2px rgba(0, 0, 0, 0.1)',

	};
});

export const Backdrop_Container  = styled.div(({ theme: {} }) => {
	return {
		

	};
});

// export const  = styled.div(({ theme: {} }) => {
// 	return {};
// });

// export const  = styled.div(({ theme: {} }) => {
// 	return {};
// });

// export const  = styled.div(({ theme: {} }) => {
// 	return {};
// });
