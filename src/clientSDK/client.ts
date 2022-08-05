import { Manager, Socket } from "socket.io-client";
import { request, gql, GraphQLClient } from "graphql-request";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { isBoolean, IsDefinedNotNull, isString } from "./utils";
import {
	ChannelMessageCreateInput,
	ChannelMessageOutput,
	ChannelMessageType,
} from "./type";
export enum LogLevel {
	PRODUCTION = 9,
	LOG = 1,
	DEBUG = 0,
}
export type ScalableChatEngineOptions = {
	isBrowser?: boolean; //for persistence purpose only
	wsURL?: string;
	baseURL?: string;
	gqlURL?: string;
	logLevel?: number;
};

// const defaultScalableChatEngineOptions:ScalableChatEngineOptions={
//     wsURL:"",
//     baseURL:"",
//     gqlURL:"",
//     logLevel:0
// }

export class ScalableChatEngine {
	private static _instance?: ScalableChatEngine;
	protected socketManager?: Manager;
	protected chatSocket?: Socket;
	protected gqlClient: GraphQLClient;
	options: ScalableChatEngineOptions;
	key: string;
	secret?: string;
	chatAppId?: string;
	chatMemberId?: string;
	isBrowser: boolean;
	isNode: boolean;
	axiosInstance: AxiosInstance;
	// baseURL?:string = "asd"
	// wsURL?:string = "asd"
	// gqlURL?:string = "asd"

	private constructor(key: string, options?: ScalableChatEngineOptions);
	private constructor(
		key: string,
		secret?: string,
		options?: ScalableChatEngineOptions
	);
	private constructor(
		key: string,
		secretOrOptions?: ScalableChatEngineOptions | string,
		options?: ScalableChatEngineOptions
	) {
		this.key = key;
		// mute channel
		// mute user

		if (secretOrOptions && isString(secretOrOptions)) {
			this.secret = secretOrOptions;
		}

		const inputOptions = options
			? options
			: secretOrOptions && !isString(secretOrOptions)
			? secretOrOptions
			: {};
		this.isBrowser = isBoolean(inputOptions?.isBrowser)
			? inputOptions?.isBrowser
			: typeof window !== undefined;
		this.isNode = !this.isBrowser;
		this.options = {
			...inputOptions,
		};

		const axiosConfig: AxiosRequestConfig = {
			timeout: 3000,
			withCredentials: false,
			baseURL: inputOptions.baseURL,
		};
		this.axiosInstance = axios.create(axiosConfig);

		this.gqlClient = new GraphQLClient(this.options.gqlURL!);
		this.gqlClient.setHeader("authorization", this.getAuthToken());
	}

	public static getInstance(
		key: string,
		options?: ScalableChatEngineOptions
	): ScalableChatEngine;
	public static getInstance(
		key: string,
		secret?: string,
		options?: ScalableChatEngineOptions
	): ScalableChatEngine;
	public static getInstance(
		key: string,
		secretOrOptions?: ScalableChatEngineOptions | string,
		options?: ScalableChatEngineOptions
	): ScalableChatEngine {
		if (!ScalableChatEngine._instance) {
			if (isString(secretOrOptions)) {
				// is secret, in server side
				ScalableChatEngine._instance = new ScalableChatEngine(
					key,
					secretOrOptions,
					options
				);
			} else {
				ScalableChatEngine._instance = new ScalableChatEngine(
					key,
					secretOrOptions
				);
			}
		}
		return ScalableChatEngine._instance as ScalableChatEngine;
	}

	getAuthToken() {
		return `Bearer ${this.key}`;
	}

	getChannel(channelId: string): Channel {
		return new Channel(this, channelId);
	}
	// public Channel = new class{
	//     private gqlClient:GraphQLClient
	//     protected channelId:string
	//     constructor(public superThis:ScalableChatEngine, channelId:string){
	//         this.channelId = channelId
	//         this.gqlClient = new GraphQLClient(this.)
	//     }
	//     sendMessage(){

	//     }
	// }(this)

	// public utilities = new class {
	//     constructor(public superThis: classX) {
	//     }
	//     public testSetOuterPrivate(target: number) {
	//         this.superThis.y = target;
	//     }
	// }(this);
}

interface GQLErrorObject {
	response: {
		errors: {
			extensions: {
				code: string;
			};
			message: string;
		}[];
		status: number;
	};
}
class Channel {
	private gqlClient: GraphQLClient;
	readonly channelId: string;
	constructor(public parent: ScalableChatEngine, channelId: string) {
		this.channelId = channelId;
		this.gqlClient = new GraphQLClient(parent.options.gqlURL!);
		this.gqlClient.setHeader("authorization", parent.getAuthToken());
		this.gqlClient.setHeader("channelId", this.channelId);
	}
	async sendTextMessage(message: string): Promise<ChannelMessageOutput> {
		try {
			const sendResult = await this.cmChannelSendMessage({
				// message: null as any as string,
				message,
				messageType: ChannelMessageType.TEXT,
			});
			return sendResult;
		} catch (error) {
			const finalError = error as GQLErrorObject;
			const errorMessages = finalError.response.errors.map(
				(e) => e.message
			);
			throw new Error(
				`sendTextMessage error. \n ${errorMessages.join("\n")}`
			);
		}
	}
	private async cmChannelSendMessage(
		channelMessageCreateInput: ChannelMessageCreateInput
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
		const data = await this.gqlClient.request<
			{
				cmChannelSendMessage: ChannelMessageOutput;
			},
			{
				channelMessageCreateInput: ChannelMessageCreateInput;
			}
		>(mutation, variables);
		return data.cmChannelSendMessage;
	}
}
