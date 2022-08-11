import { CSSProperties, ReactElement } from "react";

export interface PageContainerProps{
    style?:CSSProperties
    header?:ReactElement
    content?:ReactElement | ReactElement[]
}