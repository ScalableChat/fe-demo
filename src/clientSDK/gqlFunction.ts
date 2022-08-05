import { GraphQLClient, gql } from "graphql-request";
import { ChannelMessageCreateInput, ChannelMessageOutput, CMChannelAddMembersInput, ChannelMemberArrayOutput } from "./type";

export abstract class GQLFunction {
	static async cmChannelSendMessage(
		channelMessageCreateInput: ChannelMessageCreateInput,
		client: GraphQLClient
	): Promise<ChannelMessageOutput> {
		const mutation = gql`
			mutation cmChannelSendMessage(
				$channelMessageCreateInput: ChannelMessageCreateInput!
			) {
				cmChannelSendMessage(
					channelMessageCreateInput: $channelMessageCreateInput
				) {
					isSuccess
					code
					errorMessage
					data {
						id
						channelId
						message
						messageType
						url
					}
				}
			}
		`;
		const variables = {
			channelMessageCreateInput,
		};
		const data = await client.request<
			{
				cmChannelSendMessage: ChannelMessageOutput;
			},
			{
				channelMessageCreateInput: ChannelMessageCreateInput;
			}
		>(mutation, variables);
		return data.cmChannelSendMessage;
	}
	static async cmChannelAddMembers(
		cmChannelAddMembersInput: CMChannelAddMembersInput,
		client: GraphQLClient
	): Promise<ChannelMemberArrayOutput> {
		const mutation = gql`
			mutation cmChannelAddMembers(
				$cmChannelAddMembersInput: CMChannelAddMembersInput!
			) {
				cmChannelAddMembers(
					cmChannelAddMembersInput: $cmChannelAddMembersInput
				) {
					isSuccess
					code
					errorMessage
					data {
						id
						channelId
						message
						messageType
						url
					}
				}
			}
		`;
		const variables = {
			cmChannelAddMembersInput,
		};
		const data = await client.request<
			{
				cmChannelAddMembers: ChannelMemberArrayOutput;
			},
			{
				cmChannelAddMembersInput: CMChannelAddMembersInput;
			}
		>(mutation, variables);
		return data.cmChannelAddMembers;
	}
}
