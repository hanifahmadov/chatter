import styled from "styled-components";

export const App_Container = styled.div(
	({
		theme: {
			device: { sm, md },
		},
	}) => {
		// sm 640
		// md 768


		return {
			...(md && {
				background: "red",
			}),

			...(sm && {
				".display": {
					width: "100svw",
					height: "100svh",
					borderRadius: "0px",
				},

				".header": {
					height: "3.5rem",
				},

				".body": {
					// h-[calc(100%-5rem-5.5rem-1rem)]
					// height: "calc(100%-3.5rem-4rem-1rem)",
					height: "calc(100% - 3.5rem - 4rem - 1rem)", 
				},

				".footer": {
					height: "4rem",
				},
			}),
		};
	}
);

export const User_Container = styled.div(({ theme: { device } }) => {

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
