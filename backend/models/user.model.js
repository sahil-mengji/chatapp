import bcryptjs from "bcryptjs";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			unique: [true, "Email is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
		},

		profilePic: {
			type: String,
			default: "",
			required: false,
		},
		image: {
			type: String,
			default: "",
			required: false,
		},
		profileSetup: {
			type: Boolean,
			default: false,
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
	next();
});

export default User;
