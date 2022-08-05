import { Manager, Socket } from "socket.io-client";
import { GraphQLClient } from "graphql-request";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { isBoolean, IsDefinedNotNull, isString } from "./utils";
import {
	ChannelMemberArrayOutput,
	ChannelMemberCreateInput,
	ChannelMessageOutput,
	ChannelMessageType,
} from "./type";
import { getGQLErrorMessages } from "./gqlErrorObject";
import { GQLFunction } from "./gqlFunction";
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

	getChannel(channelId: string): SChannel {
		return new SChannel(this, channelId);
	}
}

class SChannel {
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
			const sendResult = await GQLFunction.cmChannelSendMessage(
				{
					// message: null as any as string,
					message,
					messageType: ChannelMessageType.TEXT,
				},
				this.gqlClient
			);
			return sendResult;
		} catch (error) {
			const errorMessages = getGQLErrorMessages(error)
			throw new Error(
				`${this.sendTextMessage.name} error. \n ${errorMessages.join("\n")}`
			);
		}
	}

    async addNewMembers(channelMemberCreateInputs:ChannelMemberCreateInput[]): Promise<ChannelMemberArrayOutput> {
		try {
			const sendResult = await GQLFunction.cmChannelAddMembers(
				{
					channelMemberCreateInputs,
				},
				this.gqlClient
			);
			return sendResult;
		} catch (error) {
			const errorMessages = getGQLErrorMessages(error)
			throw new Error(
				`${this.addNewMembers.name} error. \n ${errorMessages.join("\n")}`
			);
		}
	}
}
