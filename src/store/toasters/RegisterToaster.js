import React, { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";

/* states */
import { registerToasterDefault } from "../states/app_state";

/* helpers */
import { Fontawesome } from "../fontawesome/Fontawesome";

export const RegisterToaster = ({ registerToasterContent: { text1, text2 } }) => {
	/* toaster state */
	const [registerToaster, setRegisterToaster] = useRecoilState(registerToasterDefault);

	return (
		<motion.div
			initial={{ y: -100, display: "none" }}
			animate={registerToaster ? { y: 0, display: "flex" } : { y: -100, transitionEnd: { display: "none" } }}
			transition={{ type: "spring", bounce: 0.3, duration: 0.75 }}
			className={`min-h-[3rem] max-h-[5rem] rounded-xl 
									bg-red-100 border-[1px] border-red-200
									 flex-row justify-center items-center
									absolute z-20 top-3 right-4 left-4 p-2
									flex justify-center items-center 

									`}
		>
			<div className='flex flex-col text-center text-shadow-custom_01 text-[12px] font-[500]'>
				<span className='text-1'>{text1}</span>
				<span className='text-2'>{text2}</span>
			</div>

			<div
				onClick={() => setRegisterToaster(false)}
				className='absolute right-[2px] top-[2px] 
										bg-red-500  text-white text-[10px] p-1 rounded-full
										h-[18px] w-[18px] cursor-pointer
										flex justify-center items-center

										'
			>
				<Fontawesome type={"faXmark"} />
			</div>
		</motion.div>
	);
};
