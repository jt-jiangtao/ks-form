import React from "react";
import classNames from "classnames";
import './index.scss'

type ModuleProps = {
    focus : boolean,
    children: JSX.Element | React.ReactNode,
    tools ?: JSX.Element,
    title ?: JSX.Element | string,
    titleShow ?: boolean,
    draggable ?: boolean,
    dataRequired : boolean
}


export default function Module(props : ModuleProps){
    const renderTitle = ()=>{
        return typeof props.title === 'string' ?
            <div className='module__title--string'>{props.title}</div> :
            <div className='module__title--component'>{props.title}</div>
    }

    const clickHandler = (event : any) => {
      event.stopPropagation()
    }

    return (
        <div
            onClick={clickHandler}
            className={classNames('module', {
                'module--focus': props.focus,
                'module--not-focus': !props.focus
            })}
        >
            <div
                style={{
                    display: props.titleShow ? '' : 'none'
                }}
                className="module__title">
                {renderTitle()}
            </div>
            {props.draggable && <div className='module__draggable'/>}
            <span className={classNames("required", {
                "required-show": props.dataRequired
            })}>*</span>
            {props.children}
            <div className="module__tools">
                {props.tools}
            </div>
        </div>
    )
}

Module.defaultProps = {
    focus:　false,
    title: '标题',
    draggable: true,
    titleShow: true
}
