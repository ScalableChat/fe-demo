import { getMyChannelInfo } from "../../utils/getMyChannelInfo"
import Avatar from "../Avatar"
import { ChannelListCardProps } from "./types"

function MyChannelListCard(props: ChannelListCardProps) {
	const { myChannel, isSelected, onClick } = props
	const { channelName, channelPhotoURL } = getMyChannelInfo(myChannel)
	return (
		<div
			onDoubleClick={() => {
				onClick && onClick(myChannel)
			}}
			// onClick={}
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: isSelected ? "lightgrey" : undefined,
			}}
		>
			{/* Left Avatar */}
			<div>
				<Avatar photoURL={channelPhotoURL} />
			</div>

			{/* Right */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}
			>
				{/* Right upper */}
				<div>
					<span>{channelName}</span>
				</div>
				<div>
					<span>last message:.......</span>
				</div>
			</div>
		</div>
	)
}

export default MyChannelListCard
