import { ChannelMessageInputBoxProps } from "./types"
import { AiOutlineFileAdd, AiOutlineSend } from "react-icons/ai"
import { defaultChannelMessageCreateInput } from "../../contexts/SocketContext"
import React, { useRef } from "react"
function ChannelMessageInputBox(props: ChannelMessageInputBoxProps) {
	const {
		channelMessageCreateInputMap,
		currentMyChannel,
		onUpdate,
		onSendChannelMessage,
	} = props
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const handleKeydown = async (
		e: React.KeyboardEvent<HTMLTextAreaElement>,
	) => {
		if (e.key === "Enter") {
			await handleSendMessage()
		}
	}
	const handleSendMessage = async () => {
		await onSendChannelMessage(currentMyChannel.channel.id)
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const messageCreateInput = channelMessageCreateInputMap.get(
		currentMyChannel.channel.id,
	) ?? { ...defaultChannelMessageCreateInput }

	const iconSize = 24
	return (
		<div
			style={{
				resize: "vertical",
				minHeight: "50px",
				width: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				columnGap: "12px",
				backgroundColor: "lightgrey",
				padding: "5px",
				boxSizing: "border-box",
			}}
		>
			{/* Emoje */}
			{/* attachment */}
			<AiOutlineFileAdd size={iconSize} />

			{/* Text box */}
			<textarea
				ref={inputRef}
				value={messageCreateInput.message ?? ""}
				style={{
					flex: 1,
					fontSize: "110%",
				}}
				onChange={(e) => {
					onUpdate({
						...messageCreateInput,
						message: e.currentTarget.value,
					})
				}}
				onKeyDown={handleKeydown}
			/>
			{/* Voice input */}
			{/* Send Button */}
			<AiOutlineSend
				size={iconSize}
				onClick={async () => await handleSendMessage()}
			/>
		</div>
	)
}

export default ChannelMessageInputBox
