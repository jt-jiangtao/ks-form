import React, {createRef, useEffect, useState} from "react";
import classNames from "classnames";

type DropDownProps = {
    trigger: "click" | "hover",
    overlay: React.ReactNode,
    children: React.ReactNode,
    style?: Object,
    className?: string,
    pullable ?: boolean
}

export default function DropDown(props: DropDownProps) {
    const {pullable = true} = props
    let [open, setOpen] = useState(false)
    const dropdownRef = createRef<HTMLDivElement>()
    const clickHandler = (event: any) => {
        // event.stopPropagation()
        pullable && props.trigger === 'click' && setOpen(!open)
    }

    const hidden = () => {
        setOpen(false)
    }

    useEffect(() => {
        document.addEventListener('click', hidden)
        dropdownRef.current?.addEventListener('click', hidden)
    }, [props])

    return (
        <div
            onMouseMove={() => props.trigger === 'hover' && setOpen(true)}
            onMouseLeave={() => props.trigger === 'hover' && setOpen(false)}
            style={props.style} className={classNames("dropdown-container", props.className)}>
            <div
                onClick={clickHandler}
                className="ele">{props.children}</div>
            <div
                ref={dropdownRef}
                className={classNames("menu", {
                    "menu-hidden": !open
                })}>{props.overlay}</div>
        </div>
    )
}
