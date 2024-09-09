/* eslint-disable */
import { atom, useRecoilCallback } from "recoil";

/** signed user */
export const userDefault = atom({
	key: "userDefault",
	default: null,
});

/**
 *  current recepient user (reciever)
 *  for sending messages to
 */
export const currentRecipientState = atom({
	key: "currentRecipientState",
	default: null,
});

export const onlineUsersDefault = atom({
	key: "onlineUsersDefault",
	default: [],
});
