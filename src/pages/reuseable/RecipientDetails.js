import React from "react";
import { formatDate } from "../../store/days/days";

export const RecipientDetails = ({ currRecipient: { avatar, username, email, createdAt } }) => {
	return (
		<div className='curr_recipient flex flex-col justify-start items-center w-full  bg-slate-0 py-[1rem]'>
			<div className='w-auto h-auto flex justify-center items-center object-cover'>
				<img
					src={avatar}
					className='h-[110px] w-[110px] 
                                        rounded-lg border-[3px] border-solid 
                                        border-white object-cover p-[1px]
                                        overflow-hidden bg-white
                                        '
				/>
			</div>

			<div className='flex flex-col justify-center items-center mt-3'>
				<span className='text-[20px] text-shadow-custom_02'>
					{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
				</span>
				<span className='text-[12px] text-shadow-custom_01 text-gray-500'>{email}</span>
			</div>

			<span className='text-[20px] text-blue-600 mt-2 text-shadow-custom_02'>ℹ</span>

			<div className='flex flex-col text-center'>
				<div className='flex flex-row gap-1 justify-center items-center text-gray-500'>
					<span className='text-[12px] text-shadow-custom_01'>Member since</span>
					<span className='text-[14px] leading-[0px] pt-5px'>✩</span>
				</div>

				{/* <span> {timeAgo.format(new Date(currRecipient.createdAt), "twitter")}</span> */}
				<span className='text-shadow-custom_01 leading-[16px]'>{formatDate(createdAt)}</span>
			</div>
		</div>
	);
};
