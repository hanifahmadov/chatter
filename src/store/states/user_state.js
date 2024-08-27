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
export const currentRecipientDefault = atom({
	key: "currentRecipientDefault",
	default: null,
});
