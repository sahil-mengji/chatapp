import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Paperclip, Smile, Mic, Send } from "lucide-react";

export default function ChatInput({ message, setMessage, handleFileUpload }) {
	const emojiRef = useRef();
	const [emoji, setEmoji] = useState(false);

	const handleAddEmoji = (e) => {
		setMessage((message) => message + e.emoji);
	};

	useEffect(() => {
		const handleCLickOutside = (e) => {
			if (emojiRef.current && !emojiRef.current.contains(e.target)) {
				setEmoji(false);
			}
		};
		document.addEventListener("mousedown", handleCLickOutside);
		return () => {
			document.removeEventListener("mousedown", handleCLickOutside);
		};
	}, [emojiRef]);

	return (
		<div className="p-4 border-t border-border bg-background">
			<div className="flex items-center space-x-2 relative">
				<input
					type="file"
					id="file-upload"
					className="hidden"
					onChange={handleFileUpload}
				/>
				<label htmlFor="file-upload ">
					<Button variant="ghost" size="icon" asChild>
						<Paperclip className="h-4 w-4 text-foreground mr-4" />
					</Button>
				</label>
				<Input
					type="text"
					placeholder="Type a message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="flex-1 bg-background text-foreground"
				/>
				<div
					onMouseEnter={() => {
						setEmoji(true);
					}}
				>
					<Button variant="ghost" size="icon" onClick={() => setEmoji(true)}>
						<Smile className="h-4 w-4 text-foreground" />
					</Button>
				</div>

				<div
					className={`absolute bottom-12 right-8 ${emoji ? "block" : "hidden"}`}
					ref={emojiRef}
				>
					<EmojiPicker
						theme="dark"
						onEmojiClick={handleAddEmoji}
						autoFocusSearch={false}
					/>
				</div>

				<Button variant="ghost" size="icon">
					<Mic className="h-4 w-4 text-foreground" />
				</Button>
				<Button size="icon">
					<Send className="h-4 w-4 text-primary-foreground" />
				</Button>
			</div>
		</div>
	);
}
