/* eslint-disable */
export const apiUrl =
	window.location.hostname === "localhost" ? process.env.REACT_APP_SERVER_DEV : process.env.REACT_APP_SERVER_PRO;
