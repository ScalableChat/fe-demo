import ChannelMessageListCard from "../../components-ui/ChannelMessageListCard"
import { MyChannelMessageListProps } from "./types"

function MyChannelMessageList(props: MyChannelMessageListProps) {
	const { currentMyChannel, channelMessages } = props

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				rowGap: "12px",
			}}
		>
			{channelMessages.map((channelMessage, i) => {
				const isSender =
					channelMessage.channelMemberId ===
					currentMyChannel.channelMember.id
				const senderChannelMember =
					currentMyChannel.channel.channelMembers.find(
						(e) => e.id === channelMessage.channelMemberId,
					)
				if (!senderChannelMember) {
					return //skip
				}
				return (
					<ChannelMessageListCard
						key={i}
						channelMessage={channelMessage}
						channelMember={senderChannelMember}
						isSender={isSender}
						containerStyle={{
							alignSelf: isSender ? "flex-end" : "flex-start",
						}}
					/>
				)
			})}
		</div>
	)
}

export default MyChannelMessageList
