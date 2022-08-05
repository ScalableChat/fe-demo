import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { ScalableChatEngine } from "./clientSDK";

function App() {
	const initWs = async () => {
		const client = await StreamChat.getInstance(
			"z4wjxbm3pem7",
			"mv827j82thzvvv9nz3qarx4ydgt2khxucvg4hapm75mcyyuemzs596wfw2deyk7e"
		);
		const channel = client.channel("messaging", "TestChannel");
		await channel.create();
		// channel.sendMessage("asdsa",{
		// 	is_pending_message
		// })
		// channel.sendMessage()
	};
	const initWSScalableChat = async () => {
		const client = ScalableChatEngine.getInstance(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGF0QXBwSWQiOiIyYTgzOTgzMC03YTM2LTQxMGYtOGY3Ny0xNWY2YjVkNzQ0MGMiLCJjaGF0TWVtYmVySWQiOiI1YjNkM2M1YS1lY2ViLTRmNmItODFhNi0yYzk4NjUwZGM1MmUiLCJpYXQiOjE2NTgyMDkxODB9.D9FHUVDvmmTdCSfwL6E3DgQz4j-COH9VlVgyKIvNMi4",
			{
				gqlURL:"http://localhost:7100/graphql"
			}
		);
		const channel = client.getChannel("33e6f3ac-a115-465d-9a49-1e0df5a1990b")
		const result = await channel.sendTextMessage("Hello World123")
		console.log("result", result)
	};
	useEffect(() => {
		initWSScalableChat();
		console.log("run onces")
	}, []);

	return <div>App</div>;
}

export default App;
