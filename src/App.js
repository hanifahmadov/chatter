/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");
import { useMediaQuery } from "react-responsive";

import { App_Container } from "./app.styled";

/* apis */
import { apiUrl } from "./apis/apiUrl";
import { all_users } from "./apis/usersCalls";
import { all_messages, post_message } from "./apis/messageCalls";

/* global states */
import { currentRecipientState, userDefault } from "./store/states/user_state";
import { on_messages_state, on_users_state } from "./store/states/socket_state";
import { activelinkDefault, animateState, deviceDefault } from "./store/states/app_state";

/* helpers */
import { Header } from "./store/helpers/Header";
import { Fontawesome } from "./store/fontawesome/Fontawesome";
import { TimeAgo } from "./store/timeago/timeAgoConfig";
import { formatDate, formatTime, generateRandomDate } from "./store/days/days";
import { User } from "./pages/reuseable/User";
import { Message } from "./pages/reuseable/Message";
import { Send } from "./pages/reuseable/Send";
import { RecipientDetails } from "./pages/reuseable/RecipientDetails";
import { Users } from "./comps/users/Users";

export const App = () => {
	/* app */
	const controls = useAnimation();
	const controlBodySlide = useAnimation();
	const lastMessageRef = useRef(null);
	const textareaRef = useRef(null);

	const sendButtonRef = useRef(null);
	const navigate = useNavigate();
	const timeAgo = new TimeAgo("en-US");

	/* triggers */
	const [isInitialRender, setIsInitialRender] = useState(false);
	const [on_messages] = useRecoilState(on_messages_state);
	const [on_users] = useRecoilState(on_users_state);
	const [animate, setAnimate] = useRecoilState(animateState);

	/* user */
	const [{ avatar, username, email, accessToken, _id }] = useRecoilState(userDefault);
	const [currRecipient, setCurrRecipient] = useRecoilState(currentRecipientState);
	const [activelink, setActivelink] = useRecoilState(activelinkDefault);

	/* mobile - body transition tracker */
	const [isAtMinus400, setIsAtMinus400] = useState(false);

	/** local states*/
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	/**
	 *  textarea
	 *  setup
	 */
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);

	/**
	 *  Message
	 *  send message
	 */

	const handleSendMessage = (e) => {
		/* input validation todo */
		if (!text.length > 0 && !image) return;

		console.log("handle message submitted");
		const data = new FormData();

		data.append("image", image);
		data.append("text", text.trim());
		data.append("baseurl", apiUrl);
		data.append("recipientId", currRecipient._id);
		// data.append("randomDate", generateRandomDate());

		post_message(accessToken, data)
			.then((res) => {
				console.log(res);
				setText("");
				setImage(undefined);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/**
	 * 	textarea will submit the message
	 * 	when enter pressed
	 * 	when cmd + enter
	 * 	jump to new line
	 */
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (e.metaKey || e.ctrlKey) {
				// Cmd (macOS) or Ctrl (Windows/Linux) + Enter: Insert a new line
				e.preventDefault();
				setText(text + "\n");
			} else {
				// Enter alone: Trigger the send button animation and click
				e.preventDefault();
				controls.start({ scale: 1.05 }).then(() => {
					controls.start({ scale: 1 });
					handleSendMessage();
				});
			}
		}
	};

	let [device, setDevice] = useRecoilState(deviceDefault);
	let sm = useMediaQuery({
		query: "(max-width: 640px)",
	});
	let md = useMediaQuery({
		query: "(max-width: 768px)",
	});

	useEffect(() => {
		device = JSON.parse(JSON.stringify(device));
		setDevice({
			...device,
			sm,
			md,
		});
	}, [sm, md]);

	/**
	 *  use effects
	 * 	messages & users calls
	 */

	/* call all-users */
	useEffect(() => {
		all_users(accessToken)
			.then((res) => {
				setUsers(res);
				setCurrRecipient(res[0]);
			})
			.catch((err) => {
				console.log("all users errors");
				console.log(err);
			});
	}, [on_users]);

	/* call all-messages*/
	useEffect(() => {
		if (!currRecipient) return;

		all_messages(accessToken)
			.then((response_messages) => {
				/**
				 *
				 * 	get the messages betweem
				 * 	curr user and recipient
				 */

				// const valid_messages = i_sent.concat(recipient_sent);
				const valid_messages = response_messages.filter(
					(mess, index) =>
						(mess.sender == _id && mess.recipient._id == currRecipient._id) ||
						(mess.sender == currRecipient._id && mess.recipient._id == _id)
				);

				let localdb = {};

				for (const message of valid_messages) {
					let tempdate = formatDate(message.createdAt);

					if (!localdb[tempdate]) {
						localdb[tempdate] = [message];
					} else {
						localdb[tempdate].push(message);
					}
				}

				console.log(username, localdb);

				setMessages(localdb);
			})
			.catch((error) => {
				console.log("all message error >> ", error);
				console.log(error);
			});
	}, [on_messages, currRecipient]);

	const handleUserClick = (user) => {
		setCurrRecipient(user);

		controlBodySlide.start({
			x: sm ? -800 : -800,
			transition: { duration: 0.5 },
		});

		setIsAtMinus400(true); // Update state to indicate the position is now at -400
	};

	const handleMenuClick = () => {
		if (isAtMinus400) {
			// Only run the animation if the position is currently -400
			controlBodySlide.start({
				x: 0,

				transition: { duration: 0.5 },
			});

			setIsAtMinus400(false); // Update state to indicate the position is now at 0
		}
	};

	return (
		<ThemeProvider theme={{ device }}>
			<App_Container
				className='app h-[100svh] w-[100svw] bg-slate-200
							flex justify-center items-center
							fixed inset-0
							'
			>
				<div
					className='display h-[90svh] max-h-[926px] w-[27.5rem] bg-white 
							flex flex-col justify-between overflow-hidden
							shadow-custom_07  border-[3px] border-white
							rounded-[30px]
							'
				>
					<div
						className='header w-full h-[5rem] flex justify-center items-center text-[30px] bg-slate-800 
								rounded-br-[5px] rounded-bl-[5px] text-white font-[600] text-shadow-custom_white_02
								shadow-custom_01'
					>
						Users
					</div>

					<div className='body w-full h-[calc(100%-5rem-5.5rem-1rem)] bg-slate-100 flex flex-frow'>
						{activelink == 1 && <Users users={users} />}
					</div>

					<div
						className='footer h-[5.5rem] w-full bg-slate-800 
								rounded-tr-[5px] rounded-tl-[5px]
								shadow-custom_03
								'
					>
						<div
							className='navbar h-full w-full
									flex justify-evenly items-center
									'
						>
							<div
								onClick={() => setActivelink(1)}
								className={` users w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[20px] text-white
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
							>
								<span className='pointer-events-none'>
									<Fontawesome type={"faGlobe"} />
								</span>
							</div>
							<div
								onClick={() => setActivelink(2)}
								className={` comments w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[20px]  text-white
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
							>
								<span className='pointer-events-none'>
									<Fontawesome type={"faComments"} />
								</span>
							</div>
							<div
								onClick={() => setActivelink(3)}
								className={` send w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[20px] text-white bg-blue-500
										overflow-hidden rounded-full cursor-pointer
										`}
							>
								<span className='pointer-events-none'>
									<Fontawesome type={"faPlus"} />
								</span>
							</div>
							<div
								onClick={() => setActivelink(4)}
								className={` phone w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[20px]  text-white
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
							>
								<span className='pointer-events-none'>
									<Fontawesome type={"faPhone"} />
								</span>
							</div>
							<div
								onClick={() => setActivelink(5)}
								className={` settings w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[20px]  text-white
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
							>
								<span className='pointer-events-none'>
									<Fontawesome type={"faGear"} />
								</span>
							</div>
						</div>
					</div>
				</div>
			</App_Container>
		</ThemeProvider>
	);
};
