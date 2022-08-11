import {
	ChannelMessage,
	ChannelMessageType,
} from "@scalablechat/scalable-chat-engine"
import Avatar from "../Avatar"
import { ChannelMessageListCardProps } from "./types"

// const messageDisplayer = (
// 	currentChannel: CMMyChannel,
// 	channelMessagesMap: Map<string, ChannelMessage[]>,
// ) => {
// 	const myChatMember = currentChannel.channel.channelMembers.find(
// 		(e) => e.id === currentChannel.channelMember.id,
// 	)?.chatMember
// 	const channelMessages =
// 		channelMessagesMap.get(currentChannel.channel.id) ?? []
// 	return (
// 		<div>
// 			{channelMessages.map((channelMessage, i) => {
// 				const isMyMessage =
// 					channelMessage.channelMemberId ===
// 					currentChannel.channelMember.id
// 				const senderChannelMember =
// 					currentChannel.channel.channelMembers.find(
// 						(e) => e.id === channelMessage.channelMemberId,
// 					)

// 				return (
// 					<div
// 						key={i}
// 						style={{
// 							backgroundColor: isMyMessage ? "green" : undefined,
// 						}}
// 					>
// 						<span>{`${
// 							isMyMessage
// 								? myChatMember?.name ?? "ME"
// 								: senderChannelMember?.chatMember!.name
// 						}: `}</span>
// 						<span>{channelMessage.message}</span>
// 					</div>
// 				)
// 			})}
// 		</div>
// 	)
// }

const TextMessageRender = (channelMessage: ChannelMessage) => {
	return (
		<div>
			<span>{channelMessage.message}</span>
		</div>
	)
}
const MessageRenderPicker = (channelMessage: ChannelMessage) => {
	switch (channelMessage.messageType) {
		case ChannelMessageType.TEXT:
			return TextMessageRender(channelMessage)
		default:
			return (
				<div>{`No message render: ${channelMessage.messageType}`}</div>
			)
	}
}
function ChannelMessageListCard(props: ChannelMessageListCardProps) {
	const { channelMessage, channelMember, isSender, containerStyle } = props
	const messageSenderName = channelMember.chatMember?.name ?? "New Member"
	return (
		<div
			style={{
				// width: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				columnGap: "12px",
				...containerStyle,
			}}
		>
			{/* Left Avatar */}
			{!isSender && (
				<div>
					<Avatar photoURL={channelMember.chatMember?.photoURL} />
				</div>
			)}

			{/* Middle Message Box*/}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "flex-start",
					borderRadius: "12px",
					padding: "10px",
					backgroundColor: isSender ? "lightgreen" : "#EEEEEE",
					columnGap:"12px",
					// boxSizing:"border-box",
				}}
			>
				{/* Message Box Content */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					{/* Message Box Content ChatMemberName */}
					{!isSender && (
						<div>
							<span>{messageSenderName}</span>
						</div>
					)}

					{/* Message Box Content Message */}
					{MessageRenderPicker(channelMessage)}
				</div>

				{/* Message Box time */}
				<div
					style={{
						alignSelf: "flex-end",
						fontSize: "70%",
					}}
				>
					上午10點
				</div>
			</div>
		</div>
	)
}

export default ChannelMessageListCard
