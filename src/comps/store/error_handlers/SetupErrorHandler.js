import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const SetupErrorHandler = () => {
	const navigate = useNavigate();

	return (
		<div className='mx-auto  text-center p-4 text-shadow-custom_01'>
			<div className=''>Cookies has expired</div>
			<div>Please re-sign in.</div>

			<div>
				<motion.button
					whileTap={{ scale: 0.99 }}
					onClick={() => navigate("/signin", { replace: true })}
					class='bg-blue-800 hover:bg-blue-700 
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
