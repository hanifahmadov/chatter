/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import "./index.scss";

import { StyleSheetManager } from "styled-components";
import { RecoilRoot } from "recoil";

/* layouts */
import { PhoneLayout } from "./layouts/PhoneLayout";
import { RegisterLayout } from "./layouts/RegisterLayout";
import { PersistentLayout } from "./layouts/PersistentLayout";
import { RequireAuth } from "./layouts/RequireAuth";

/* pages */
import { Signin } from "./pages/register/Signin";
import { Signup } from "./pages/register/Signup";

/* component */
import { App } from "./App";
import { Users } from "./comps/Users";

const router = createBrowserRouter([
	{
		element: <PhoneLayout />,
		children: [
			{
				// add welcome content to Register layout { advance context }
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
					// {
					// 	path: "/404",
					// 	element: <NotFound />,s
					// },
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
						element: (
							<RequireAuth>
								<App />
							</RequireAuth>
						),
						// Protected route
						children: [
							{
								path: "/",
								element: <Users />,
							},
						],
					},
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
