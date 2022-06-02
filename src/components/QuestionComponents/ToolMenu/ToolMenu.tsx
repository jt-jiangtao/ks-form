import {useContext} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import unselect from '@/assets/icon/unselect.svg'
import selected from '@/assets/icon/selected.svg'
import downIcon from '@/assets/icon/down.svg'
import deleteIcon from '@/assets/icon/delete.svg'
import more from '@/assets/icon/more.svg'
import {nanoid} from "nanoid";
import DropDown from "@/components/DropDown/DropDown";
import Menu from "@/components/DropDown/Menu";
import {NormalUsedProblemContext} from "@/store/context/NormalUsedProblem";
import {star} from "@/services";
import message from "@/components/Message";

export function ToolMenu(props: { index: number }) {
    const {data, setData, changeFocus} = useContext(DataInfoContext)
    const {freshNormalUsedProblem}= useContext(NormalUsedProblemContext)

    const copyHandler = () => {
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

    const addNormalProblem = (event : any, item : any) => {
        if (item.key === 'delete') deleteProblem()
        else if (item.key === 'not-required'){
            let copy = JSON.parse(JSON.stringify(data.problems))
            for (let i = 0; i < copy.length; i++) {
                copy[i].required = false
            }
            setData({
                problems: copy
            })
        }else if (item.key === 'normal'){
            // TODO: 添加为常用题
            star({
                problem: data.problems[props.index]
            }).then(res=>{
                if (res.stat === "ok"){
                    freshNormalUsedProblem()
                    message.success("添加常用题成功")
                }
            })
        }
    }

    return (
        <div className="tool-menu">
            <div
                onClick={copyHandler}
                className="tool__copy">复制
            </div>
            <div className="vertical-line"/>
            <div className="tool__require">
                <div
                    onClick={changeRequire}
                    className="require-des">必填</div>
                <img
                    className="choice"
                    onClick={changeRequire}
                    src={data.problems[props.index].required ? selected : unselect}/>
                <DropDown
                    className="down-icon-dropdown"
                    trigger="click" overlay={<Menu onClick={addNormalProblem} items={[{
                    key: "not-required",
                    label: "设置所有题目为非必选"
                }]}/>}>
                <img
                    className="down-icon"
                        src={downIcon}/>
                </DropDown>
            </div>
            <div className="vertical-line"/>
            <div className="tool__delete">
                <DropDown trigger="hover" overlay={<Menu onClick={addNormalProblem} items={[{
                    key: "delete",
                    label: "删除"
                }]}/>}>
                <img
                    onClick={deleteProblem}
                    src={deleteIcon}/>
                </DropDown>
            </div>
            <div className="tool__more">
                <DropDown trigger="click" overlay={<Menu onClick={addNormalProblem} items={[{
                    key: "normal",
                    label: "将此题添加为常用题",
                }]}/>}>
                    <img src={more}/>
                </DropDown>
            </div>
        </div>
    );
}
