import { ChannelMember, CMMyChannel } from "@scalablechat/scalable-chat-engine"
import React from "react"
import { ImageAsset } from "../../assets/images"
import { ChannelListCardProps } from "./types"

function getOtherChannelMemberInDM(
	myChannel: CMMyChannel,
): ChannelMember | undefined {
	return myChannel.channel.channelMembers.find(
		(e) => e.id !== myChannel.channelMember.id,
	)
}
// const getChannelName = (myChannel: CMMyChannel) => {
// 	if (myChannel.channel.isDirect) {
// 		return myChannel.channel.name ?? "New Channel"
// 	} else {
// 		const targetChannelMember = getOtherChannelMemberInDM(myChannel)
// 		if (targetChannelMember) {
// 			targetChannelMember.chatMember?.name ?? "DM Anonymous"
// 		} else {
// 			return "DM"
// 		}
// 	}
// }
const Avatar =({photoURL}:{photoURL: string}):JSX.Element =>{
    let finalURL = ImageAsset.avatar_default
    if(photoURL && photoURL !== null){
        finalURL = photoURL
    }
    return(
        <img src={finalURL} alt="avatar" style={{
            verticalAlign:"middle",
            width:"50px",
            height:"50px",
            borderRadius:"50%",
        }}/>
    )
}

function ChannelListCard(props: ChannelListCardProps) {
	const { myChannel, isSelected, onClick } = props
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

	return (
		<div
        onDoubleClick={() => {
            onClick && onClick(myChannel)
        }}
			// onClick={}
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                backgroundColor: isSelected ? "lightgrey" : undefined
            }}
		>
            {/* Left Avatar */}
            <div>
                <Avatar photoURL={channelPhotoURL}/>
            </div>

            {/* Right */}
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-start",
                }}
            >
                {/* Right upper */}
                <div>
                    <span>{channelName}</span>
                </div>
                <div>
                    <span>last message:.......</span>
                </div>
            </div>
			
		</div>
	)
}

export default ChannelListCard
