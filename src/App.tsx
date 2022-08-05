import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { ScalableChatEngine } from "./clientSDK";

function App() {
	const [chatEngine, setChatEngine] = useState<ScalableChatEngine | null>(null)
	const [messageInput, setMessageInput] = useState<string>("")
	
	const initScalableChatEngine = async () => {
		const client = ScalableChatEngine.getInstance(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGF0QXBwSWQiOiIyYTgzOTgzMC03YTM2LTQxMGYtOGY3Ny0xNWY2YjVkNzQ0MGMiLCJjaGF0TWVtYmVySWQiOiI1YjNkM2M1YS1lY2ViLTRmNmItODFhNi0yYzk4NjUwZGM1MmUiLCJpYXQiOjE2NTgyMDkxODB9.D9FHUVDvmmTdCSfwL6E3DgQz4j-COH9VlVgyKIvNMi4",
			{
				gqlURL:"http://localhost:7100/graphql"
			}
		);
		setChatEngine(client)
	};
	const sendMessage = async (message:string,) =>{
		const channel = chatEngine!.getChannel("33e6f3ac-a115-465d-9a49-1e0df5a1990b")
		const result = await channel.sendTextMessage("Hello World123")
		console.log("result", result)
	}
	if(chatEngine === null){
		return <div>
		<button onClick={()=>initScalableChatEngine()}>Init Chat Engine</button>
	</div>;
	}
	return <div>
		<input onChange={e=>setMessageInput(e.currentTarget.value)}/>
		<button onClick={()=>sendMessage(messageInput)}>Send Message</button>
	</div>;
}

export default App;
