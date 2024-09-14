import jwt from "jsonwebtoken";

export default function Auth(req, res, next) {
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in auth middleware", error.message);
		return res.status(401).json({ message: "Unauthorized" });
	}
}
