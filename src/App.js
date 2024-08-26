/* npm packages */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";

/* apis */

/* global states */

/* helpers */

export const App = () => {
	/* app */
	const navigate = useNavigate();

	/* user */
	// const [{ avatar, username, email, accessToken, _id }] = useRecoilState(userDefault);

	return (
		<div className='flex flex-col justify-center w-full h-full bg-white app items-top'>
			<div className='header h-[4.5rem] w-full bg-white border-b-[1px] border-gray-200 flex justify-between px-10'>
				{/* <Header /> */}
				HEADER
			</div>

			<div className='w-full h-full content'></div>

			<div className='footer'></div>
		</div>
	);
};
