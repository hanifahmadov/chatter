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
 * signed user
 */
export const signedUserDefault = atom({
	key: "signedUserDefault",
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

export const errorContentDefault = atom({
	key: "errorContentDefault",
	default: {
		text1: "",
		text2: "",
	},
});



