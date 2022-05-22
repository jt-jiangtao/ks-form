import React, { FC, ReactElement } from 'react'
import {
    CheckCircleFilled, CloseCircleFilled,
    ExclamationCircleFilled
} from "@ant-design/icons";

export type MessageType = 'info' | 'success' | 'error' | 'warning'

export interface MessageProps {
    text: string;
    type: MessageType
}

export const Message: FC<MessageProps> = (props: MessageProps) => {
    const { text, type } = props

    const renderIcon = (messageType: MessageType): ReactElement | JSX.Element=> {

        switch (messageType) {
            case 'success':
                return <CheckCircleFilled style={{color:　"#52c41a"}} />
            case 'error':
                return <CloseCircleFilled style={{color: "#ff4d4f"}} />
            case 'warning':
                return <ExclamationCircleFilled style={{color: "#faad14"}} />
            case 'info':
            default:
                return <ExclamationCircleFilled style={{color: "#1890ff"}} />
        }
    }

    return (
        <div className="message">
            <div className="message-content">
                <div className="message-content-container">
                    <div className="icon">
                        {renderIcon(type)}
                    </div>
                    <div className="text">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    )
}
