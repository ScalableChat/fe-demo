export interface ChannelOrMessageSearchBarProps{
    onSearch?:(searchInput:string)=>Promise<void>
    inputWaitMiliSeconds?:number
}