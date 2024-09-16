import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

// Extend dayjs with the plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
// dayjs.extend(updateLocale);

// Customize the locale for relativeTime
// dayjs.updateLocale("en", {
// 	relativeTime: {
// 		future: "in %s",
// 		past: "%s ago",
// 		s: "a few seconds",
// 		m: "a minute",
// 		mm: "%dm",
// 		h: "an hour",
// 		hh: "%dhrs", // Customize hours to display 'hrs'
// 		d: "a day",
// 		dd: "%ddays",
// 		M: "a month",
// 		MM: "%d months",
// 		y: "a year",
// 		yy: "%d years",
// 	},
// });

export const formatDate = (dateString, type = false) => {
	const date = dayjs(dateString);
	const today = dayjs();

	if (date.isToday()) {
		return "Today";
	} else if (date.isYesterday()) {
		return "Yesterday";
	} else if (date.isAfter(today.startOf("week")) && date.isBefore(today.endOf("week"))) {
		return date.format("dddd"); // Returns the day of the week, e.g., "Monday"
	} else {
		return type ? date.format(type) : date.format("YYYY-MMM-DD"); // Returns full date, e.g., "22 January 2024"
	}
};

export const generateRandomDate = () => {
	const today = dayjs();
	const aYearAgo = today.subtract(1, "year");

	// Generate a random number of milliseconds between the two dates
	const randomTimestamp = aYearAgo.valueOf() + Math.random() * (today.valueOf() - aYearAgo.valueOf());

	// Convert the timestamp back to a date
	return dayjs(randomTimestamp).format();
};

export const formatTime = (dateString, format = null) => {
	return dayjs(dateString).format(format ? format : "h:mm A");
};

export const formatTimeago = (date) => {
	return dayjs(date).fromNow();
};
