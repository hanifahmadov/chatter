/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import "./index.scss";

import { StyleSheetManager } from "styled-components";
import { RecoilRoot } from "recoil";

/* layouts */
import { RegisterLayout } from "./layouts/RegisterLayout";
import { PersistentLayout } from "./layouts/PersistentLayout";
import { RequireAuth } from "./layouts/RequireAuth";

/* pages */
import { Signin } from "./pages/register/Signin";

/* component */
import { App } from "./App";

// import { RequireAuthLayout } from "./comps/layouts/RequireAuthLayout";
// import { MainLayout } from "./comps/layouts/MainLayout";

/* components */
// import RegisterLayout from "./layouts/RegisterLayout";
// import PersistentLayout from "./layouts/PersistentLayout";
// import Signin from "./pages/Signin";
// import Signup from "./pages/Signup";
// import App from "./App";
// import Home from "./pages/Home";
// import Notifications from "./pages/Notifications";
// import Messages from "./pages/Messages";
// import Bookmarks from "./pages/Bookmarks";
// import NotFound from "./pages/NotFound";
// import RequireAuth from "./components/RequireAuth";
// import AdminLayout from "./layouts/AdminLayout";

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
		// add welcome content to Register layout { advance context }
		path: "/welcome",
		element: <RegisterLayout />,
		children: [
			{
				path: "signin",
				element: <Signin />,
			},
			// {
			// 	path: "/signup",
			// 	element: <Signup />,
			// },
			// {
			// 	path: "/404",
			// 	element: <NotFound />,s
			// },
			// {
			// 	path: "*", // wildcard route for handling unknown routes
			// 	element: <Navigate to='/404' replace />,
			// },
		],
	},
	{
		element: <PersistentLayout />,
		children: [
			{
				path: "/",
				element: (
					<RequireAuth>
						<App />
					</RequireAuth>
				), // Protected route
				children: [
					// {
					// 	path: "/",
					// 	element: <Home />,
					// },
					// {
					// 	path: "notifications",
					// 	element: <Notifications />,
					// },
					// {
					// 	path: "messages",
					// 	element: <Messages />,
					// },
					// {
					// 	path: "bookmarks",
					// 	element: <Bookmarks />,
					// },
				],
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
