import { Fragment, useEffect, useState } from "react"
import {
	ScalableChatEngine,
	LogLevel,
	CMMyChannel,
	ChannelMessage,
} from "@scalablechat/scalable-chat-engine"
import {
	useScalableChatContext,
	WithScalableChatContext,
} from "./contexts/SocketContext"
function App() {
	const {
		chatEngine,
		setChatEngine,
		isSyncing,
		channelMessagesMap,
		myChannels,
		onSendTextMessage,
	} = useScalableChatContext()
	const [currentChannel, setCurrentChannel] = useState<CMMyChannel | null>(
		null,
	)
	const [messageInput, setMessageInput] = useState<string>("")
	const tokenA =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGF0QXBwSWQiOiIyYTgzOTgzMC03YTM2LTQxMGYtOGY3Ny0xNWY2YjVkNzQ0MGMiLCJjaGF0TWVtYmVySWQiOiI1YjNkM2M1YS1lY2ViLTRmNmItODFhNi0yYzk4NjUwZGM1MmUiLCJpYXQiOjE2NTk5NjIwODF9.HHXXAJO5iperRxk1tS2Wct9ML7GDT2aA0h5yEd7eDO4"
	const tokenB =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGF0QXBwSWQiOiIyYTgzOTgzMC03YTM2LTQxMGYtOGY3Ny0xNWY2YjVkNzQ0MGMiLCJjaGF0TWVtYmVySWQiOiIxNGJlZWEyMC00MTMwLTRkZWItODlhYi02YWQ2ZDIyNjcyZjEiLCJpYXQiOjE2NTk5NjIxMjJ9.WOP-8R-WqLUV_KcpUWggnbaHZMGZ8ppzfvf-Vk-f-FI"
	const [jwtToken, setJwtToken] = useState<string>(tokenA)
	const initScalableChatEngine = async () => {
		const client = ScalableChatEngine.getInstance(jwtToken, {
			wsURL: "https://office-chat-ws.innoplus.xyz",
			gqlURL: "https://office-chat-be.innoplus.xyz/graphql",
			logLevel: LogLevel.DEBUG,
		})
		setChatEngine(client)
	}
	const messageDisplayer = (
		currentChannel: CMMyChannel,
		channelMessagesMap: Map<string, ChannelMessage[]>,
	) => {
		const myChatMember = currentChannel.channel.channelMembers.find(e=>e.id === currentChannel.channelMember.id)?.chatMember
		const channelMessages =
			channelMessagesMap.get(currentChannel.channel.id) ?? []
		return (
			<div>
				{channelMessages.map((channelMessage, i) => {
					const isMyMessage =
						channelMessage.channelMemberId ===
						currentChannel.channelMember.id
					const senderChannelMember =
						currentChannel.channel.channelMembers.find(
							(e) => e.id === channelMessage.channelMemberId,
						)

					return (
						<div
							key={i}
							style={{
								backgroundColor: isMyMessage
									? "green"
									: undefined,
							}}
						>
							<span>{`${
								isMyMessage
									? myChatMember?.name ?? "ME"
									: senderChannelMember?.chatMember.name
							}: `}</span>
							<span>{channelMessage.message}</span>
						</div>
					)
				})}
			</div>
		)
	}
	if (chatEngine === null) {
		return (
			<div>
				<button
					disabled={jwtToken === tokenA}
					onClick={() => {
						setJwtToken(tokenA)
					}}
				>
					Set Token A
				</button>
				<button
					disabled={jwtToken === tokenB}
					onClick={() => {
						setJwtToken(tokenB)
					}}
				>
					Set Token B
				</button>
				{/* <br/> */}
				{/* <span>{jwtToken}</span> */}
				<br />
				<input
					value={jwtToken}
					onChange={(e) => setJwtToken(e.currentTarget.value)}
				/>
				<br />
				<button onClick={() => initScalableChatEngine()}>
					Init Chat Engine
				</button>
			</div>
		)
	}
	if (isSyncing) {
		return <div>Syncing</div>
	}
	return (
		<div>
			<span>Channels</span>
			{myChannels.map((myChannel, i) => {
				const isSelect =
					currentChannel !== null &&
					currentChannel?.channel.id === myChannel.channel.id
				return (
					<div key={i}>
						<span>
							{myChannel.channel.isDirect
								? "DM"
								: myChannel.channel.name}
						</span>
						<button
							disabled={isSelect}
							onClick={() => setCurrentChannel(myChannel)}
						>
							{isSelect ? "Selected" : "Select"}
						</button>
					</div>
				)
			})}
			<br />
			{currentChannel === null ? (
				<span>No selected channel</span>
			) : (
				<Fragment>
					<input
						value={messageInput}
						onChange={(e) => setMessageInput(e.currentTarget.value)}
					/>
					<button
						onClick={() =>
							onSendTextMessage(
								currentChannel.channel.id,
								messageInput,
							)
						}
					>
						Send Message
					</button>
					<br />
					{messageDisplayer(currentChannel, channelMessagesMap)}
				</Fragment>
			)}
		</div>
	)
}

export default WithScalableChatContext(App)
