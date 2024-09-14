import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import React from "react";
import MessageList from "./MessageList";
export default function ChatPage({
	selectedContact,
	setSelectedContact,
	messages,
	message,
	setMessage,
	handleFileUpload,
}) {
	return (
		<>
			<ChatHeader
				selectedContact={selectedContact}
				setSelectedContact={setSelectedContact}
			/>
			<MessageList messages={messages} />
			<ChatInput
				message={message}
				setMessage={setMessage}
				handleFileUpload={handleFileUpload}
			/>
		</>
	);
}
