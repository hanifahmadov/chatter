/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.scss";

import { StyleSheetManager } from "styled-components";
import { RecoilRoot } from "recoil";

/* layouts */

// import { RequireAuthLayout } from "./comps/layouts/RequireAuthLayout";
// import { MainLayout } from "./comps/layouts/MainLayout";

/* components */
import { App } from "./App";
import { Signin } from "./comps/register/Signin";
import { PersistentLayout } from "./comps/layouts/PersistentLayout";
import { RegisterLayout } from "./comps/layouts/RegisterLayout";
import { Signup } from "./comps/register/Signup";

/**
 *  App is the main root element
 * 	all check-ups there
 */


/**  what is going on here! 
 * 
 * 	will get explained soon :)
 * 
 */
const router = createBrowserRouter([
	{
		/* register */
		element: <RegisterLayout />,
		children: [
			{
				/* public routes */
				path: "/signin",
				element: <Signin />,
			},
			{
				/* public routes */
				path: "/signup",
				element: <Signup/>,
			},
		],
	},
	{
		// required signedUser
		path: "/",
		element: <PersistentLayout />,
		children: [
			{
				element: <App />, // Main layout for authenticated pages
				// children: [
				// 	{ path: "/", element: <Home /> },
				// 	{ path: "notifications", element: <div>Notifications</div> },
				// 	{ path: "messages", element: <Messages /> },
				// 	{ path: "bookmarks", element: <div>Bookmarks</div> },
				// ],
			},
		],
	},
]);

/**
 *
 *  StyleSheetManager, CustomStyleSheetManager
 * 	are to avoid $value or $ while passing arg to styled-components
 *
 */
const CustomStyleSheetManager = (props) => (
	<StyleSheetManager shouldForwardProp={(prop) => prop !== "comp"}>{props.children}</StyleSheetManager>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CustomStyleSheetManager>
		<RecoilRoot>
			<RouterProvider router={router} />
		</RecoilRoot>
	</CustomStyleSheetManager>
);
