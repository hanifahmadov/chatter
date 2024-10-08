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
	const [{ accessToken, avatar, username, email, createdAt, _id }, setSignedinUser] =
		useRecoilState(signedUserDefault);

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
			setSignedinUser(null);
			navigate("/welcome", { replace: true });
		});
	};

	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
			<div>
				<img
					src={avatar}
					className='h-[100px] w-[100px] 
                                border-[5px] border-solid 
                                border-white object-cover p-[0px]
                                text-shadow-custom_02  rounded-lg bg-white
                                '
				/>
			</div>

			<div className='flex flex-col justify-center items-center mt-4'>
				<span
					className='text-[18px] text-black font-[500] font-sans
								text-shadow-custom_01'
				>
					{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
				</span>

				<span className='text-[14px] relative bottom-[5px]'>{email}</span>

				<span className='mt-2'>
					<div className='flex gap-2 flex-col text-center leading-[12px]'>
						<div className='flex flex-row gap-1 justify-center items-center text-gray-700'>
							<span className='text-[12px] text-shadow-custom_01'>✩</span>
							<span className='text-[12px] text-black font-sans'>Member since</span>
							<span className='text-[12px] text-shadow-custom_01 block'>✩</span>
						</div>

						<span className='text-[12px]'>{formatDate(createdAt)}</span>
					</div>
				</span>
			</div>

			<div className='flex flex-col gap-2 mt-5'>
				<span
					className='
								w-[150px] py-[4px] opacity-40 cursor-not-allowed
								text-shadow-custom_01 text-white text-[14px] text-center 
								bg-blue-500 rounded-sm font-[500] inline-block
								
								'
				>
					Edit
				</span>
				<motion.span
					whileTap={{ scale: 1.05 }}
					onClick={handleSignOut}
					className=' w-[150px] py-[4px] mt-1 cursor-pointer hover:bg-blue-600
								text-shadow-custom_01 text-white text-[14px] text-center 
			                    bg-blue-500 rounded-sm font-[500] inline-block
			                   
			                    '
				>
					Sign out
				</motion.span>
			</div>
		</div>
	);
};
