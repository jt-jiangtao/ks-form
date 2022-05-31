import classNames from "classnames";
import {createRef, useEffect, useRef, useState} from "react";
import TextLeftIcon from '@/assets/icon/text-left.png'
import TextCenterIcon from '@/assets/icon/text-center.png'
import Textarea from "@/components/Textarea";

type EditSubTitleProps = {
    focus: boolean,
    title: string,
    freshData: Function,
    changeFocusElement: Function,
}

export default function EditSubTitle(props: EditSubTitleProps){
    let [subTitleCenter, setSubTitleCenter] = useState(true)
    let [title, setTitle] = useState<string>(props.title)

    useEffect(()=>{
        setTitle(props.title)
    }, [props.title])

    const inputDataChange = () => {
        props.freshData(title)
    }

    const onchange = (event : any) => {
        setTitle(event.currentTarget.value)
    }


    const changeFocusElement = (event: any) => {
        event.stopPropagation()
        props.changeFocusElement('subTitle')
    }

    return (
        <div
            onClick={changeFocusElement}
            className={classNames("subTitle", {
            "subTitle--focus": props.focus,
            "subTitle--not-focus": !props.focus
        })}>
            <div className="subTitle__container">
                <div className={classNames("subTitle--content", {
                    "subTitle__container--focus": props.focus
                })}>
                    <Textarea
                        value={title}
                        onBlur={inputDataChange}
                        onChange={onchange}
                        className={classNames("content-textarea", {
                        "content-textarea--center": subTitleCenter
                    })} maxLength={300} placeholder="点击设置描述"/>
                </div>
                <div className="subTitle__tools">
                    <span onClick={()=> setSubTitleCenter(false)} style={{backgroundImage: `url(${TextLeftIcon})`}} className={classNames("text-left", {"active": !subTitleCenter})}/>
                    <span onClick={()=> setSubTitleCenter(true)} style={{backgroundImage: `url(${TextCenterIcon})`}} className={classNames("text-center", {"active": subTitleCenter})}/>
                </div>
            </div>
        </div>
    );
}
