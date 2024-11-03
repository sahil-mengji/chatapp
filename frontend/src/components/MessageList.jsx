import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { File, Check, CheckCheck } from "lucide-react";
import { useAppStore } from "../store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MessageList(props) {
	const { selectedChatType, selectedChatData, selectedChatMessages, users } =
		useAppStore();

	const getSenderDetails = (senderId) => {
		return (
			users.find((user) => user.id === senderId) || {
				name: "Unknown",
				avatar: null,
			}
		);
	};

	return (
		<ScrollArea className="flex-1 p-4 bg-background">
			{selectedChatMessages.map((msg) => {
				const isCurrentUser = msg.sender === "You";
				const senderDetails = isCurrentUser
					? { name: "You", avatar: null }
					: getSenderDetails(msg.sender);

				return (
					<div
						key={msg.id}
						className={`flex ${
							isCurrentUser ? "justify-end" : "justify-start"
						} mb-4 items-end`}
					>
						{!isCurrentUser && (
							<Avatar className="mr-2">
								<AvatarImage
									src={senderDetails.avatar}
									alt={senderDetails.name}
								/>
								<AvatarFallback>{senderDetails.name.charAt(0)}</AvatarFallback>
							</Avatar>
						)}
						<div
							className={`rounded-lg py-2 px-4 max-w-[70%] ${
								isCurrentUser
									? "bg-primary text-primary-foreground"
									: "bg-muted text-foreground"
							}`}
						>
							{!isCurrentUser && (
								<p className="font-semibold mb-1">{senderDetails.name}</p>
							)}
							{msg.attachment && msg.attachment.type === "image" && (
								<img
									src={msg.attachment.url}
									alt="Attached image"
									className="rounded-lg mb-2 max-w-full"
								/>
							)}
							{msg.attachment && msg.attachment.type === "file" && (
								<div className="flex items-center mb-2">
									<File className="h-4 w-4 mr-2" />
									<span>
										{msg.attachment.name} ({msg.attachment.size})
									</span>
								</div>
							)}
							<p>{msg.content}</p>
							<div className="flex justify-between items-center mt-1">
								<p className="text-xs opacity-70">{msg.time}</p>
								{isCurrentUser && (
									<span className="ml-2">
										{msg.read ? (
											<CheckCheck className="h-3 w-3 text-primary-foreground" />
										) : (
											<Check className="h-3 w-3 text-primary-foreground" />
										)}
									</span>
								)}
							</div>
						</div>
						{isCurrentUser && (
							<Avatar className="ml-2">
								<AvatarImage
									src={senderDetails.avatar}
									alt={senderDetails.name}
								/>
								<AvatarFallback>{senderDetails.name.charAt(0)}</AvatarFallback>
							</Avatar>
						)}
					</div>
				);
			})}
		</ScrollArea>
	);
}
