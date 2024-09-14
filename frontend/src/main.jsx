import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./old/context/AuthContext.jsx";
import { SocketContextProvider } from "./old/context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<BrowserRouter>
		<AuthContextProvider>
			<SocketContextProvider>
				<Toaster />
				<App />
			</SocketContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
