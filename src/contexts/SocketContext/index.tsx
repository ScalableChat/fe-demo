import { createContext, ElementType, useContext, useState } from "react"
import {
	ScalableChatEngine,
	ChannelMessage,
	CMMyChannel,
	ChatMember,
	ChannelMessageCreateInput,
	ChannelMessageType,
	ChannelMessageOutput,
	Channel,
	ChannelMember,
} from "@scalablechat/scalable-chat-engine"
import { groupBy } from "../../utils/groupBy"
export type ChannelMessageMap = Map<string, ChannelMessage[]>
export type ChannelMessageCreateInputMap = Map<
	string,
	ChannelMessageCreateInput
>
export const defaultChannelMessageCreateInput: ChannelMessageCreateInput = {
	messageType: ChannelMessageType.TEXT,
	message: "",
}
export interface ScalableChatContextProps {
	chatEngine: ScalableChatEngine | null
	setChatEngine: (chatEngine: ScalableChatEngine) => void
	currentChatMember: ChatMember | null
	setCurrentChatMember: (currentChatMember: ChatMember) => void
	myChannels: CMMyChannel[]
	currentMyChannel: CMMyChannel | null
	setCurretMyChannel: (myChannel: CMMyChannel) => void
	channelMessagesMap: ChannelMessageMap
	channelMessageCreateInputMap: ChannelMessageCreateInputMap
	setChannelMessageCreateInput: (
		channelId: string,
		channelMessageCreateInput: ChannelMessageCreateInput,
	) => void
	sync: () => Promise<void>
	isSyncing: boolean
	onChannelSendMessage: (channelId: string) => Promise<void>
	// onSendTextMessage: (channelId: string, message: string) => Promise<void>
}
const ScalableChatContext = createContext<ScalableChatContextProps>({
	chatEngine: null,
	setChatEngine: () => {},
	currentChatMember: null,
	setCurrentChatMember: () => {},
	myChannels: [],
	currentMyChannel: null,
	setCurretMyChannel: () => {},
	channelMessagesMap: new Map(),
	channelMessageCreateInputMap: new Map(),
	setChannelMessageCreateInput: () => {},
	sync: async () => {},
	isSyncing: false,
	// onSendTextMessage: async () => {},
	onChannelSendMessage: async () => {},
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
		const [currentChatMember, setCurrentChatMember] =
			useState<ChatMember | null>(null)
		const [myChannels, setMyChannels] = useState<CMMyChannel[]>([])
		const [currentMyChannel, setCurrentMyChannel] =
			useState<CMMyChannel | null>(null)
		const [channelMessagesMap, setChannelMessagesMap] =
			useState<ChannelMessageMap>(new Map<string, ChannelMessage[]>())

		const [channelMessageCreateInputMap, setChannelMessageCreateInputMap] =
			useState<ChannelMessageCreateInputMap>(
				new Map<string, ChannelMessageCreateInput>(),
			)

		const [engine, setEngine] = useState<ScalableChatEngine | null>(null)
		const [isSyncing, setIsSyncing] = useState(false)

		const upsertChannelMessageMap = (
			channelId: string,
			channelMessages: ChannelMessage[],
		) => {
			setChannelMessagesMap(
				new Map(
					channelMessagesMap.set(channelId, [...channelMessages]),
				),
			)
		}
		const handleNewMessage = (
			engine: ScalableChatEngine,
			newMessage: ChannelMessage,
		) => {
			let channelMessages =
				channelMessagesMap.get(newMessage.channelId) ?? []
			const found = channelMessages.find((e) => e.id === newMessage.id)
			if (!found) {
				channelMessages.push(newMessage)

				upsertChannelMessageMap(newMessage.channelId, channelMessages)
			}
		}

		// for input draft
		const upsertChannelMessageCreateInputMap = (
			channelId: string,
			input: ChannelMessageCreateInput,
		) => {
			setChannelMessageCreateInputMap(
				new Map(channelMessageCreateInputMap.set(channelId, input)),
			)
		}
		const handleChannelSendMessage = async (channelId: string) => {
			let result: ChannelMessageOutput = { isSuccess: false, code: 500 }
			const channel = engine?.getChannel(channelId)
			const messageCreateInput = channelMessageCreateInputMap.get(
				channelId,
			) ?? { ...defaultChannelMessageCreateInput }
			switch (messageCreateInput.messageType) {
				case ChannelMessageType.TEXT:
					result = await channel!.sendTextMessage(
						messageCreateInput.message,
					)
					// await handleChannelSendTextMessage(channelId, messageCreateInput.message)
					break

				default:
					console.error(
						`No message type ${
							messageCreateInput.messageType
						} send handler, data: ${JSON.stringify(
							messageCreateInput,
						)}`,
					)
			}

			// update local channel message
			let channelMessages = channelMessagesMap.get(channelId) ?? []
			if (result.isSuccess && result.data) {
				channelMessages.push(result.data)
			}
			upsertChannelMessageMap(channelId, channelMessages)

			// clear input
			upsertChannelMessageCreateInputMap(channelId, {
				...defaultChannelMessageCreateInput,
			})
		}

		const handleNewChannel = async (
			chatEngine: ScalableChatEngine,
			newChannel: Channel,
		) => {
			console.group("handleNewChannel")
			console.log("newChannel", newChannel)
			const newMyChannelResult = await chatEngine.getMyChannels({
				channelIds: [newChannel.id],
			})
			console.log("newMyChannelResult", newMyChannelResult)
			if (
				newMyChannelResult.isSuccess &&
				newMyChannelResult.data &&
				newMyChannelResult.data.length === 1
			) {
				const newMyChannel = newMyChannelResult.data[0]
				console.log("newMyChannel", newMyChannel)
				setMyChannels((prev) => {
					const found = prev.find(
						(e) => e.channel.id === newMyChannel.channel.id,
					)
					console.log("found", found)
					if (found) {
						return prev
					}
					const final = [newMyChannel, ...prev]
					console.log("final", final)
					return final
				})
			}
			console.groupEnd()
		}

		const handleNewChannelMembers = async (
			chatEngine: ScalableChatEngine,
			newChannelMembers: ChannelMember[],
		) => {
			if(!Array.isArray(newChannelMembers) || newChannelMembers.length < 0){
				return
			}
			const channelId = newChannelMembers[0].channelId
			const newMyChannelResult = await chatEngine.getMyChannels({
				channelIds: [channelId],
			})
			if (
				newMyChannelResult.isSuccess &&
				newMyChannelResult.data &&
				newMyChannelResult.data.length === 1
			) {
				const newMyChannel = newMyChannelResult.data[0]
				setMyChannels((prev) => {
					const foundIndex = prev.findIndex(
						(e) => e.channel.id === newMyChannel.channel.id,
					)
					if (foundIndex === -1) {
						return prev
					}
					const newList = prev.slice(foundIndex, 1)
					return [...newMyChannelResult.data!, ...newList]
				})
			}
		}
		// const handleChannelSendTextMessage = async (
		// 	channelId: string,
		// 	message: string,
		// ) => {
		// 	const channel = engine?.getChannel(channelId)
		// 	const result = await channel!.sendTextMessage(message)
		// 	console.log("result", result)
		// 	let channelMessages = channelMessagesMap.get(channelId) ?? []
		// 	if (result.isSuccess && result.data) {
		// 		channelMessages.push(result.data)
		// 	}
		// 	upsertChannelMessageMap(channelId, channelMessages)
		// }
		const handleSetClient = async (chatEngine: ScalableChatEngine) => {
			// bind handler function
			chatEngine.onNewMessage = handleNewMessage
			chatEngine.onNewChannel = handleNewChannel
			chatEngine.onNewChannelMembers = handleNewChannelMembers
			setEngine(chatEngine)
			await syncChannelAndMessages(chatEngine)
		}

		const syncChannelAndMessages = async (_engine: ScalableChatEngine) => {
			setIsSyncing(true)
			try {
				// update currentChatMember
				const currentChatMemberResult = await _engine.getMyChatMember()
				setCurrentChatMember(currentChatMemberResult.data ?? null)

				// update channels
				const channelsResult = await _engine?.getMyChannels()
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
			await syncChannelAndMessages(engine)
		}
		try {
			const defaultContextValue: ScalableChatContextProps = {
				chatEngine: engine,
				setChatEngine: handleSetClient,
				currentChatMember,
				setCurrentChatMember,
				myChannels: myChannels,
				currentMyChannel: currentMyChannel,
				setCurretMyChannel: setCurrentMyChannel,
				channelMessagesMap: channelMessagesMap,
				channelMessageCreateInputMap,
				setChannelMessageCreateInput:
					upsertChannelMessageCreateInputMap,
				sync: handleSync,
				isSyncing: isSyncing,
				// onSendTextMessage: handleChannelSendTextMessage,
				onChannelSendMessage: handleChannelSendMessage,
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
