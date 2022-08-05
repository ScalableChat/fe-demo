import {
	createContext,
	ElementType,
	useContext,
	useEffect,
	useState,
} from "react"
import { ScalableChatEngine } from "../../clientSDK"
import { Channel, ChannelMessage } from "../../clientSDK/type"

export interface ScalableChatContextProps {
	channels:Channel[]
	channelMessages:ChannelMessage[]
	sync:()=>Promise<void>
}
const ScalableChatContext = createContext<ScalableChatContextProps>({
	channels: [],
	channelMessages: [],
	sync: async() => {},
})

export interface ScalableChatContextOptions{
	// logLevel?: number
}
const defaultScalableChatContextOptions:ScalableChatContextOptions={

}

export const useScalableChatContext = () => useContext(ScalableChatContext)

export const WithScalableChatContext = (
	Component: ElementType,
	options: ScalableChatContextOptions = defaultScalableChatContextOptions
) => {
	return function WithScalableChatContext(props: any) {
		const [channels, setChannels] = useState<Channel[]>([])
		const [channelMessages, setChannelMessages] = useState<ChannelMessage[]>([])
		const [client, setClient] = useState<ScalableChatEngine | null>(null)
		// useEffect(() => {
		// 	initManager()
		// 	return () => {
		// 		manager?.off()
		// 	}
		// }, [])
		const syncChannelAndMessages = async() =>{

		}
		try {

			const defaultContextValue: ScalableChatContextProps = {
				channels: channels,
				channelMessages: channelMessages,
				sync:syncChannelAndMessages
			}

			return (
				<ScalableChatContext.Provider value={defaultContextValue}>
					<Component {...props} />
				</ScalableChatContext.Provider>
			)
		} catch (error) {
			console.error("ScalableChatContext Init Error", error)
			return <div>ScalableChatContext Init Error</div>
		}
	}
}
