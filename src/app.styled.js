import styled from "styled-components";

export const App_Container = styled.div(
	({
		theme: {
			device: { sm, md },
		},
	}) => {
		// sm 640
		// md 768
		console.log("sm sm md md", sm, md);

		return {
			...(md && {
				background: "red",
			}),

			...(sm && {
				".display": {
					width: "100%",
					height: "100%",
					borderRadius: "0px",
				},
			}),
		};
	}
);

export const User_Container = styled.div(({ theme: { device } }) => {
	console.log(device);
	return {};
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
// export const  = styled.div(({ theme: {} }) => {
// 	return {};
// });
