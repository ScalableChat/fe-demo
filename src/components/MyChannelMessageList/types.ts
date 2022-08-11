import { CMMyChannel } from "@scalablechat/scalable-chat-engine";
import { ChannelMessageMap } from "../../contexts/SocketContext";

export interface MyChannelMessageListProps{
    // currentChatMember:ChatMember
    currentMyChannel:CMMyChannel
    channelMessagesMap:ChannelMessageMap
}