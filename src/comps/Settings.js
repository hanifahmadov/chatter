/* NPM Packages */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

/** apis */
import { signout_api } from "../apis/signsCall";

/* global states */
import { signedUserDefault } from "../store/states/app_state";

/* helpers */
import { formatDate } from "../store/days/days";

export const Settings = ({ activelink, setActivelink }) => {
	/* navigate */
	const navigate = useNavigate();

	/* signed user  */
	const [{ accessToken, avatar, username, email, createdAt, _id }] = useRecoilState(signedUserDefault);

	/** handle sign out
	 *  disconnect and clear socket
	 *  navigate to welcome
	 */
	const handleSignOut = () => {
		/* signout api */
		signout_api(accessToken, _id).then((res) => {
			window.socket?.disconnect();
			window.socket = null;

			setActivelink(0);
			navigate("/welcome", { replace: true });
		});
	};


	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
			<div>
				<img
					src={avatar}
					className='h-[160px] w-[160px] 
								sm:h-[130px] sm:w-[130px]
                                border-[5px] border-solid 
                                border-white object-cover p-[0px]
                                text-shadow-custom_02  rounded-lg bg-white
                                '
				/>
			</div>

			<div className='flex flex-col justify-center items-center mt-4'>
				<span className='text-[33px] sm:text-[25px] text-gray-700  text-shadow-custom_02 font-[500]'>
					{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
				</span>

				<span
					className='text-[18px] sm:text-[14px] text-gray-600 
								text-shadow-custom_01 font-[400]
								relative bottom-[3px]
								'
				>
					{email}
				</span>

				<span className='mt-2'>
					<div className='flex gap-2 flex-col text-center'>
						<div className='flex flex-row gap-1 justify-center items-center text-gray-700'>
							<span className='text-[18px] sm:text-[14px] leading-[0px] pt-5px text-shadow-custom_01'>
								✩
							</span>
							<span className='text-[18px] sm:text-[14px] text-shadow-custom_01'>Member since</span>
							<span className='text-[18px] sm:text-[14px] leading-[0px] pt-5px text-shadow-custom_01'>
								✩
							</span>
						</div>

						{/* <span> {timeAgo.format(new Date(currRecipient.createdAt), "twitter")}</span> */}
						<span className='text-shadow-custom_02 text-gray-700 text-[18px] sm:text-[14px] relative bottom-[5px]'>
							{formatDate(createdAt)}
						</span>
					</div>
				</span>
			</div>

			<div className='flex flex-col gap-2 mt-3'>
				<span
					className='text-shadow-custom_07 text-white text-[14px] text-center 
								bg-blue-500 rounded-sm font-[500] inline-block
								w-[180px] sm:w-[150px] py-1 opacity-[0.4] cursor-not-allowed
								'
				>
					Edit
				</span>
				<motion.span
					whileTap={{ scale: 1.05 }}
					onClick={handleSignOut}
					className='text-shadow-custom_07 text-white text-[14px] text-center 
			                    bg-blue-500 rounded-sm font-[500] inline-block
			                    w-[180px] sm:w-[150px] py-1 mt-1 cursor-pointer hover:bg-blue-600
			                    '
				>
					Sign out
				</motion.span>
			</div>
		</div>
	);
};
