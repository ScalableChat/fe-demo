
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum AttachmentTypes {
    PHOTO = "PHOTO",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    LINK = "LINK",
    ICON = "ICON"
}

export enum Locale {
    EN = "EN",
    ZH = "ZH"
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

export enum UserStatus {
    INVITED = "INVITED",
    ACTIVE = "ACTIVE",
    DEACTIVE = "DEACTIVE"
}

export enum EventTokenTypes {
    OTP = "OTP",
    SOCIETY_INVITE_CODE = "SOCIETY_INVITE_CODE"
}

export enum EventTokenStatus {
    ACTIVE = "ACTIVE",
    USED = "USED",
    DEACTIVE = "DEACTIVE"
}

export enum ChatAppEnv {
    PRODUCTION = "PRODUCTION",
    DEVELOPMENT = "DEVELOPMENT"
}

export enum ChannelMemberStatus {
    ACTIVE = "ACTIVE",
    LEFT = "LEFT",
    BANNED = "BANNED"
}

export enum ChannelMemberRole {
    OWNER = "OWNER",
    MODERATOR = "MODERATOR",
    BOT = "BOT",
    MEMBER = "MEMBER"
}

export enum ChannelMessageType {
    TEXT = "TEXT",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    PICTURE = "PICTURE"
}

export enum ChannelMessageStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    DELETED = "DELETED"
}

export enum ChannelStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    ARCHIVED = "ARCHIVED"
}

export interface UserFilterInput {
    userID?: Nullable<string>;
    email?: Nullable<string>;
    firebaseUID?: Nullable<string>;
}

export interface UserArrayFilterInput {
    userIDs?: Nullable<string[]>;
    email?: Nullable<string>;
    roles?: Nullable<UserRole[]>;
    statuses?: Nullable<UserStatus[]>;
    isEnableMFA?: Nullable<boolean>;
}

export interface UserProfileFilterInput {
    userIds?: Nullable<string[]>;
    darkMode?: Nullable<boolean>;
    language?: Nullable<Locale>;
}

export interface EventTokenArrayFilterInput {
    eventTokenIds?: Nullable<string[]>;
    tokenOwnerId?: Nullable<string>;
    event?: Nullable<EventTokenTypes[]>;
    status?: Nullable<EventTokenStatus[]>;
    expireFrom?: Nullable<DateTime>;
    expireTo?: Nullable<DateTime>;
    isValid?: Nullable<boolean>;
}

export interface OrganizationFilterInput {
    pagination?: Nullable<PaginationInput>;
    organizationIds?: Nullable<string[]>;
}

