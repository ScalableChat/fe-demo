import { Channel, ChatMember } from "@scalablechat/scalable-chat-engine"
import React, { Fragment, useState } from "react"
import ChannelOrMessageSearchBar from "../../components-ui/ChannelOrMessageSearchBar"
import { useScalableChatContext } from "../../contexts/SocketContext"
import MyChannelList from "../MyChannelList"

function SideBar() {
	const { chatEngine, setCurretMyChannel, myChannels } = useScalableChatContext()
	const [searchChatMembers, setSearchChatMembers] = useState<
		ChatMember[] | null
	>(null)
	const handleStartChat = async (chatMember: ChatMember) => {
		if (chatEngine !== null) {
			const result = await chatEngine.createOrGetPeerChannel({
				chatMemberId: chatMember.id,
			})
			if (result.data && result.data !== null) {
				setCurretMyChannel(result.data)
			}
		}
	}
	const handleSearch = async (searchInput: string) => {
		if (chatEngine !== null) {
			const result = await chatEngine.searchChatMembers(searchInput)
			if (result.isSuccess) {
				setSearchChatMembers(result.data ?? [])
			}
		}
	}
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				height: "100%",
				minWidth: "350px",
				overflow: "hidden",
				// padding:"10px",
				// boxSizing:"border-box",
			}}
		>
			{/* Person info bar */}
			{/* Search bar */}
			<ChannelOrMessageSearchBar
				inputWaitMiliSeconds={500}
				onSearch={async (searchInput) => {
					console.log("search", searchInput)
					await handleSearch(searchInput)
				}}
			/>
			{Array.isArray(searchChatMembers) && (
				<div>
					{searchChatMembers?.map((e) => {
						return (
							<Fragment key={e.id}>
								<span>{e.name}</span>
								<button
									onClick={async () => {
										await handleStartChat(e)
									}}
								>
									Start Chat
								</button>
								<br/>
							</Fragment>
						)
					})}
				</div>
			)}

			<MyChannelList />
		</div>
	)
}

export default SideBar
