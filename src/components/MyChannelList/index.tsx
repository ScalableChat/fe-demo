import { useScalableChatContext } from "../../contexts/SocketContext"
import MyChannelListCard from "../../components-ui/ChannelListCard"

function MyChannelList() {
	const { myChannels, currentMyChannel, setCurretMyChannel } =
		useScalableChatContext()
	return (
		<div
			style={{
				height:"100%",
				overflowY:"scroll",
				// display:"flex",
				// flexDirection:"column",
				// rowGap:"12px"
			}}
		>
			{myChannels.map((myChannel, i) => {
				const isSelect =
					currentMyChannel !== null &&
					currentMyChannel?.channel.id === myChannel.channel.id
				return (
					<MyChannelListCard
						key={i}
						myChannel={myChannel}
						isSelected={isSelect}
						onClick={() => {
							setCurretMyChannel(myChannel)
						}}
					/>
				)
			})}
		</div>
	)
}

export default MyChannelList
