import { atom } from "recoil";

/**
 *  device default states
 */
export const deviceDefault = atom({
	key: "deviceDefault",
	default: {
		xsm: null /* > 360 */,
		sm: null /* > 576*/,
		md: null /* > 768 */,
		lg: null /* > 1024 */,
		xlg: null /*  > 1440 */,
	},
});

/**
 * active link &
 * its prev value
 */
export const activelinkDefault = atom({
	key: "activelinkDefault",
	default: 1,
});

/** prev active-link value */
export const prevActivelinkDefault = atom({
	key: "prevActivelinkDefault",
	default: 1,
});

/**
 * signed user
 */
export const signedUserDefault = atom({
	key: "signedUserDefault",
	default: null,
});

/** current recipient
 */
export const currRecipientDefault = atom({
	key: "currRecipientDefault",
	default: null,
});

/**
 *	toaster defaults
 *	signsToaster triggers the popup th
 */
export const signsErrorDefault = atom({
	key: "signsErrorDefault",
	default: false,
});

/**
 *  errors
 * 	defaults
 */

export const errorContentDefault = atom({
	key: "errorContentDefault",
	default: {
		status: null,
		text1: "",
		text2: "",
		text3: "",
	},
});

/**
 * 	when signup is success
 * 	sign up modal
 */
export const signupSuccessDefault = atom({
	key: "signupSuccessDefault",
	default: false,
});

/**
 * 	when page refresh
 * 	trigger the error page
 */
export const refreshErrorDefault = atom({
	key: "refreshErrorDefault",
	default: false,
});

/**
 *	unread message counts
	will pops the unread message count
	on navbar
 */
export const unreadMessageCountDefault = atom({
	key: "unreadMessageCountDefault",
	default: 0,
});

/** grouped by id UMC
 * 	UMC - unread message count
 */
export const groupedByIdUMCDefault = atom({
	key: "groupedByIdUMCDefault",
	default: {},
});

/** grouped by id UMC
 * 	UMC - unread message count
 */
export const currTimeoutIdDefault = atom({
	key: "currTimeoutIdDefault",
	default: 0,
});