export interface PaginationInput {
    offset?: Nullable<number>;
    page?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface ChatAppFilterInput {
    chatAppIds?: Nullable<string[]>;
    pagination?: Nullable<PaginationInput>;
}

export interface ChatAppTokenFilterInput {
    pagination?: Nullable<PaginationInput>;
    chatAppTokenIds?: Nullable<string[]>;
    chatAppIds?: Nullable<string[]>;
    userIds?: Nullable<string[]>;
}

export interface ChatMemberFilterInput {
    pagination?: Nullable<PaginationInput>;
    chatMemberIds?: Nullable<string[]>;
    chatAppIds?: Nullable<string[]>;
}

export interface ChatMemberTokenFilterInput {
    pagination?: Nullable<PaginationInput>;
    chatMemberTokenIds?: Nullable<string[]>;
    chatAppIds?: Nullable<string[]>;
    chatMemberIds?: Nullable<string[]>;
}

export interface ChannelFilterInput {
    pagination?: Nullable<PaginationInput>;
    channelIds?: Nullable<string[]>;
    chatAppIds?: Nullable<string[]>;
    status?: Nullable<ChannelStatus[]>;
}

export interface ChannelMemberFilterInput {
    pagination?: Nullable<PaginationInput>;
    chatMemberIds?: Nullable<string[]>;
    chatAppIds?: Nullable<string[]>;
    channelIds?: Nullable<string[]>;
}

export interface ChannelMessageFilterInput {
    pagination?: Nullable<PaginationInput>;
    channelMessageIds?: Nullable<string[]>;
    chatAppIds?: Nullable<string[]>;
    channelIds?: Nullable<string[]>;
    channelMemberIds?: Nullable<string[]>;
    chatMemberIds?: Nullable<string[]>;
    messageTypes?: Nullable<ChannelMessageType[]>;
    fromTime?: Nullable<DateTime>;
    toTime?: Nullable<DateTime>;
}

export interface CMMyChannelsMessagesFilterInput {
    pagination?: Nullable<PaginationInput>;
    channelIds: string[];
    messageTypes?: Nullable<ChannelMessageType[]>;
    fromTime?: Nullable<DateTime>;
    toTime?: Nullable<DateTime>;
}

export interface FirebaseUserRegisterInput {
    firebaseToken: string;
}

export interface FirebaseUserLoginInput {
    firebaseToken: string;
}

export interface MFAOTPCreateInput {
    email: string;
}

export interface UMFirebaseEmailPasswordUserCreateInput {
    email: string;
    password: string;
    emailVerified?: Nullable<boolean>;
    roles: UserRole[];
    status: UserStatus;
}

export interface UserProfileUpdateInput {
    userId: string;
    nickname?: Nullable<string>;
    profilePic?: Nullable<PhotoAttachmentCreateInput>;
    isClearProfilePic?: Nullable<boolean>;
    darkMode?: Nullable<boolean>;
    language?: Nullable<Locale>;
}

export interface PhotoAttachmentCreateInput {
    attachmentFileType: AttachmentTypes;
    size: number;
    fileURL: string;
    fileName: string;
    filePath: string;
    contentType: string;
    originalFileName: string;
}

export interface ChatAppCreateInput {
    organizationId: string;
    name: string;
    chatDataRegion: string;
    chatAppEnv: ChatAppEnv;
}

export interface ChatAppUpdateInput {
    chatAppId: string;
    name?: Nullable<string>;
    chatAppEnv?: Nullable<ChatAppEnv>;
}

export interface OrganizationCreateInput {
    name: string;
}

export interface ChatAppTokenCreateInput {
    chatAppId: string;
}

export interface ChatMemberCreateInput {
    chatAppId: string;
    name: string;
    photoURL?: Nullable<string>;
}

export interface ChatMemberTokenCreateInput {
    chatAppId: string;
    chatMemberId: string;
}

export interface ChannelCreateInput {
    name?: Nullable<string>;
    photoURL?: Nullable<string>;
    description?: Nullable<string>;
    isDirect?: Nullable<boolean>;
}

export interface CMChannelAddMembersInput {
    channelMemberCreateInputs: ChannelMemberCreateInput[];
}

export interface ChannelMemberCreateInput {
    chatMemberId: string;
    roles: ChannelMemberRole[];
}

export interface ChannelMessageCreateInput {
    messageType: ChannelMessageType;
    message: string;
    url?: Nullable<string>;
}

export interface CMGroupChannelCreateInput {
    chatMemberIds: string[];
    name?: Nullable<string>;
    photoURL?: Nullable<string>;
    description?: Nullable<string>;
}

export interface CMPeerChannelCreateInput {
    chatMemberId: string;
}

export interface ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
}

export interface AttachmentGQLType {
    attachmentFileType: AttachmentTypes;
}

export interface Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface PaginationOutput {
    count: number;
    page: number;
    totalPages: number;
    offset: number;
    limit: number;
}

export interface DefaultResponseFormatOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
}

export interface PhotoAttachment extends AttachmentGQLType {
    attachmentFileType: AttachmentTypes;
    size: number;
    fileURL: string;
    fileName: string;
    filePath: string;
    contentType: string;
    originalFileName: string;
}

export interface UserProfile {
    userId?: Nullable<string>;
    nickname?: Nullable<string>;
    profilePic?: Nullable<PhotoAttachment>;
    darkMode: boolean;
    language?: Nullable<Locale>;
    emailVerified: boolean;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface UserProfileOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserProfile>;
}

export interface UserProfileArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserProfile[]>;
}

export interface AuthFirebaseLoginOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<string>;
}

