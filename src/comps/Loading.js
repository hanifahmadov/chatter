import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Import your JSON animation file
import animationData from "../store/lottie/lottie_doc.json";

export const Loading = ({ loading }) => {
	return (
		<motion.div
			className={`${loading ? "flex" : "hidden"} justify-center items-center
         			    absolute top-0 left-0 w-full h-full z-10
						bg-white

            		`}
		>
			<motion.div
				initial={{ opacity: 0, display: "none" }}
				animate={loading ? { opacity: 1, display: "flex" } : { opacity: 0, transitionEnd: { display: "none" } }}
				transition={{ duration: 0.25 }}
				className='w-full h-full flex flex-col justify-center items-center'
			>
				<Lottie animationData={animationData} loop={true} autoplay={true} className='w-[80%] h-[80%]' />

				<div className='absolute bottom-[12rem]'>
					<div className='flex gap-[2px] text-[12px] text-gray-300'>
						<span className=''>L</span>
						<span className=''>o</span>
						<span className=''>a</span>
						<span className=''>d</span>
						<span className=''>i</span>
						<span className=''>n</span>
						<span className=''>g</span>
						<span className=''>.</span>
						<span className=''>.</span>
						<span className=''>.</span>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};
