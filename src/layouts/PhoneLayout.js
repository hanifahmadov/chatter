/* NPM packages */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";

/* apis & img */
import img from "../store/image/chat01.png";

/* state */
import { deviceDefault } from "../store/states/app_state";

/* styled */
import { PhoneContainer } from "./layouts.styled";

/* helpers */

export const PhoneLayout = () => {
	/* device state */
	let [device, setDevice] = useRecoilState(deviceDefault);

	/* small screen */
	let sm = useMediaQuery({
		query: "(max-width: 576px)",
	});

	/* medium screen */
	let md = useMediaQuery({
		query: "(max-width: 768px)",
	});

	/* adjust screen size */
	useEffect(() => {
		device = JSON.parse(JSON.stringify(device));
		setDevice({
			...device,
			sm,
			md,
		});
	}, [sm, md]);

	return (
		<ThemeProvider theme={{ device }}>
			<div
				className='app h-[100svh] w-[100svw] 
                        flex justify-center items-center
                        fixed inset-0
                    '
			>
				<PhoneContainer
					className={`display h-[80svh] max-h-[926px] w-[23rem]
							flex flex-col justify-between overflow-hidden
							shadow-custom_07  border-[3px] border-white
							rounded-[30px] p-[2px] bg-slate-50
							`}
				>
					<Outlet />
				</PhoneContainer>
			</div>
		</ThemeProvider>
	);
};