export interface User {
    id: string;
    email: string;
    firebaseUID: string;
    roles: UserRole[];
    userProfile?: Nullable<UserProfile>;
    mfaSecret?: Nullable<string>;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface AuthFirebaseRegisterOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<User>;
}

export interface UserSafe {
    id: string;
    email: string;
    firebaseUID: string;
    roles: UserRole[];
    status: UserStatus;
    userProfile?: Nullable<UserProfile>;
    createAt: DateTime;
    updateAt: DateTime;
}

export interface EventToken {
    id: string;
    token: string;
    tokenOwnerId: string;
    event: EventTokenTypes;
    status: EventTokenStatus;
    createAt: DateTime;
    updateAt: DateTime;
    expireAt?: Nullable<DateTime>;
}

export interface EventTokenOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventToken>;
}

export interface EventTokenArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventToken[]>;
}

export interface AuthTokenRefreshOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<string>;
}

export interface UserSafeOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserSafe>;
}

export interface UserSafeArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserSafe[]>;
}

export interface ChatMember extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    chatAppId: string;
    name: string;
    photoURL?: Nullable<string>;
}

export interface ChatApp extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    organizationId: string;
    name: string;
    chatDataRegion: string;
    chatAppEnv: ChatAppEnv;
    chatMembers: ChatMember[];
}

export interface ChatAppOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatApp>;
}

export interface ChatAppArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatApp[]>;
}

export interface ChannelMember extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    chatAppId: string;
    channelId: string;
    chatMemberId: string;
    chatMember: ChatMember;
    status: ChannelMemberStatus;
    roles: ChannelMemberRole[];
}

export interface ChannelMemberOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChannelMember>;
}

export interface ChannelMemberArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChannelMember[]>;
}

export interface ChannelMessage extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    chatAppId: string;
    channelId: string;
    chatMemberId: string;
    chatMember: ChatMember;
    channelMemberId: string;
    channelMember: ChannelMember;
    messageType: ChannelMessageType;
    message?: Nullable<string>;
    url?: Nullable<string>;
    status: ChannelMessageStatus;
}

export interface ChannelMessageOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChannelMessage>;
}

export interface ChannelMessageArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChannelMessage[]>;
}

export interface Channel extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    chatAppId: string;
    name?: Nullable<string>;
    photoURL?: Nullable<string>;
    description?: Nullable<string>;
    status: ChannelStatus;
    isDirect: boolean;
    channelMembers: ChannelMember[];
}

export interface ChannelOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<Channel>;
}

export interface ChannelArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<Channel[]>;
}

export interface ChatAppToken extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    chatAppId: string;
    key: string;
    secret: string;
    userId: string;
}

export interface ChatAppTokenOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatAppToken>;
}

export interface ChatAppTokenArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatAppToken[]>;
}

export interface ChatMemberToken extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    chatAppId: string;
    token: string;
    chatMemberId: string;
}

export interface ChatMemberTokenOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatMemberToken>;
}

export interface ChatMemberTokenArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatMemberToken[]>;
}

export interface ChatMemberTokenVerifyOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data: boolean;
}

export interface ChatMemberOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatMember>;
}

export interface ChatMemberArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<ChatMember[]>;
}

export interface Organization extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    name: string;
}

export interface OrganizationOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<Organization>;
}

export interface OrganizationArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<Organization[]>;
}

export interface CMMyChannel {
    channel: Channel;
    channelMember: ChannelMember;
}

export interface CMMyChannelArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<CMMyChannel[]>;
}

