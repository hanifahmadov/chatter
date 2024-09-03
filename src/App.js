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
import { Users } from "./comps/Users";
import { Settings } from "./comps/Settings";
import { Recipient } from "./comps/Recipient";
import { Nav } from "./comps/Nav";

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
					className='display h-[80svh] max-h-[926px] w-[23rem] bg-white 
							flex flex-col justify-between overflow-hidden
							shadow-custom_07  border-[3px] border-white
							rounded-[30px]
							'
				>
					<div
						className='header w-full h-[4rem] flex justify-center items-center text-[20px] bg-gray-100 
								rounded-br-[5px] rounded-bl-[5px] text-gray-600 font-[500] text-shadow-custom_01
								shadow-custom_04'
					>
						{activelink == 1 && "Users"}
						{activelink == 2 && <Recipient setActivelink={setActivelink} currRecipient={currRecipient} />}
						{activelink == 3 && "Send Message"}
						{activelink == 4 && "Calls"}
						{activelink == 5 && "Settings"}
					</div>

					<div className='body w-full h-[calc(100%-4rem-4rem-1rem)] bg-gray-100 flex flex-frow shadow-custom_04'>
						{activelink == 1 && (
							<div className='users_wrapper'>
								<Users
									users={users}
									setActivelink={setActivelink}
									setCurrRecipient={setCurrRecipient}
								/>
							</div>
						)}
						{activelink == 2 && (
							<div className='message_parent h-full w-full overflow-scroll flex gap-0 flex-col flex-grow py-0 px-1'>
								{Object.keys(messages).length > 0 &&
									Object.keys(messages).map((date, index) => {
										/* msg can be [{}] or [{}, {}, {}, {}, ....] */
										const talks = messages[date];

										return (
											<Message
												key={index}
												signedUserId={_id}
												talks={talks}
												date={date}
												avatar={avatar}
												animate={animate}
												setAnimate={setAnimate}
											/>
										);
									})}
							</div>
						)}
						{/* {activelink == 3 && <Messages />} */}
						{/* {activelink == 4 && <Messages />} */}
						{activelink == 5 && (
							<div className='settings_wrapper h-full w-full'>
								<Settings setActivelink={setActivelink} />
							</div>
						)}
					</div>

					<div
						className='footer min-h-[4rem] w-full bg-gray-100
								rounded-tr-[5px] rounded-tl-[5px]
								shadow-custom_04 relative
								'
					>
						{activelink == 2 ? (
							<Send
								text={text}
								setText={setText}
								image={image}
								setImage={setImage}
								handleKeyDown={handleKeyDown}
								handleSendMessage={handleSendMessage}
							/>
						) : (
							<Nav setActivelink={setActivelink} />
						)}
					</div>
				</div>
			</App_Container>
		</ThemeProvider>
	);
};
