import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const SetupErrorHandler = ({ setBackdrop }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		setBackdrop(false);
		navigate("/welcome/signin", { replace: true });
	};

	return (
		<div className='mx-auto  text-center p-4 text-shadow-custom_01'>
			<div className=''>Cookies have expired</div>
			<div>Please re-sign in.</div>

			<div>
				<motion.button
					whileTap={{ scale: 0.99 }}
					onClick={handleClick}
					className='bg-blue-800 hover:bg-blue-700 
                           text-white font-bold 
                           py-1 px-3 mt-3 
                           rounded font-medium 
                           text-shadow-custom_02 
						   transition-colors duration-200 ease-in-out 
						    w-full
						   '
				>
					sign in
				</motion.button>
			</div>
		</div>
	);
};
