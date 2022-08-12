import React, { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { ChannelOrMessageSearchBarProps } from "./types"

function ChannelOrMessageSearchBar(props:ChannelOrMessageSearchBarProps) {
    const {onSearch, inputWaitMiliSeconds = 2000} = props
	const [searchInput, setSearchInput] = useState("")
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            searchInput !== "" && onSearch && await onSearch(searchInput)
          // Send Axios request here
        }, inputWaitMiliSeconds)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchInput])
      
	return (
		<div
            style={{
                width:"100%",
                minWidth:"250px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"flex-start",
                alignItems:"center",
                padding:"6px",
                boxSizing:"border-box",
            }}
        >
			<AiOutlineSearch />
			<input
                style={{
                    flex:1,
                }}
				value={searchInput}
				type={"search"}
				onChange={(e) => setSearchInput(e.currentTarget.value)}
			/>
		</div>
	)
}

export default ChannelOrMessageSearchBar
