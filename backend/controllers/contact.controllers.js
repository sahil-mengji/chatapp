import User from "../models/user.model.js";

export async function SearchContact(req, res) {
	try {
		const searchText = req.body.searchText;
		const sanatisedSearchText = searchText.replace(
			/[.*+?^${}()|[\]\\]/g,
			"\\$&"
		);
		const regex = new RegExp(sanatisedSearchText, "i");
		const contacts = await User.find({
			$and: [
				{ _id: { $ne: Request.userId } },
				{ $or: [{ name: regex }, { email: regex }] },
			],
		});

		return res.status(200).json({ contacts });
	} catch (error) {}
}
