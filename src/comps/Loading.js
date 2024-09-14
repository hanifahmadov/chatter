import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Import your JSON animation file
import users from "../store/lottie/lottie_doc.json";
import search from "../store/lottie/left-right-01.json";

export const Loading = ({ chatsLoading, messageLoading }) => {
	return (
		<motion.div
			className={`${chatsLoading || messageLoading ? "flex" : "hidden"} justify-center items-center
         			    absolute top-0 left-0 w-full h-full z-10
						bg-white

            		`}
		>
			<motion.div
				initial={{ opacity: 0, display: "none" }}
				animate={
					chatsLoading || messageLoading
						? { opacity: 1, display: "flex" }
						: { opacity: 0, transitionEnd: { display: "none" } }
				}
				transition={{ duration: 0.25 }}
				className='w-full h-full flex flex-col justify-center items-center'
			>
				{(chatsLoading || messageLoading) && (
					<div className='flex flex-col justify-center items-center relative'>
						<Lottie
							animationData={chatsLoading ? users : search}
							loop={true}
							autoplay={true}
							className={chatsLoading ? "w-[80%] h-[100%]" : "w-[70%] h-[100%]"}
						/>
						<div className='flex gap-[1.5px] 
										text-[14px] text-gray-400 font-[400] font-sans
										absolute bottom-[4rem]
										'>
							{["L", "o", "a", "d", "i", "n", "g", ".", ".", "."].map((char, index) => (
								<span key={index}>{char}</span>
							))}
						</div>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
};
