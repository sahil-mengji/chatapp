import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { File, Check, CheckCheck } from "lucide-react";

export default function MessageList({ messages }) {
	return (
		<ScrollArea className="flex-1 p-4 bg-background">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={`flex ${
						msg.sender === "You" ? "justify-end" : "justify-start"
					} mb-4`}
				>
					<div
						className={`rounded-lg p-2 max-w-[70%] ${
							msg.sender === "You"
								? "bg-primary text-primary-foreground"
								: "bg-muted text-muted-foreground"
						}`}
					>
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
							{msg.sender === "You" && (
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
				</div>
			))}
		</ScrollArea>
	);
}
