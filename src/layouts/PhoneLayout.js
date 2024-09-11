/* NPM packages */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";

/* styles */
import { PhoneContainer } from "./layout.styled";

/* global states */
import { deviceDefault } from "../store/states/app_state";

/* helpers */
import { SignsError } from "../store/errors/SignsError";
import { SignupSuccess } from "../store/errors/SignupSuccess";
import { RefreshError } from "../store/errors/RefreshError";

export const PhoneLayout = () => {
	/**
	 *  device state and
	 *  parse into regular to me modified
	 */
	let [device, setDevice] = useRecoilState(deviceDefault);
	device = JSON.parse(JSON.stringify(device));

	/* small screen */
	let sm = useMediaQuery({
		query: "(max-width: 576px)",
	});

	/* medium screen */
	let md = useMediaQuery({
		query: "(max-width: 768px)",
	});

	/**
	 *  adjust the sizing
	 *  sm 576
	 *  md 768
	 */
	useEffect(() => {
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
                            fixed inset-0 bg-white
                        '
			>
				<PhoneContainer
					className={`display h-[80svh] max-h-[926px] w-[23rem]
							    flex flex-col justify-between overflow-hidden
							    shadow-custom_07  border-[3px] border-white
							    rounded-[30px] p-[2px] bg-slate-50 relative
							`}
				>
					<SignsError />
					<SignupSuccess />
					<RefreshError />

					<Outlet />
				</PhoneContainer>
			</div>
		</ThemeProvider>
	);
};
