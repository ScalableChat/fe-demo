import { getMyChannelInfo } from "../../utils/getMyChannelInfo"
import Avatar from "../Avatar"
import { ChannelListCardProps } from "./types"

function MyChannelListCard(props: ChannelListCardProps) {
	const { myChannel, isSelected, onClick } = props
	const { channelName, channelPhotoURL } = getMyChannelInfo(myChannel)
	return (
		<div
			onClick={() => {
				onClick && onClick(myChannel)
			}}
			// onClick={}
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				columnGap:"6px",
				backgroundColor: isSelected ? "lightgrey" : undefined,
				cursor:"pointer",
				boxSizing:"border-box",
				padding:"6px"
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
					rowGap:"6px",
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
