import React from "react";
import { useRecoilState } from "recoil";

/* global states */
import { currTimeoutIdDefault, unreadMessageCountDefault } from "../store/states/app_state";

/* helpers */
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Nav = ({ activelink, setActivelink, setChatsLoading }) => {
	const [unreadMessageCount] = useRecoilState(unreadMessageCountDefault);
	/* track timeout id */
	const [currTimeoutId] = useRecoilState(currTimeoutIdDefault);

	const handleChatsClick = (e) => {

		/* clear timeout ids */
		clearTimeout(currTimeoutId);

		const id = Number(e.target.id);

		/* prevent re-activating chats loading effect */
		if (activelink == id) return;

		if (id == 2.2) {
			console.log("alo alo")
			setActivelink(id);
			setChatsLoading(true);
		} else {
			setActivelink(id);
		}
	};
	return (
		<div
			className='navbar h-full w-full
						flex justify-evenly items-center
						'
		>
			<div
				id='1'
				onClick={handleChatsClick}
				className={` users w-[30px] h-[30px] 
							flex justify-center items-center	
							text-[18px] 
							overflow-hidden rounded-full cursor-pointer
							${activelink == 1 ? "text-blue-600" : "text-gray-600"}
						`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGlobe"} />
				</span>
			</div>
			<div
				id='2.2'
				onClick={handleChatsClick}
				className={` comments w-[30px] h-[30px] 
							flex justify-center items-center	
							text-[18px] 
							rounded-full cursor-pointer
							${activelink == 2.2 ? "text-blue-600" : "text-gray-600"}
						`}
			>
				<span className='pointer-events-none relative'>
					<span
						className={`${unreadMessageCount > 0 ? "flex" : "hidden"} justify-center items-center
									absolute z-50 right-[-8px] bottom-[18px] 
									text-white font-[700] 
									text-[10px] h-[16px] w-[16px] rounded-full
									bg-green-500
									`}
					>
						{unreadMessageCount}
					</span>
					<Fontawesome type={"faComments"} />
				</span>
			</div>
			<div
				id='3'
				onClick={handleChatsClick}
				className={` send w-[30px] h-[30px] 
							flex justify-center items-center	
							text-[18px] text-white bg-blue-600
							overflow-hidden rounded-full cursor-pointer
							`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faPlus"} />
				</span>
			</div>
			<div
				id='4'
				onClick={handleChatsClick}
				className={` phone w-[30px] h-[30px] 
							flex justify-center items-center	
							text-[18px]
							overflow-hidden rounded-full cursor-pointer
							${activelink == 4 ? "text-blue-600" : "text-gray-600"}
						`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faPhone"} />
				</span>
			</div>
			<div
				id='5'
				onClick={handleChatsClick}
				className={` settings w-[30px] h-[30px] 
							flex justify-center items-center	
							text-[18px] 
							overflow-hidden rounded-full cursor-pointer
							${activelink == 5 ? "text-blue-600" : "text-gray-600"}
						`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGear"} />
				</span>
			</div>
		</div>
	);
};
