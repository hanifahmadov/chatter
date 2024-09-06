import React, { useState, useEffect, useRef } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

/* image */
import user_image from "../../store/image/default-user.jpg";

/* apis */
import { apiUrl } from "../../apis/apiUrl";
import { signup_api } from "../../apis/registerCalls";

/* helpers */
import { Fontawesome } from "../../store/fontawesome/Fontawesome";

export const Signup = () => {
	/* location & navigation */
	const location = useLocation();
	const navigate = useNavigate();

	/* sign up setup */
	const avatarRef = useRef();
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [repwd, setRepwd] = useState("");
	const [avatar, setAvatar] = useState(undefined);
	const requiredFileds = email.length > 0 && pwd.length > 0 && repwd.length > 0;

	/* upload image */
	const handleAvatarChange = (e) => {
		const [file] = avatarRef.current?.files;
		setAvatar(file);
	};

	/* handle signup submit */
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
				console.log(response.data);
				setEmail("");
				setPwd("");
				setRepwd("");
				setAvatar(undefined);

				navigate("/welcome/signin", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='signup text-center w-[18rem] px-4 py-4 rounded-2xl'>
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
							src={avatar ? URL.createObjectURL(avatar) : user_image}
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
			<div className='signin_header text-4xl text-shadow-custom_02'>Sign up.</div>

			<div className='signup_content mt-8'>
				<form className='' onSubmit={handleFormSubmit}>
					<input
						type='email'
						className='border border-gray-300 px-3 py-2
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-shadow-custom_01
								text-sm 
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
						className='border border-gray-300 px-3 py-2 mt-5
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-sm text-shadow-custom_01
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
						className='border border-gray-300 px-3 py-2 mt-5
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-sm text-shadow-custom_01
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
						  font-bold py-1 px-3 mt-3 
						  rounded font-medium 
						  text-shadow-custom_1 
						  w-full mt-5 
						  transition-colors duration-200 ease-in-out`}
					>
						sign up
					</motion.button>
				</form>
			</div>

			<div className='signup_footer mt-5 text-sm'>
				<div className='text-shadow-custom_01'>Already have an account?</div>

				<div
					onClick={() => navigate("/welcome/signin")}
					className='text-shadow-custom_01 
									text-blue-900 
									bg-gray-100
									hover:bg-gray-50
									cursor-pointer 
									font-medium mt-1 
									inline-block
									px-2 py-1 mt-2
									rounded
									text-center
									transition-colors duration-200 ease-in-out
									'
				>
					Sign in
				</div>
			</div>
		</div>
	);
};
