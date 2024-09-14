import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import apiClient from "../../lib/api-client";
import { useAppStore } from "../../store/store";
export default function AuthPage() {
	// Combined state for email and password
	const { setUserInfo, userInfo } = useAppStore();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState(""); // For error messages
	const [success, setSuccess] = useState(""); // For success messages

	// Login function
	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (!email || !password) {
			setError("Please enter both email and password.");
			toast.error("Please enter both email and password.");
			return;
		}
		try {
			const response = await apiClient.post("/api/auth/login", {
				email,
				password,
			});

			setSuccess("Login successful!");
			toast.success("Login successful!");
			setUserInfo(response.data.user);
			// if (response.data.user && response.data.user.profileSetup == false) {
			// 	navigate("/editProfile");
			// } else {
			// 	navigate("/chat");
			// }
			navigate("/chat");

			console.log(userInfo);
		} catch (error) {
			setError("Login failed. Please try again.");
			toast.error("Login failed. Please try again.");
			console.error(error);
		}
	};

	// Signup function
	const handleSignup = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (!email || !password || !confirmPassword || !name) {
			setError("Please fill in all fields.");
			toast.error("Please fill in all fields.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			toast.error("Passwords do not match.");
			return;
		}
		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/signup",
				{
					email,
					name,
					password,
				}
			);

			setSuccess("Signup successful!");
			toast.success("Signup successful!");
			console.log("Signup response:", response.data);
			setUserInfo(response.data.user);

			navigate("/editProfile");
		} catch (error) {
			setError("Signup failed. Please try again.");
			toast.error(error.message || "Signup failed. Please try again.");
			console.error(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full bg-[#141414]">
			<Card className="w-[400px] transition-[height] border-none ">
				<CardHeader>
					<CardTitle>👋Hey there</CardTitle>
					<CardDescription>
						Login or create a new account to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Display errors and success messages */}

					<Tabs defaultValue="login">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="login">Login</TabsTrigger>
							<TabsTrigger value="signup">Sign Up</TabsTrigger>
						</TabsList>
						<TabsContent value="login">
							<form onSubmit={handleLogin} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</form>
						</TabsContent>
						<TabsContent value="signup">
							<form onSubmit={handleSignup} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="name">Confirm Password</Label>
									<Input
										id="name"
										type="text"
										placeholder="Enter Your Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Create a password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm Password</Label>
									<Input
										id="confirmPassword"
										type="password"
										placeholder="Confirm your password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
								</div>

								<Button type="submit" className="w-full">
									Sign Up
								</Button>
							</form>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
