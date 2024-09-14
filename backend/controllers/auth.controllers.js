import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000; // Token expiry in milliseconds

const generateToken = (email, userId) => {
	return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
	});
};

const Signup = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Please fill all the fields" });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash the password before saving
		const hashedPassword = await bcryptjs.hash(password, 12);
		const user = await User.create({ email, password: hashedPassword });

		res.cookie("jwt", generateToken(email, user._id), {
			maxAge,
			secure: true,
			sameSite: "none", // Set sameSite option to "none"
			httpOnly: true,
		});

		return res.status(201).json({
			message: "Signed Up Sucessfully",
			user: { ...user._doc, password: null },
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Some error occurred" });
	}
};

const Login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Please fill all the fields" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Compare the provided password with the stored hashed password
		const isVerified = await bcryptjs.compare(password, user.password);
		if (!isVerified) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		res.cookie("jwt", generateToken(email, user._id), {
			maxAge,
			secure: true,
			sameSite: "none", // Set sameSite option to "none"
			httpOnly: true,
		});
		return res.status(200).json({
			message: "Login successful",
			user: { ...user._doc, password: null },
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const Logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getUserInfo = async (req, res) => {
	try {
		const userId = req.userId;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json({
			user: { ...user._doc, password: null },
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export { Signup, Login, Logout, getUserInfo };
