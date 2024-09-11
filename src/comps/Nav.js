import React from "react";
import { useRecoilState } from "recoil";

/* global states */
import { unreadMessageCountDefault } from "../store/states/app_state";

/* helpers */
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Nav = ({ activelink, setActivelink }) => {
	const [unreadMessageCount] = useRecoilState(unreadMessageCountDefault);
	return (
		<div
			className='navbar h-full w-full
						flex justify-evenly items-center
						'
		>
			<div
				onClick={() => setActivelink(1)}
				className={` users w-[30px] h-[30px] 
										flex justify-center items-center	
										text-[18px] 
										overflow-hidden rounded-full cursor-pointer
										${activelink == 1 ? "text-blue-500" : "text-gray-600"}
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGlobe"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(2.2)}
				className={` comments w-[30px] h-[30px] 
										flex justify-center items-center	
										text-[18px] 
										rounded-full cursor-pointer
										${activelink == 2.2 ? "text-blue-500" : "text-gray-600"}
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
				onClick={() => setActivelink(3)}
				className={` send w-[30px] h-[30px] 
							flex justify-center items-center	
							text-[18px] text-white bg-blue-500
							overflow-hidden rounded-full cursor-pointer
							`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faPlus"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(4)}
				className={` phone w-[30px] h-[30px] 
										flex justify-center items-center	
										text-[18px]
										overflow-hidden rounded-full cursor-pointer
										${activelink == 4 ? "text-blue-500" : "text-gray-600"}
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faPhone"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(5)}
				className={` settings w-[30px] h-[30px] 
										flex justify-center items-center	
										text-[18px] 
										overflow-hidden rounded-full cursor-pointer
										${activelink == 5 ? "text-blue-500" : "text-gray-600"}
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGear"} />
				</span>
			</div>
		</div>
	);
};
