import {  CSSProperties, ReactNode } from "react";

export interface PageContainerProps{
    style?:CSSProperties
    header?: ReactNode
    content?:ReactNode | ReactNode[]
}