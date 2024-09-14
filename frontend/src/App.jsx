import React, { useEffect, useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./old/pages/home/Home";
// import Login from "./old/pages/login/Login";
// import SignUp from "./old/pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
// import { useAuthContext } from "./old/context/AuthContext";
// import Auth from "./pages/auth/Auth";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import Auth from "./pages/auth/Auth";
import EditProfile from "./pages/profile/EditProfile.jsx";
import { useAppStore } from "./store/store.js";
import apiClient from "./lib/api-client.js";

function App() {
	// const { authUser } = useAuthContext();
	// const [loading, setLoading] = useState(true);
	// const { userInfo, setUserInfo } = useAppStore();
	// const getUserData = async () => {
	// 	try {
	// 		const response = await apiClient("/api/auth/userinfo", {
	// 			withCredentials: true,
	// 		});
	// 		if (response.data.user) {
	// 			setUserInforesponse.data.user;
	// 			console.log(userInfo);
	// 			return;
	// 		}
	// 	} catch (error) {
	// 		setUserInfo(undefined);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };
	// useEffect(() => {
	// 	if (!userInfo) {
	// 		getUserData();
	// 	} else {
	// 		setLoading(false);
	// 	}
	// }, [userInfo, setUserInfo]);
	useEffect(() => {
		// Apply dark mode by default
		document.documentElement.classList.add("dark");
	}, []);
	return (
		<div className=" h-screen  bg-background">
			<Routes>
				<Route
					path="/auth"
					element={
						<AuthRoute>
							<Auth />
						</AuthRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/editprofile"
					element={
						<PrivateRoute>
							<EditProfile />
						</PrivateRoute>
					}
				/>
				{/* <Route path="*" element={<Navigate to="/auth" />} /> */}
				<Route
					path="/chat"
					element={
						<PrivateRoute>
							<Chat />
						</PrivateRoute>
					}
				/>
			</Routes>
			{/* <Toaster /> */}
		</div>
	);
}

export default App;

const PrivateRoute = ({ children }) => {
	const { userInfo } = useAppStore();
	const isAuthenticated = !!userInfo;
	return children;
	//return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
	const { userInfo } = useAppStore();
	const isAuthenticated = !!userInfo;
	return children;
	//return isAuthenticated ? <Navigate to="/auth" /> : children;
};
