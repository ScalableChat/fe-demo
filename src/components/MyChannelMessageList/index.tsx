import { useEffect, useRef } from "react"
import ChannelMessageListCard from "../../components-ui/ChannelMessageListCard"
import { MyChannelMessageListProps } from "./types"

function MyChannelMessageList(props: MyChannelMessageListProps) {
	const { currentMyChannel, channelMessages } = props
	const bottomDivRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () =>{
		bottomDivRef.current?.scrollIntoView({ 
			block:"start",
			inline: "center",
			behavior: "smooth",
			
		})
	}
	useEffect(() => {
		// console.log("channelMessages change")
		// console.log("currentMyChannel change")
		if(channelMessages.length > 0 && currentMyChannel){
			// console.log("last message", channelMessages.at(-1))
			// console.log("currentMyChannel",currentMyChannel)
			if(channelMessages.at(-1)?.channelMemberId === currentMyChannel.channelMember.id){
				// console.log("pass")
				scrollToBottom()
			}
		}
	}, [channelMessages, currentMyChannel])
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
					return null//skip
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
			<div ref={bottomDivRef}/>
		</div>
	)
}

export default MyChannelMessageList
