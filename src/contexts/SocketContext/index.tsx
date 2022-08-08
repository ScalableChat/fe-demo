import { createContext, ElementType, useContext, useState } from "react"
import {
	ScalableChatEngine,
	ChannelMessage,
	CMMyChannel,
} from "@scalablechat/scalable-chat-engine"
export interface ScalableChatContextProps {
	chatEngine: ScalableChatEngine | null
	setChatEngine: (chatEngine: ScalableChatEngine) => void
	myChannels: CMMyChannel[]
	channelMessagesMap: Map<string, ChannelMessage[]>
	sync: () => Promise<void>
	isSyncing: boolean
	onSendTextMessage: (channelId: string, message: string) => Promise<void>
}
const ScalableChatContext = createContext<ScalableChatContextProps>({
	chatEngine: null,
	setChatEngine: () => {},
	myChannels: [],
	channelMessagesMap: new Map(),
	sync: async () => {},
	isSyncing: false,
	onSendTextMessage: async () => {},
})

export interface ScalableChatContextOptions {
	// logLevel?: number
}
const defaultScalableChatContextOptions: ScalableChatContextOptions = {}

export const useScalableChatContext = () => useContext(ScalableChatContext)

export const WithScalableChatContext = (
	Component: ElementType,
	options: ScalableChatContextOptions = defaultScalableChatContextOptions,
) => {
	return function WithScalableChatContext(props: any) {
		const [myChannels, setMyChannels] = useState<CMMyChannel[]>([])
		const [channelMessagesMap, setChannelMessagesMap] = useState<
			Map<string, ChannelMessage[]>
		>(new Map<string, ChannelMessage[]>())
		const [engine, setEngine] = useState<ScalableChatEngine | null>(null)
		const [isSyncing, setIsSyncing] = useState(false)
		function groupBy<T>(
			list: T[],
			keyGetter: (data: T) => string | number,
		) {
			const map = new Map<string | number, T[]>()
			list.forEach((item) => {
				const key = keyGetter(item)
				const collection = map.get(key)
				if (!collection) {
					map.set(key, [item])
				} else {
					collection.push(item)
				}
			})
			return map
		}

		const upsertChannelMessageMap = (
			channelId: string,
			channelMessages: ChannelMessage[],
		) => {
			setChannelMessagesMap(
				new Map(channelMessagesMap.set(channelId, channelMessages)),
			)
		}
		const handleNewMessage = (message: ChannelMessage) => {
			let channelMessages =
				channelMessagesMap.get(message.channelId) ?? []
			channelMessages.push(message)
			upsertChannelMessageMap(message.channelId, channelMessages)
		}
		const handleChannelSendTextMessage = async (
			channelId: string,
			message: string,
		) => {
			const channel = engine?.getChannel(channelId)
			const result = await channel!.sendTextMessage(message)
			console.log("result", result)
			let channelMessages = channelMessagesMap.get(channelId) ?? []
			if (result.isSuccess && result.data) {
				channelMessages.push(result.data)
			}
			upsertChannelMessageMap(channelId, channelMessages)
		}
		const handleSetClient = async (client: ScalableChatEngine) => {
			// bind handler function
			client.onNewMessage = handleNewMessage
			client.onNewChannel = (newChannel) => {
				console.log("new channel", newChannel)
			}
			setEngine(client)
			await syncChannelAndMessages(client)
		}

		const syncChannelAndMessages = async (_engine: ScalableChatEngine) => {
			setIsSyncing(true)
			try {
				// update channels
				const channelsResult = await _engine?.getMyChannels()
				console.log("channelsResult", channelsResult)
				setMyChannels(channelsResult?.data ?? [])

				const lastUpdateDate = new Date("2022-01-01")
				let newUpdateDate = new Date()
				newUpdateDate.setDate(lastUpdateDate.getDate() - 1)
				const _channelIds: string[] =
					channelsResult?.data?.map((e) => e.channel.id) ?? []
				const channelMessagesResult =
					await _engine?.getMyChannelsMessages({
						channelIds: _channelIds,
						fromTime: newUpdateDate,
					})
				// now insert, later append
				const _channelMessageMap = groupBy(
					channelMessagesResult?.data ?? [],
					(t) => {
						return t.channelId
					},
				)
				_channelMessageMap.forEach((messages, channelId) => {
					const localMessages =
						channelMessagesMap.get(channelId as string) ?? []
					const localMessageIds = localMessages.map((e) => e.id)
					const newMessages = messages.filter(
						(e) => !localMessageIds.includes(e.id),
					)
					localMessages.push(...newMessages)
					channelMessagesMap.set(channelId as string, localMessages)
				})
				setChannelMessagesMap(new Map(channelMessagesMap))
			} catch (error) {
				console.error(error)
			}
			setIsSyncing(false)
		}

		const handleSync = async () => {
			if (engine === null) {
				throw new Error("Engine not initialized")
			}
			syncChannelAndMessages(engine)
		}
		try {
			const defaultContextValue: ScalableChatContextProps = {
				chatEngine: engine,
				setChatEngine: handleSetClient,
				myChannels: myChannels,
				channelMessagesMap: channelMessagesMap,
				sync: handleSync,
				isSyncing: isSyncing,
				onSendTextMessage: handleChannelSendTextMessage,
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
