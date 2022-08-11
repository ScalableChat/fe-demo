import { ChannelMember, CMMyChannel } from "@scalablechat/scalable-chat-engine"

export function getOtherChannelMemberInDM(
	myChannel: CMMyChannel,
): ChannelMember | undefined {
	return myChannel.channel.channelMembers.find(
		(e) => e.id !== myChannel.channelMember.id,
	)
}
export const getMyChannelInfo = (myChannel: CMMyChannel) =>{
    let channelPhotoURL = ""
    let channelName = ""
    if(myChannel.channel.isDirect){
        const targetChannelMember = getOtherChannelMemberInDM(myChannel)
        channelPhotoURL = targetChannelMember?.chatMember?.photoURL ?? ""
        channelName = targetChannelMember?.chatMember?.name ?? "DM Anonymous"
    }else{
        channelPhotoURL = myChannel.channel.photoURL ?? ""
        channelName = myChannel.channel.name ?? "New Group"
    }

    return{
        channelPhotoURL,
        channelName
    }
}