import {useEffect, useState} from "react";
import {Message, MessageType} from "@/components/Message/message";
import {createRoot} from "react-dom/client";

export interface MessageApi {
    info: (text: string, duration ?: number) => void;
    success: (text: string, duration ?: number) => void;
    warning: (text: string,  duration ?: number) => void;
    error: (text: string,  duration ?: number) => void;
}

export interface Notice {
    text: string;
    key: string;
    type: MessageType;
    duration: number
}

let seed = 0
const getUuid = (): string => {
    const id = seed
    seed += 1
    return `MESSAGE_${id}`
}

let add: (notice: Notice) => void
export const MessageContainer = () => {
    const [notices, setNotices] = useState<Notice[]>([])
    const maxCount = 10

    const remove = (notice: Notice) => {
        const { key } = notice

        setNotices((prevNotices) => (
            prevNotices.filter(({ key: itemKey }) => key !== itemKey)
        ))
    }

    add = (notice: Notice) => {
        setNotices((prevNotices) => [...prevNotices, notice])
        setTimeout(() => {
            remove(notice)
        }, notice.duration)
    }

    useEffect(() => {
        if (notices.length > maxCount) {
            const [firstNotice] = notices
            remove(firstNotice)
        }
    }, [notices])

    return (
        <div className="message-container">
            {
                notices.map(({ text, key, type }) => (
                    <Message key={key} type={type} text={text} />
                ))
            }
        </div>
    )
}

const message: MessageApi = (function (){
    let el = document.querySelector('#message-wrapper')
    if (!el) {
        el = document.createElement('div')
        el.className = 'message-wrapper'
        el.id = 'message-wrapper'
        document.body.append(el)
        let root = createRoot(el)
        root.render(<MessageContainer />)
    }

    return {
        info: (text, duration= 3000) => {
            add({
                text,
                key: getUuid(),
                type: 'info',
                duration
            })
        },
        success: (text, duration= 3000) => {
            add({
                text,
                key: getUuid(),
                type: 'success',
                duration
            })
        },
        warning: (text, duration= 3000) => {
            add({
                text,
                key: getUuid(),
                type: 'warning',
                duration
            })
        },
        error: (text, duration = 3000) => {
            add({
                text,
                key: getUuid(),
                type: 'error',
                duration
            })
        }
    }
})()

export default message
