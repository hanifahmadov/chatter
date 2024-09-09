import React, { useState } from "react";
import { motion } from "framer-motion";
import { replace, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { successState } from "../states/app_state";

export const SuccessToaster = () => {
	/* states */
	const [success, setSuccess] = useRecoilState(successState);

	/* navigate */
	const navigate = useNavigate();

	const handleNavigateSignin = (e) => {
		setSuccess(false);
		navigate("/welcome/signin", { replace: true });
	};

	return (
		<motion.div
			initial={{ y: -700, opacity: 0, display: "none" }}
			animate={
				success
					? { y: 0, opacity: 1, display: "flex" }
					: { y: 0, opacity: 0, transitionEnd: { y: -700, display: "none" } }
			}
			transition={{ type: "spring", bounce: 0.3, duration: 0.75 }}
            
			className='absolute z-20 inset-4 rounded-3xl 
                            bg-white bg-opacity-80  
                            backdrop-blur-[3px]
                            flex flex-col justify-center items-center
                            '
		>
			{/* <svg
				className='animate-spin h-7 w-7 text-green-500'
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
			>
				<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
				<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
			</svg> */}

			<motion.svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 30 30' // Adjusted viewBox to fit the larger check mark
				fill='none'
				stroke='#4CAF50'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				width='35'
				height='35'
			>
				<motion.circle
					cx='15' // Adjusted cx to center in the new viewBox
					cy='15' // Adjusted cy to center in the new viewBox
					r='12' // Increased radius to fit the new viewBox
					initial={{ strokeDasharray: 75.4, strokeDashoffset: 75.4 }}
					animate={success ? { strokeDashoffset: 0 } : { strokeDasharray: 75.4, strokeDashoffset: 75.4 }}
					transition={{ duration: 1.5, delay: 0.25, ease: "easeInOut" }}
				/>
				<motion.path
					d='M10 15l3 3 6-6' // Adjusted path to scale with the new viewBox
					initial={{ strokeDasharray: 25, strokeDashoffset: 25 }}
					animate={success ? { strokeDashoffset: 0 } : { strokeDasharray: 25, strokeDashoffset: 25 }}
					transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
					strokeWidth='2' // Increased strokeWidth for the larger check mark
				/>
			</motion.svg>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={success ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
				transition={{ delay: 2, duration: 0.25 }}
				className='mt-2 text-shadow-custom_02 font-[500]'
			>
				Signed up successfully.
			</motion.div>

			<motion.div
				onClick={handleNavigateSignin}
				initial={{ opacity: 0 }}
				animate={success ? { opacity: 1 } : { opacity: 0 }}
				transition={{ delay: 2.8, duration: 0.5 }}
				className='mt-2 text-shadow-custom_02 font-[600] cursor-pointer
                             px-3 py-1 rounded-md text-blue-500 text-[16px] hover:bg-white
                            '
			>
				sign in.
			</motion.div>
		</motion.div>
	);
};
