import React, { useEffect, useRef } from "react"
import { useScalableChatContext } from "../../contexts/SocketContext"
import PageContainer from "../../components-ui/PageContainer"
import EmptyChannelScreen from "../EmptyChannelScreen"
import ChannelHeader from "./ChannelHeader"
import MyChannelMessageList from "../MyChannelMessageList"
import ChannelMessageInputBox from "../ChannelMessageInputBox"

function ChannelMessageScreen() {
	const {
		currentChatMember,
		currentMyChannel,
		channelMessagesMap,
		channelMessageCreateInputMap,
		onChannelSendMessage,
		setChannelMessageCreateInput,
	} = useScalableChatContext()
	const messageContainerRef = useRef<HTMLDivElement>(null)
	const bottomDivRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () =>{
		bottomDivRef.current?.scrollIntoView({ 
			block:"start",
			inline: "center",
			behavior: "smooth",
			
		})
	}
	const handleChannelSendMessage = async (channelId:string) =>{
		await onChannelSendMessage(channelId)
		scrollToBottom()
	}
	const channelMessages =
	channelMessagesMap.get(currentMyChannel?.channel.id ?? "not-found") ?? []

	// useEffect(() => {
	// 	console.log("channelMessages change")
	// 	console.log("currentChatMember change")
	// 	if(channelMessages.length > 0 && currentChatMember){
	// 		console.log("last message", channelMessages.at(-1))
	// 		console.log("currentChatMember",currentChatMember)
	// 		if(channelMessages.at(-1)?.chatMemberId === currentChatMember?.id){
	// 			console.log("pass")
	// 			scrollToBottom()
	// 		}
	// 	}
	// }, [channelMessages, currentChatMember,channelMessagesMap])
	

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
					ref={messageContainerRef}
				>
					<MyChannelMessageList
						currentMyChannel={currentMyChannel}
						channelMessages={channelMessages}
					/>
					<div ref={bottomDivRef}/>
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
						handleChannelSendMessage(channelId)
					}
				/>,
				<button onClick={scrollToBottom} >scroll</button>
			]}
		/>
	)
}

export default ChannelMessageScreen
