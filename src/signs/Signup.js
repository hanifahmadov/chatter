import React, { useState, useEffect, useRef } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import FormData from "form-data";

/* default - image */
import defaultAvatar from "../store/image/default-user.jpeg";

/* apis */
import { apiUrl } from "../apis/apiUrl";
import { signup_api } from "../apis/signsCall";

/* state */
import {
	errorContentDefault,
	signsErrorDefault,
	signupSuccessDefault,
} from "../store/states/app_state";

/* helper */
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Signup = () => {
	/* location & navigation */
	const location = useLocation();
	const navigate = useNavigate();
	const timeout = useRef(0);

	/** error
	 *  states and
	 *  content
	 */
	const [signsError, setSignsError] = useRecoilState(signsErrorDefault);
	const [errorContent, setErrorContent] = useRecoilState(errorContentDefault);

	/**
	 *  sign up modal
	 * 	toaster state
	 */

	const [signupSuccess, setSignupSuccess] = useRecoilState(signupSuccessDefault);

	/**
	 *  sign up credentials
	 */
	const avatarRef = useRef();
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [repwd, setRepwd] = useState("");
	const [avatar, setAvatar] = useState(undefined);
	const requiredFileds = email.length > 0 && pwd.length > 0 && repwd.length > 0;

	/* upload image & on-change */
	const handleAvatarChange = (e) => {
		const [file] = avatarRef.current?.files;
		setAvatar(file);
	};

	/**
	 * 	signup form
	 */
	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (!requiredFileds) return;

		/* add error handles & validation */

		/* data */
		const data = new FormData();

		data.append("email", email);
		data.append("pwd", pwd);
		data.append("repwd", repwd);
		data.append("avatar", avatar);
		data.append("baseurl", apiUrl);

		signup_api(data)
			.then((response) => {
				setSignupSuccess(true);

				setEmail("");
				setPwd("");
				setRepwd("");
				setAvatar(undefined);
			})
			.catch((err) => {
				/* clear the current set-timeouts */
				clearTimeout(timeout.current);

				/** error toaster
				 *  content of error
				 */
				setErrorContent({
					text1: err.message1,
					text2: err.message2,
				});

				/* display error */
				setSignsError(true);

				/* remove error after 5s automatically */
				timeout.current = setTimeout(() => {
					setSignsError(false);
					setErrorContent({ text1: '', text2: ''})
				}, 5000);
			});
	};

	return (
		<motion.div className='signup text-center w-[18rem] px-4 py-4 rounded-2xl'>
			<div className='signup_avatart mb-0'>
				<input
					type='file'
					id='avatar'
					name='avatar'
					className='hidden'
					ref={avatarRef}
					accept='image/png, image/jpeg, image/jpg, image/avif, image/webp  '
					onChange={handleAvatarChange}
				/>
				<label htmlFor='avatar' className='label_avatar cursor-pointer'>
					<div className='user_image flex flex-col items-center justify-center'>
						<img
							src={avatar ? URL.createObjectURL(avatar) : defaultAvatar}
							alt='selected'
							className='w-[7rem] h-[7rem] rounded-full 
											object-cover border-[4px] 
											border-solid border-white
											p-[1px]
											'
						/>

						<span className='relative bottom-0 left-5'>
							<Fontawesome type={"faWandMagicSparkles"} color={"gray"} fontSize={"1.3rem"} />
						</span>
					</div>
				</label>
			</div>
			<div className='signin_header text-[30px] text-shadow-custom_03 font-[400]'>Sign up.</div>

			<div className='signup_content mt-4'>
				<form className='flex gap-3 flex-col' onSubmit={handleFormSubmit}>
					<input
						type='email'
						className='border border-gray-300 px-3 py-2
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-shadow-custom_02
								text-[12px]
								placeholder:px-1 
								placeholder:text-gray-300
								placeholder:text-shadow-custom_000
								'
						placeholder='Enter email address'
						autoComplete='true'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<input
						type='password'
						className='border border-gray-300 px-3 py-2
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-shadow-custom_02
								text-[12px] 
								placeholder:px-1 
								placeholder:text-gray-300
								placeholder:text-shadow-custom_000
								'
						placeholder='Enter password'
						autoComplete='true'
						value={pwd}
						onChange={(e) => setPwd(e.target.value)}
					/>

					<input
						type='password'
						className='border border-gray-300 px-3 py-2
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-shadow-custom_02
								text-[12px]
								placeholder:px-1 
								placeholder:text-gray-300
								placeholder:text-shadow-custom_000
								'
						placeholder='Confirm password'
						autoComplete='true'
						value={repwd}
						onChange={(e) => setRepwd(e.target.value)}
					/>

					<motion.button
						whileTap={requiredFileds ? { scale: 0.99 } : {}}
						type='submit'
						className={`${
							!requiredFileds
								? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
								: "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
						} 
						  font-bold py-[5px] px-3 
						  rounded font-bold 
						  text-shadow-custom_1 
						  w-full text-[14px]
						  transition-colors duration-200 ease-in-out`}
					>
						sign up
					</motion.button>
				</form>
			</div>

			<div className='signup_footer mt-5 text-sm'>
				<div className='text-shadow-custom_02 text-[13px]'>Already have an account?</div>

				<div
					onClick={() => navigate("/welcome/signin")}
					className='text-shadow-custom_02 
                                    font-[600]
									text-blue-700 
									bg-gray-100 
									hover:bg-gray-50
									cursor-pointer 
									inline-block
									px-4 py-[3px] mt-2
									rounded
									text-center
                                    bg-white
                                    border-[1px]
									transition-colors duration-200 ease-in-out
									'
				>
					Sign in.
				</div>
			</div>
		</motion.div>
	);
};
