/* npm packages */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";

/* apis */

/* global states */

/* helpers */
import { Header } from "./store/helpers/Header";

export const App = () => {
	/* app */
	const navigate = useNavigate();

	/* user */
	// const [{ avatar, username, email, accessToken, _id }] = useRecoilState(userDefault);

	return (
		<div className='flex flex-col justify-center w-full max-w-[100rem] h-full bg-white app items-top'>
			<div className='header h-[4.5rem] w-full bg-white border-b-[1px] border-gray-200 flex justify-between px-10'>
				<Header />
			</div>

			<div
				className='content w-full h-full bg-gray-500
							flex flex-row justify-between
							'
			>
				<div className='content_left w-[21rem] h-full bg-slate-800'>

				</div>

				<div className='content_center  flex-grow-1 min-w-[40rem]  h-full'>
					
						
				</div>
				<div className='content_right w-[21rem] h-full bg-slate-800'>

				</div>
			</div>

			<div className='footer'></div>
		</div>
	);
};
