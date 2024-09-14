import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ContactList from "../../components/ContactList";
import React from "react";
import ChatPage from "../../components/ChatPage";
export default function Chat() {
	const navigate = useNavigate();
	const { userInfo } = useAppStore();
	const [message, setMessage] = useState("");
	const [selectedContact, setSelectedContact] = useState(null);
	const contacts = [
		{
			id: 1,
			name: "Alice Smith",
			avatar: "/placeholder.svg?height=32&width=32",
			status: "online",
			lastSeen: "Active now",
		},
		{
			id: 2,
			name: "Bob Johnson",
			avatar: "/placeholder.svg?height=32&width=32",
			status: "offline",
			lastSeen: "2 hours ago",
		},
		{
			id: 3,
			name: "Work Group",
			avatar: "/placeholder.svg?height=32&width=32",
			isGroup: true,
		},
		{
			id: 4,
			name: "Charlie Brown",
			avatar: "/placeholder.svg?height=32&width=32",
			status: "online",
			lastSeen: "Active now",
		},
		{
			id: 5,
			name: "Diana Prince",
			avatar: "/placeholder.svg?height=32&width=32",
			status: "offline",
			lastSeen: "1 day ago",
		},
	];

	const messages = [
		{
			id: 1,
			sender: "Alice Smith",
			content: "Hey there!",
			time: "10:00 AM",
			read: true,
		},
		{
			id: 2,
			sender: "You",
			content: "Hi Alice, how are you?",
			time: "10:02 AM",
			read: true,
		},
		{
			id: 3,
			sender: "Alice Smith",
			content: "Im doing great, thanks for asking!",
			time: "10:05 AM",
			read: true,
		},
		{
			id: 4,
			sender: "You",
			content: "Thats wonderful to hear!",
			time: "10:07 AM",
			read: false,
		},
		{
			id: 5,
			sender: "Alice Smith",
			content: "Check out this image!",
			time: "10:10 AM",
			read: false,
			attachment: {
				type: "image",
				url: "/placeholder.svg?height=200&width=300",
			},
		},
		{
			id: 6,
			sender: "You",
			content: "Heres the document you requested.",
			time: "10:15 AM",
			read: false,
			attachment: { type: "file", name: "document.pdf", size: "2.5 MB" },
		},
	];

	const handleFileUpload = (event) => {
		// File upload logic
	};
	return (
		<div className="flex flex-col md:flex-row h-screen bg-gray-100">
			{/* Show ContactList on desktop or when no contact is selected on mobile */}
			{!selectedContact || window.innerWidth >= 768 ? (
				<ContactList
					contacts={contacts}
					setSelectedContact={setSelectedContact}
				/>
			) : null}

			{/* Show ChatPage when a contact is selected */}
			{selectedContact ? (
				<div className="flex-1 flex flex-col">
					<ChatPage
						setSelectedContact={setSelectedContact}
						selectedContact={selectedContact}
						messages={messages}
						message={message}
						setMessage={setMessage}
						handleFileUpload={handleFileUpload}
					/>
				</div>
			) : (
				<div className="flex-1 flex items-center justify-center bg-background">
					<p className="text-foreground">Select a contact to start chatting</p>
				</div>
			)}
		</div>
	);
}