export interface IQuery {
    me(): UserSafe | Promise<UserSafe>;
    userGet(userFilterInput: UserFilterInput): Nullable<UserSafeOutput> | Promise<Nullable<UserSafeOutput>>;
    usersGet(userArrayFilterInput?: Nullable<UserArrayFilterInput>): Nullable<UserSafeArrayOutput> | Promise<Nullable<UserSafeArrayOutput>>;
    userProfilesGet(userProfileFilterInput?: Nullable<UserProfileFilterInput>): UserProfileArrayOutput | Promise<UserProfileArrayOutput>;
    userProfileGet(userId: string): Nullable<UserProfileOutput> | Promise<Nullable<UserProfileOutput>>;
    eventTokensGet(eventTokenArrayFilterInput?: Nullable<EventTokenArrayFilterInput>): EventTokenArrayOutput | Promise<EventTokenArrayOutput>;
    eventTokenGet(id: string): Nullable<EventTokenOutput> | Promise<Nullable<EventTokenOutput>>;
    umUserGets(userArrayFilterInput?: Nullable<UserArrayFilterInput>): UserSafeArrayOutput | Promise<UserSafeArrayOutput>;
    organizationsGet(organizationFilterInput?: Nullable<OrganizationFilterInput>): OrganizationArrayOutput | Promise<OrganizationArrayOutput>;
    organizationGet(id: string): Nullable<OrganizationOutput> | Promise<Nullable<OrganizationOutput>>;
    chatAppsGet(chatAppFilterInput?: Nullable<ChatAppFilterInput>): ChatAppArrayOutput | Promise<ChatAppArrayOutput>;
    chatAppGet(id: string): Nullable<ChatAppOutput> | Promise<Nullable<ChatAppOutput>>;
    chatAppTokensGet(chatAppTokenFilterInput?: Nullable<ChatAppTokenFilterInput>): ChatAppTokenArrayOutput | Promise<ChatAppTokenArrayOutput>;
    chatAppTokenGet(id: string): Nullable<ChatAppTokenOutput> | Promise<Nullable<ChatAppTokenOutput>>;
    chatMembersGet(chatMemberFilterInput?: Nullable<ChatMemberFilterInput>): ChatMemberArrayOutput | Promise<ChatMemberArrayOutput>;
    chatMemberGet(id: string): Nullable<ChatMemberOutput> | Promise<Nullable<ChatMemberOutput>>;
    chatMemberTokenVerify(token: string): Nullable<ChatMemberTokenVerifyOutput> | Promise<Nullable<ChatMemberTokenVerifyOutput>>;
    chatMemberTokensGet(chatMemberTokenFilterInput?: Nullable<ChatMemberTokenFilterInput>): ChatMemberTokenArrayOutput | Promise<ChatMemberTokenArrayOutput>;
    chatMemberTokenGet(id: string): Nullable<ChatMemberTokenOutput> | Promise<Nullable<ChatMemberTokenOutput>>;
    channelsGet(channelFilterInput?: Nullable<ChannelFilterInput>): ChannelArrayOutput | Promise<ChannelArrayOutput>;
    channelGet(id: string): Nullable<ChannelOutput> | Promise<Nullable<ChannelOutput>>;
    channelMembersGet(channelMemberFilterInput?: Nullable<ChannelMemberFilterInput>): ChannelMemberArrayOutput | Promise<ChannelMemberArrayOutput>;
    channelMemberGet(id: string): Nullable<ChannelMemberOutput> | Promise<Nullable<ChannelMemberOutput>>;
    channelMessagesGet(channelMessageFilterInput?: Nullable<ChannelMessageFilterInput>): ChannelMessageArrayOutput | Promise<ChannelMessageArrayOutput>;
    channelMessageGet(id: string): Nullable<ChannelMessageOutput> | Promise<Nullable<ChannelMessageOutput>>;
    chatAppsGet1(chatAppFilterInput?: Nullable<ChatAppFilterInput>): ChatAppArrayOutput | Promise<ChatAppArrayOutput>;
    chatAppsGet2(chatAppFilterInput?: Nullable<ChatAppFilterInput>): ChatAppArrayOutput | Promise<ChatAppArrayOutput>;
    cmMyChannels(): CMMyChannelArrayOutput | Promise<CMMyChannelArrayOutput>;
    cmMyChannelsMessages(cmMyChannelsMessagesFilterInput: CMMyChannelsMessagesFilterInput): ChannelMessageArrayOutput | Promise<ChannelMessageArrayOutput>;
}

