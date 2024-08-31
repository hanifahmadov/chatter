/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");

/* apis */
import { apiUrl } from "./apis/apiUrl";
import { all_users } from "./apis/usersCalls";
import { all_messages, post_message } from "./apis/messageCalls";

/* global states */
import { currentRecipientState, userDefault } from "./store/states/user_state";
import { on_messages_state, on_users_state } from "./store/states/socket_state";
import { animateState } from "./store/states/app_state";

/* helpers */
import { Header } from "./store/helpers/Header";
import { Fontawesome } from "./store/fontawesome/Fontawesome";
import { TimeAgo } from "./store/timeago/timeAgoConfig";
import { formatDate, formatTime, generateRandomDate } from "./store/days/days";
import { User } from "./pages/reuseable/User";
import { Message } from "./pages/reuseable/Message";
import { Send } from "./pages/reuseable/Send";
import { RecipientDetails } from "./pages/reuseable/RecipientDetails";

export const App = () => {
	/* app */
	const controls = useAnimation();
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

				// const i_sent = response_messages.filter((msg) => {
				// 	return msg.sender == _id && msg.recipient._id == currRecipient._id;
				// });

				// const recipient_sent = response_messages.filter(
				// 	(msg) => msg.sender == currRecipient._id && msg.recipient._id == _id
				// );

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

	return (
		<div className='app items-top flex h-full w-full max-w-[103rem] flex-col justify-center bg-white border-[1px]'>
			<div className='header flex h-[4.5rem] w-full justify-between border-b-[1px] border-gray-200 bg-white'>
				<Header />
			</div>

			<div className='content flex h-full w-full flex-row justify-between '>
				{/* letf - recipients [users] */}
				<div className='content_left h-full min-w-[22rem] border-r-[1px] border-slate-200'>
					<div className='users_wrapper flex flex-col gap-3'>
						<div className='users_title border-b-[1px] border-slate-200 min-h-[55px] text-[16px] text-shadow-custom_01 text-center items-center flex justify-center font-[500]'>
							{/* Users */}
						</div>
						{users.length > 0 &&
							users.map((user, index) => {
								const { avatar, username, createdAt, _id } = user;

								return (
									<User
										key={index}
										currRecipient={currRecipient}
										setCurrRecipient={setCurrRecipient}
										user={user}
									/>
								);
							})}
					</div>
				</div>

				{/* center - messages */}
				<div className='content_center flex flex-grow  min-w-[40rem] max-w-[65rem]'>
					<div className='flex-grow flex flex-col justify-between pb-0 relative'>
						{/* MESSAGE */}

						<div className='just_a_wrapper'>
							<div
								className='content_header curr_recipient flex min-h-[55px]  w-full
											px-2 justify-center items-center 
											border-slate-200 border-b-[1px]
											bg-slate-200
											'
							>
								<div>
									<img
										src={currRecipient?.avatar}
										className='h-[35px] w-[35px] 
                        						rounded-lg border-[2px] border-solid 
                        						border-white object-cover p-[1px]
                        						text-shadow-custom_02 
                        						'
									/>
								</div>
								<div className='text-[16px] text-shadow-custom_01 ml-2 font-[500]'>
									{currRecipient &&
										currRecipient.username.charAt(0).toUpperCase() +
											currRecipient.username.slice(1).toLowerCase()}
								</div>
							</div>
							<div
								className='message_guard 
										scrollbar scrollbar-none  
										overflow-y-auto
										p-[5px]
										h-[78vh]

										'
							>
								<div className='message_parent flex gap-0 flex-col flex-grow py-0 px-1'>
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
							</div>
						</div>

						{/* POST MESSAGE */}
						<div className='send_message mb-0 relative bg-slate-900'>
							<div className='send_wrapper flex flex-row justify-between items-end absolute inset-0'>
								<Send
									text={text}
									setText={setText}
									image={image}
									setImage={setImage}
									handleKeyDown={handleKeyDown}
									handleSendMessage={handleSendMessage}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* right col - recipient details */}
				<div className='content_right h-full w-[22rem] border-l-[1px] border-gray-200'>
					<div className='user_details_wrapper flex flex-col gap-3'>
						<div
							className='user_details border-b-[1px] border-slate-200 min-h-[55px] t
										ext-[16px] text-shadow-custom_01 text-center items-center 
										flex justify-center font-[500]'
						>
							{/* User Details */}
						</div>
						{currRecipient && <RecipientDetails currRecipient={currRecipient} />}
					</div>
				</div>
			</div>

			<div className='footer'></div>
		</div>
	);
};
