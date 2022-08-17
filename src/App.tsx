import { Fragment, useState } from "react"
import {
	ScalableChatEngine,
	LogLevel,
} from "@scalablechat/scalable-chat-engine"
import {
	useScalableChatContext,
	WithScalableChatContext,
} from "./contexts/SocketContext"
import MyChannelList from "./components/MyChannelList"
import ChannelMessageScreen from "./components/ChannelMessageScreen"
import SideBar from "./components/SideBar"
function App() {
	const {
		chatEngine,
		setChatEngine,
		isSyncing,
		currentChatMember
	} = useScalableChatContext()

	// const [messageInput, setMessageInput] = useState<string>("")
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
	if (!currentChatMember || currentChatMember === null) {
		return <div>Sync Chat Member Failed. Please try again.</div>
	}
	return (
		<Fragment>
			<div>{`ChatMemberId: ${currentChatMember.id} name: ${currentChatMember.name}`}</div>
					<div
			style={{
				display:"flex",
				flexDirection:"row",
				alignItems:"flex-start",
				height:"100vh",
				width:"100vw",
				overflow:"hidden",
				padding:"10px",
				boxSizing:"border-box",
			}}
		>
			{/* Channel List */}
			<SideBar />
			<ChannelMessageScreen />
		</div>
		</Fragment>
	)
}

export default WithScalableChatContext(App)
