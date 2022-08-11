import React from "react"
import { useScalableChatContext } from "../../contexts/SocketContext"
import PageContainer from "../../components-ui/PageContainer"
import EmptyChannelScreen from "../EmptyChannelScreen"
import ChannelHeader from "./ChannelHeader"
import MyChannelMessageList from "../MyChannelMessageList"
import ChannelMessageInputBox from "../ChannelMessageInputBox"

function ChannelMessageScreen() {
	const {
		currentMyChannel,
		channelMessagesMap,
		channelMessageCreateInputMap,
		onChannelSendMessage,
		setChannelMessageCreateInput,
	} = useScalableChatContext()

	if (currentMyChannel === null) {
		return <EmptyChannelScreen />
	}
	return (
		<PageContainer
			header={<ChannelHeader myChannel={currentMyChannel} />}
			content={[
				<div
					style={{
						width: "100%",
						// height:"100%",
						minHeight: "100px",
						flex: 1,
						overflowY: "scroll",
						boxSizing: "border-box",
						padding: "10px",
					}}
				>
					<MyChannelMessageList
						currentMyChannel={currentMyChannel}
						channelMessagesMap={channelMessagesMap}
					/>
				</div>,
				<div
					style={{
						height: "10px",
					}}
				></div>,
				<ChannelMessageInputBox
					currentMyChannel={currentMyChannel}
					channelMessageCreateInputMap={channelMessageCreateInputMap}
					onUpdate={(input) => {
						setChannelMessageCreateInput(
							currentMyChannel.channel.id,
							input,
						)
					}}
					onSendChannelMessage={(channelId) =>
						onChannelSendMessage(channelId)
					}
				/>,
			]}
		/>
	)
}

export default ChannelMessageScreen
