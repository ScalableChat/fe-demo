import Avatar from "../../../components-ui/Avatar"
import { getMyChannelInfo } from "../../../utils/getMyChannelInfo"
import { ChannelHeaderProps } from "./types"
import { AiOutlineSearch } from "react-icons/ai"
function ChannelHeader(props: ChannelHeaderProps) {
	const { onClick, myChannel } = props
	const { channelName, channelPhotoURL } = getMyChannelInfo(myChannel)
	const chatMemberNames = myChannel.channel.channelMembers.map((e) => {
		if (e.id === myChannel.channelMember.id) {
			return "You"
		}
		return e.chatMember?.name ?? "New Member"
	})
	return (
		<div
			onClick={() => {
				onClick && onClick(myChannel)
			}}
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				columnGap: "12px",
				backgroundColor:"#EEEEEE",
			}}
		>
			{/* Left Avatar */}
			<div>
				<Avatar photoURL={channelPhotoURL} />
			</div>

			{/* Middle */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					flex: 1, //auto extends
				}}
			>
				{/* Middle upper */}
				<div>
					<span>{channelName}</span>
				</div>
				{/* Middle lower */}
				<div>
					<span
						style={{
							fontSize: "70%",
						}}
					>
						{chatMemberNames.join(",")}
					</span>
				</div>
			</div>

			<AiOutlineSearch />
		</div>
	)
}

export default ChannelHeader
