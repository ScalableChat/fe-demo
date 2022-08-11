import { CMMyChannel } from "@scalablechat/scalable-chat-engine"

export interface ChannelListCardProps{
    myChannel:CMMyChannel
    isSelected?:boolean
    onClick?:(myChannel:CMMyChannel)=>void
}