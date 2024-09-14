import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Search } from "lucide-react";

export default function ContactList({ contacts, setSelectedContact }) {
	return (
		<div className="w-full md:w-1/3 bg-background border-r border-border p-4">
			<h1 className="text-primary font-bold text-2xl p-4">
				<MessageCircle className="text-yellow-500" /> Gossips
			</h1>

			<div className=" border-b border-border pb-4">
				<Input
					type="search"
					placeholder="Search contacts..."
					className="w-full text-foreground"
					startDecorator={<Search className="h-4 w-4  " />}
				/>
			</div>
			<Tabs defaultValue="contacts">
				<TabsList className="w-full">
					<TabsTrigger value="contacts" className="w-1/2">
						Contacts
					</TabsTrigger>
					<TabsTrigger value="groups" className="w-1/2">
						Groups
					</TabsTrigger>
				</TabsList>
				<TabsContent value="contacts">
					<ScrollArea className="h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
						{contacts
							.filter((c) => !c.isGroup)
							.map((contact) => (
								<div
									key={contact.id}
									className="flex items-center p-4 hover:bg-muted cursor-pointer rounded-2xl"
									onClick={() => setSelectedContact(contact)}
								>
									<Avatar>
										<AvatarImage src={contact.avatar} alt={contact.name} />
										<AvatarFallback className="text-primary">
											{contact.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="ml-4 flex-1 ">
										<div className="flex justify-between items-center">
											<p className="font-medium text-foreground">
												{contact.name}
											</p>
										</div>
										<p className="text-sm text-muted-foreground">
											{contact.lastSeen}
										</p>
									</div>
								</div>
							))}
					</ScrollArea>
				</TabsContent>
				{/* Handle group chats similarly */}
			</Tabs>
		</div>
	);
}
