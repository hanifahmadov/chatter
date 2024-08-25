import React from "react";

import { Backdrop_Container } from "./layouts.styled";

export const Backdrop = ({ kids }) => {
	return (
		<Backdrop_Container className='backdrop bg-white h-screen w-screen flex items-center justify-center fixed'>
			{kids}
		</Backdrop_Container>
	);
};
