import { ChannelMessageCreateInput, CMMyChannel } from "@scalablechat/scalable-chat-engine";
import { ChannelMessageCreateInputMap } from "../../contexts/SocketContext";

export interface ChannelMessageInputBoxProps{
    currentMyChannel:CMMyChannel
    channelMessageCreateInputMap:ChannelMessageCreateInputMap
    onUpdate:(input:ChannelMessageCreateInput)=>void
    onSendChannelMessage:(channelId:string)=>Promise<void>
}