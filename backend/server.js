import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply CORS middleware
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173", // Allow specific origin
		methods: ["GET", "POST"], // Specify allowed methods
	})
);

// Middleware
app.use(express.json()); // To parse incoming requests with JSON payloads
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", contactRouter);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
