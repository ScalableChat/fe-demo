import { useScalableChatContext } from "../../contexts/SocketContext"
import MyChannelListCard from "../../components-ui/ChannelListCard"

function MyChannelList() {
	const { myChannels, currentMyChannel, setCurretMyChannel } =
		useScalableChatContext()
	return (
		<div
			style={{
				minWidth:"250px",
				width:"100%",
				height:"100%",
				overflowY:"scroll",
				flex:1,
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
