import { Manager, Socket, SocketOptions } from "socket.io-client";
import { GraphQLClient } from "graphql-request";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { isBoolean, IsDefinedNotNull, isString } from "./utils";
import {
	ChannelMemberArrayOutput,
	ChannelMemberCreateInput,
	ChannelMessageOutput,
	ChannelMessageType,
	ChannelOutput,
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
	
	// hooks
	onNewMessage?:(message:ChannelMessageOutput)=>Promise<void>
	onNewChannel?:(channel:ChannelOutput)=>Promise<void>

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
			// apply default value and override if provided
			logLevel:LogLevel.PRODUCTION,
			baseURL:"http://localhost:7100",
			gqlURL:"http://localhost:7100/graphql",
			wsURL:'http://localhost:3100',
			...inputOptions,
		};

		// Check options
		if(!IsDefinedNotNull(this.options.baseURL)){
			throw new Error("baseURL cannot be null")
		}
		if(!IsDefinedNotNull(this.options.wsURL)){
			throw new Error("wsURL cannot be null")
		}
		if(!IsDefinedNotNull(this.options.gqlURL)){
			throw new Error("gqlURL cannot be null")
		}

		// init Axios
		const axiosConfig: AxiosRequestConfig = {
			timeout: 3000,
			withCredentials: false,
			baseURL: this.options.baseURL,
		};
		this.axiosInstance = axios.create(axiosConfig);

		// Init GQL client
		this.gqlClient = new GraphQLClient(this.options.gqlURL!);
		this.gqlClient.setHeader("authorization", this.getAuthToken());

		// Init socket Manager
		const transports = ['websocket'];
		this.socketManager = new Manager(this.options.wsURL, {
			reconnectionDelayMax: 10000,
			transports: transports,
		});
		this._applySocketManagerEventHandler(this.socketManager);
		this.chatSocket = this._getNamespaceSocket({
			namespace: '/chat',
			socketOptions: {
				auth: {
					jwt: this.key,
				},
			},
		});
		this._applySocketEventHandler(this.chatSocket);
		
		this.options.logLevel! <= LogLevel.LOG && console.log(`${ScalableChatEngine.name} Initialized`)
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

	private _checkSocketManager(){
        
        if(!this.socketManager){
            throw new Error('SocketManager Not Initialized');
        }
    }

    private _checkChatSocket(){
        
        if(!this.chatSocket){
            throw new Error('Socket Not Initialized');
        }
    }

	private _applySocketManagerEventHandler(socketManager: Manager) {
        this._checkSocketManager()
		socketManager.on('open', () => {
			this.options.logLevel!! <= LogLevel.LOG && console.log('Manager connect');
		});
		socketManager.on('close', (reason) => {
			this.options.logLevel! <= LogLevel.LOG &&
				console.log('Manager close', reason);
		});
		socketManager.on('packet', (packet) => {
			if(this.options.logLevel! <= LogLevel.DEBUG){
				console.group('Manager packet')
				console.dir(packet, { depth: null })
				console.groupEnd()
			}
		});
		socketManager.on('ping', () => {
			this.options.logLevel! <= LogLevel.DEBUG && console.log('Manager ping');
		});
		socketManager.on('reconnect', (attempt) => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.log('Manager Reconnect success: ', attempt);
		});
		socketManager.on('reconnect_attempt', (attempt) => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.log('Manager Reconnect attempt: ', attempt);
		});
		socketManager.on('reconnect_error', (err) => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.error('Manager Reconnect err: ', err);
		});
		socketManager.on('reconnect_failed', () => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.error('Manager Reconnect failed');
		});
	}

	private _getNamespaceSocket = (props: {
		namespace: string;
		socketOptions: Partial<SocketOptions>;
	}) => {
        this._checkSocketManager()
		const { namespace = '/', socketOptions } = props;
		try {
			const socket = this.socketManager!.socket(namespace, socketOptions);
			
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.log(`socket create namespace ${namespace} success`);
			return socket;
		} catch (error) {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.error(
					`getSocket error, ns: ${namespace}, socketOptions: ${JSON.stringify(
						socketOptions,
					)}`,
				);
			throw new Error('Failed to get socket from socket manager');
		}
	};

	private _applySocketEventHandler(socket: Socket) {
		this._checkChatSocket()
		socket.on('connect', () => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.log(`Socket connected`);
		});

		socket.on('disconnect', (reason) => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.log(`Socket disconnect due to ${reason}`);
		});

		socket.on('connect_error', (error) => {
			this.options.logLevel! <= LogLevel.DEBUG &&
				console.error('Socket Connect err: ', error);
		});
		
		socket.onAny((event,data)=>{
			this.socketEventHandler(event, data)
		})
	}

	private socketEventHandler = (event:string, data:string) =>{

		switch(event){

			default:
				console.group("Drop Socket Event")
				console.log("event", event)
				console.log("data", data)
				console.groupEnd()
		}
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
