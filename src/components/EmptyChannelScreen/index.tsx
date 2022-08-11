import React from "react"
import { ImageAsset } from "../../assets/images"
import PageContainer from "../../components-ui/PageContainer"

function EmptyChannelScreen() {
	return (
		<PageContainer
			content={[
				<img src={ImageAsset.avatar_default} alt="icon" />,
				<span>EmptyChannelScreen</span>,
			]}
		/>
	)
}

export default EmptyChannelScreen
