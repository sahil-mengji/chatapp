import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigLeft, ArrowLeft, Phone, Video } from "lucide-react";

export default function ChatHeader({ selectedContact, setSelectedContact }) {
	return (
		<div className="p-4 border-b border-border flex justify-between items-center bg-background">
			<div className="flex items-center">
				<Button
					variant="ghost"
					size="icon"
					className="mr-4"
					onCLick={() => setSelectedContact(null)}
				>
					<ArrowLeft className="h-4 w-4 text-primary" />
				</Button>
				<Avatar>
					<AvatarImage
						src={selectedContact.avatar}
						alt={selectedContact.name}
					/>
					<AvatarFallback className="text-primary">
						{selectedContact.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>
				<div className="ml-4">
					<p className="font-medium text-foreground">{selectedContact.name}</p>
					<p className="text-sm text-muted-foreground">
						{selectedContact.lastSeen}
					</p>
				</div>
			</div>
			<div className="flex space-x-2">
				<Button variant="ghost" size="icon">
					<Phone className="h-4 w-4 text-primary" />
				</Button>

				<Button variant="ghost" size="icon">
					<Video className="h-4 w-4 text-primary" />
				</Button>
			</div>
		</div>
	);
}
