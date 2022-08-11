import React, { Fragment } from 'react'
import { PageContainerProps } from './types'

function PageContainer(props:PageContainerProps) {

  return (
    <div
        style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            alignItems:"center",
            height:"100%",
            width:"100%",
            overflow:"hidden",
            boxSizing:"border-box",
            flex:1,
            ...props.style
        }}
    >
        {props.header}

        {
          React.Children.toArray(props.content).map((Content,i)=>{
            return <Fragment key={i}>
              {Content}
            </Fragment>
          })
        }
        {/* {Array.isArray(props.content) ? props.content.map((Content,i)=>{
          return <Content key={i}/>
        }) : props.content} */}
    </div>
  )
}

export default PageContainer