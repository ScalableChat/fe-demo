import { ChannelMember, ChannelMessage } from "@scalablechat/scalable-chat-engine";
import { CSSProperties } from "react";

export interface ChannelMessageListCardProps{
    channelMessage:ChannelMessage
    channelMember:ChannelMember
    isSender?:boolean
    containerStyle?:CSSProperties
}