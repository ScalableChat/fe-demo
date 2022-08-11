import { CMMyChannel } from "@scalablechat/scalable-chat-engine";

export interface ChannelHeaderProps{
    onClick?:(myChannel:CMMyChannel)=>void
    myChannel:CMMyChannel
}