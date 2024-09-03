import React from "react";
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Recipient = ({ setActivelink, currRecipient: { avatar, username, wasOnline } }) => {
	const handBackClick = () => {
		setActivelink(1);
	};
	return (
		<div className='w-full h-full flex gap-2 justify-start items-center px-6'>
			<div className='text-[18px] text-blue-500 font-[800] cursor-pointer' onClick={handBackClick}>
				<Fontawesome type={"faArrowLeft"}/>
			</div>
			<div className='avatar overflow-hidden ml-1'>
				<img
					src={avatar}
					className='h-[40px] w-[40px] 
                                border-[2px] border-solid 
                                border-white object-cover p-[0px]
                                text-shadow-custom_02  rounded-full
                                '
				/>
			</div>

			<div className='username flex flex-col leading-[18px]'>
				<span className='text-[16px] text-black  text-shadow-custom_02 font-[500]'>
					{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
				</span>

				<span className='text-[11px] text-green-500  text-shadow-custom_005 font-[500]'>Online</span>
			</div>
		</div>
	);
};