export interface IMutation {
    firebaseUserRegister(firebaseUserRegisterInput: FirebaseUserRegisterInput): AuthFirebaseRegisterOutput | Promise<AuthFirebaseRegisterOutput>;
    firebaseUserLogin(firebaseUserLoginInput: FirebaseUserLoginInput): AuthFirebaseLoginOutput | Promise<AuthFirebaseLoginOutput>;
    tokenRefresh(): AuthTokenRefreshOutput | Promise<AuthTokenRefreshOutput>;
    devUserLogin(email: string): AuthFirebaseLoginOutput | Promise<AuthFirebaseLoginOutput>;
    mfaOTPCreate(mfaOTPCreateInput: MFAOTPCreateInput): EventTokenOutput | Promise<EventTokenOutput>;
    mfaOTPVerify(otpToken: string, otpId: string): DefaultResponseFormatOutput | Promise<DefaultResponseFormatOutput>;
    mfaOTPVerifyInHeader(): DefaultResponseFormatOutput | Promise<DefaultResponseFormatOutput>;
    umFirebaseEmailPasswordUserCreate(umFirebaseEmailPasswordUserCreateInput: UMFirebaseEmailPasswordUserCreateInput): UserSafeOutput | Promise<UserSafeOutput>;
    umUserProfileUpdate(umUserProfileUpdateInput: UserProfileUpdateInput): UserProfileOutput | Promise<UserProfileOutput>;
    umUserDeleteById(userId: string): UserSafeOutput | Promise<UserSafeOutput>;
    umDevFirebaseEmailPasswordUserCreate(umFirebaseEmailPasswordUserCreateInput: UMFirebaseEmailPasswordUserCreateInput): UserSafeOutput | Promise<UserSafeOutput>;
    userProfileUpdateByUser(userProfileUpdateInput: UserProfileUpdateInput): UserProfileOutput | Promise<UserProfileOutput>;
    camChatAppCreate(chatAppCreateInput: ChatAppCreateInput): ChatAppOutput | Promise<ChatAppOutput>;
    camChatAppUpdate(chatAppUpdateInput: ChatAppUpdateInput): ChatAppOutput | Promise<ChatAppOutput>;
    camChatAppDeleteById(chatAppId: string): ChatAppOutput | Promise<ChatAppOutput>;
    organizationCreate(organizationCreateInput?: Nullable<OrganizationCreateInput>): OrganizationOutput | Promise<OrganizationOutput>;
    organizationDeleteById(id: string): OrganizationOutput | Promise<OrganizationOutput>;
    chatAppTokenCreate(chatAppTokenCreateInput?: Nullable<ChatAppTokenCreateInput>): ChatAppTokenOutput | Promise<ChatAppTokenOutput>;
    chatAppTokenDeleteById(id: string): ChatAppTokenOutput | Promise<ChatAppTokenOutput>;
    chatMemberCreate(chatMemberCreateInput?: Nullable<ChatMemberCreateInput>): ChatMemberOutput | Promise<ChatMemberOutput>;
    chatMemberDeleteById(id: string): ChatMemberOutput | Promise<ChatMemberOutput>;
    chatMemberTokenCreate(chatMemberTokenCreateInput?: Nullable<ChatMemberTokenCreateInput>): ChatMemberTokenOutput | Promise<ChatMemberTokenOutput>;
    chatMemberTokenDeleteById(id: string): ChatMemberTokenOutput | Promise<ChatMemberTokenOutput>;
    channelCreate(channelCreateInput?: Nullable<ChannelCreateInput>): ChannelOutput | Promise<ChannelOutput>;
    channelDeleteById(id: string): ChannelOutput | Promise<ChannelOutput>;
    cmChannelAddMembers(cmChannelAddMembersInput: CMChannelAddMembersInput): ChannelMemberArrayOutput | Promise<ChannelMemberArrayOutput>;
    cmChannelSendMessage(channelMessageCreateInput: ChannelMessageCreateInput): ChannelMessageOutput | Promise<ChannelMessageOutput>;
    cmGroupChannelGetOrCreate(cmGroupChannelCreateInput: CMGroupChannelCreateInput): ChannelOutput | Promise<ChannelOutput>;
    cmPeerChannelGetOrCreate(cmPeerChannelCreateInput: CMPeerChannelCreateInput): ChannelOutput | Promise<ChannelOutput>;
}

export type DateTime = any;
type Nullable<T> = T | null;
