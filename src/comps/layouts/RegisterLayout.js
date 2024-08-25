import React from "react";
import { Outlet } from "react-router-dom";

export const RegisterLayout = () => {
	return (
		<div className='
						h-screen w-screen 
						flex items-center justify-center 
						fixed
						'>
			<Outlet />
		</div>
	);
};
