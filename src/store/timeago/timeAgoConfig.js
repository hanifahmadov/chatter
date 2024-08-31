/*  */
/*  */

/** TimeAgo makes an error on the terminal like below:
 *
 *  Post.js:11
 * [javascript-time-ago] `TimeAgo.addDefaultLocale()` can only be called once.
 * To add other locales, use `TimeAgo.addLocale()`.
 *
 * and chatGPT referes to move it out from Post.js and put it in saparate file like here.
 *
 */

// timeAgoConfig.js
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import es from "javascript-time-ago/locale/es";

// Add the default locale
TimeAgo.addDefaultLocale(en);

// Add other locales
TimeAgo.addLocale(es);

export { TimeAgo };
