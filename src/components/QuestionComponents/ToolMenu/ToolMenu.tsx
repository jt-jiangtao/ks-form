import {useContext} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import unselect from '@/assets/icon/unselect.svg'
import selected from '@/assets/icon/selected.svg'
import down from '@/assets/icon/down.svg'
import deleteIcon from '@/assets/icon/delete.svg'
import more from '@/assets/icon/more.svg'
import {nanoid} from "nanoid";
import {login} from "@/services";

export function ToolMenu(props: { index: number }){
    const {data,focus,  setData, changeFocus} = useContext(DataInfoContext)

    const copyHandler = ()=>{
        let copy = JSON.parse(JSON.stringify(data.problems))
        let added = JSON.parse(JSON.stringify(copy[props.index]))
        added.id = nanoid(10)
        copy.splice(props.index, 0, added)
        changeFocus(props.index + 1)
        setData({
            problems: copy
        })
    }

    const changeRequire = () => {
        let copy = JSON.parse(JSON.stringify(data.problems))
        copy[props.index].required = !copy[props.index].required
        setData({
            problems: copy
        })
    }

    const deleteProblem = () => {
        let copy = JSON.parse(JSON.stringify(data.problems))
        copy.splice(props.index, 1)
        setData({
            problems: copy
        })
    }

    return (
        <div className="tool-menu">
            <div
                onClick={copyHandler}
                className="tool__copy">复制</div>
            <div className="vertical-line"/>
            <div className="tool__require">
                <div className="require-des">必填</div>
                <img
                    onClick={changeRequire}
                    src={data.problems[props.index].required ? selected : unselect} />
            </div>
            <div className="vertical-line"/>
            <div className="tool__delete">
                <img
                    onClick={deleteProblem}
                    src={deleteIcon} />
            </div>
            <div className="tool__more">
                <img src={more}/>
            </div>
        </div>
    );
}
