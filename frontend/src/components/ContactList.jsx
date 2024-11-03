import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircleDashed, Search } from "lucide-react";
import { useAppStore } from "../store/store";

export default function ContactList({ contacts, setSelectedContact }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredContacts, setFilteredContacts] = useState(contacts);
	const [filterType, setFilterType] = useState("all"); // "all", "chats", or "groups"
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const { setSelectedChatType, setSelectedChatData } = useAppStore();
	useEffect(() => {
		if (searchQuery.trim() === "") {
			// Show all chats by default when input is empty
			const filtered = contacts.filter((contact) => !contact.isGroup);
			setFilteredContacts(filtered);
			setFilterType("all");
			setIsSearching(false);
		} else {
			// Perform API call when input is not empty
			handleSearch(searchQuery);
		}
	}, [searchQuery, contacts]);

	const handleSearch = async (query) => {
		setIsSearching(true);
		try {
			const response = await apiClient.post(
				"/api/search",
				{
					searchText: query,
				},
				{ withCredentials: true }
			);
			console.log(response);
			setSearchResults(response.data.contacts);
		} catch (error) {
			console.error("Error fetching search results", error);
		} finally {
			setIsSearching(false);
		}
	};

	const handleFilterChange = (type) => {
		setFilterType(type);
		if (searchQuery.trim() === "") {
			let filtered;
			switch (type) {
				case "chats":
					filtered = contacts.filter((contact) => !contact.isGroup);
					break;
				case "groups":
					filtered = contacts.filter((contact) => contact.isGroup);
					break;
				default:
					filtered = contacts;
			}
			setFilteredContacts(filtered);
		}
	};

	const displayContacts =
		searchQuery.trim() === "" ? filteredContacts : searchResults;

	return (
		<div className="w-full md:w-1/3 bg-background border-r border-border p-4">
			<h1 className="text-primary font-semibold text-3xl p-4 flex items-center gap-4">
				<MessageCircleDashed className="text-yellow-500 bg-yellow-900 p-2 rounded-sm w-10 h-10" />
				Gossips
			</h1>

			<div className="pb-4 mx-4 mt-4">
				<Input
					type="search"
					placeholder="Search contacts..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full text-foreground"
					startDecorator={<Search className="h-4 w-4" />}
				/>
			</div>

			<div className="flex justify-start my-2 mx-4 gap-4 ">
				<button
					className={` p-2  px-4 rounded-full   ${
						filterType === "all"
							? "bg-primary text-background"
							: "text-primary border border-primary-foreground"
					}`}
					onClick={() => handleFilterChange("all")}
				>
					All
				</button>
				<button
					className={` p-2  px-4 rounded-full  ${
						filterType === "chats"
							? "bg-primary text-background"
							: "text-primary border border-primary-foreground"
					}`}
					onClick={() => handleFilterChange("chats")}
				>
					Chats
				</button>
				<button
					className={` p-2 px-4 rounded-full   ${
						filterType === "groups"
							? "bg-primary text-background"
							: "text-primary border border-primary-foreground"
					}`}
					onClick={() => handleFilterChange("groups")}
				>
					Groups
				</button>
			</div>

			<ScrollArea className="h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
				{displayContacts.length > 0 ? (
					displayContacts.map((contact) => (
						<div
							key={contact.id}
							className="flex items-center p-4 hover:bg-muted cursor-pointer rounded-2xl"
							onClick={() => {
								setSelectedChatData(contact);
								setSelectedChatType("contact");
							}}
						>
							<Avatar>
								<AvatarImage src={contact.avatar} alt={contact.name} />
								<AvatarFallback className="text-primary">
									{(contact?.name || "A B")
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="ml-4 flex-1">
								<div className="flex justify-between items-center">
									<p className="font-medium text-foreground">
										{contact.name || "Sahil"}
									</p>
								</div>
								<p className="text-sm text-muted-foreground">
									{contact.lastSeen || contact.email}
								</p>
							</div>
						</div>
					))
				) : (
					<p className="text-muted-foreground p-4">
						{isSearching ? "Searching..." : "No contacts found."}
					</p>
				)}
			</ScrollArea>
		</div>
	);
}
