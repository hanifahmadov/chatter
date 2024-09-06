import React from "react";
import { Outlet } from "react-router-dom";

export const PhoneLayout = () => {
	return (
		<div
			className='app h-[100svh] w-[100svw] bg-white
                        flex justify-center items-center
                        fixed inset-0
                    '
		>
			<div
				className='display h-[80svh] max-h-[926px] w-[23rem] bg-slate-50
							flex flex-col justify-between overflow-hidden
							shadow-custom_07  border-[3px] border-white
							rounded-[30px] p-[2px]
							'
			>
				<Outlet />
			</div>
		</div>
	);
};
