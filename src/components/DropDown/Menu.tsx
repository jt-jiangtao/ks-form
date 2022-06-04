import React, {ReactNode} from "react";
import classNames from "classnames";
import {nanoid} from "nanoid";

type MenuData = {
    label: React.ReactNode | string,
    key: string | number,
    icon ?: React.ReactNode,
    className?: string,
    style?: Object,
    value ?: string
}

type MenuDivider = {
    type: "divider"
}

export type MenuItem = MenuData | MenuDivider

type MenuProps = {
    onClick: Function,
    items: MenuItem[],
    className ?: string
}

export default function Menu(props: MenuProps) {
    const onclick = (event: any, item: any) => {
        event.stopPropagation()
        props.onClick && props.onClick(event, item)
    }
    const renderMenuItem = () => {
        let menus = [] as ReactNode[]
        props.items.map((item: any, index) => {
            if (item.type === 'divider') {
                menus.push((
                    <div className="divider"/>
                ))
            } else {
                menus.push((
                    <div
                        key={`menu-item-${nanoid(5)}`}
                        onClick={(event) => onclick(event, item)}
                        className="menu-item">
                        {item.icon && <span className="item-icon">{item.icon}</span>}
                        <span className="item-content">{item.label}</span>
                    </div>
                ))
            }
        })
        return menus
    }

    return (
        <div className={classNames("menu-container", props.className)}>
            {renderMenuItem()}
        </div>
    )
}
