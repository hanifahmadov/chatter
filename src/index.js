/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.scss";

import { StyleSheetManager } from "styled-components";
import { RecoilRoot } from "recoil";

/* layouts */
import { PhoneLayout } from "./layouts/PhoneLayout";
import { RegisterLayout } from "./layouts/RegisterLayout";
import { Signin } from "./signs/Signin";
import { Signup } from "./signs/Signup";
import { NotFound } from "./store/errors/NotFound";
import { PersistentLayout } from "./layouts/PersistentLayout";
import { App } from "./App";

const router = createBrowserRouter([
	{
		element: <PhoneLayout />,
		children: [
			{
				path: "/welcome",
				element: <RegisterLayout />,
				children: [
					{
						path: "signin",
						element: <Signin />,
					},
					{
						path: "signup",
						element: <Signup />,
					},
					{
						path: "*",
						element: <Navigate to='/welcome' replace />,
					},
					{
						path: "/welcome/",
						element: <Navigate to='/welcome' replace />,
					},
				],
			},
			{
				element: <PersistentLayout />,
				children: [
					{
						path: "/",
						element: <App />,
					},
				],
			},
		],
	},
	{
		path: "/404",
		element: <NotFound />,
	},
	{
		path: "*",
		element: <Navigate to='/404' replace />,
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
