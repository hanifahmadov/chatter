import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { createBrowserHistory } from "history";

/* images */
import denied from "../image/mobile.png";
import cookies from "../image/cookies.png";
import serverIssue from "../image/server-down.png";

/* error states */
import { errorContentDefault, refreshErrorDefault } from "../states/app_state";

export const RefreshError = () => {
	/* navigate & avoid back travel*/
	const navigate = useNavigate();
	const history = createBrowserHistory();

	/* get error trigger */
	const [refreshError, setRefreshError] = useRecoilState(refreshErrorDefault);

	/* get error messages */
	const [{ status, text1, text2 }] = useRecoilState(errorContentDefault);

	const handleNavigate = () => {
		setRefreshError(false);
		// Preventing back navigation
		/** doest work
		 *  fix this issue so cant ravel back at allllll
		 *  fucking replace-true doesnt work
		 */
		navigate("/welcome/signin", { replace: true });
	};

	const getImage = (status) => {
		switch (status) {
			case 401:
				return denied;
			case 422:
				return cookies;
			default:
				return serverIssue;
		}
	};
	return (
		<motion.div
			initial={{ y: -700, opacity: 0, display: "none" }}
			animate={
				refreshError
					? { y: 0, opacity: 1, display: "flex" }
					: { y: 0, opacity: 0, transition: { delay: 0 }, transitionEnd: { y: -700, display: "none" } }
			}
			transition={{ type: "spring", bounce: 0.3, delay: 0.5, duration: 0.75 }}
			className='absolute z-20 inset-4 rounded-3xl 
                    bg-white bg-opacity-80  
                    backdrop-blur-[5px]
                    flex flex-col justify-center items-center
                    '
		>
			<div>
				{status && (
					<motion.div
						className='flex gap-5 flex-col justify-center items-center 
                                    text-shadow-custom_02 font-[400]'
					>
						<div className='img wrapper'>
							<img src={getImage(status)} className='h-[50px] w-[50px]' />
						</div>

						<div className='flex flex-col justify-center items-center'>
							<span>{text1}</span>
							<span>{text2}</span>
						</div>
					</motion.div>
				)}

				<div className='flex gap-0 mt-5 flex-col justify-center items-center'>
					<span className='text-shadow-custom_02 font-[400] '> Please try re-sign in.</span>

					<div
						onClick={handleNavigate}
						className='text-shadow-custom_01 
                                    font-[600]
									text-blue-700 
									bg-blue-50 
									hover:bg-gray-50
									cursor-pointer 
									inline-block
									px-4 py-[3px] mt-2
									rounded
									text-center
                                    bg-white
									border-[1px]
									transition-colors duration-200 ease-in-out
									'
					>
						Sign in.
					</div>
				</div>
			</div>
		</motion.div>
	);
};
