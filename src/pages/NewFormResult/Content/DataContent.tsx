import {IForm, IFormResult} from "@/types/service/model";
import {createRef, useEffect, useRef, useState} from "react";
import {formResult} from "@/services";
import {useLocation, useNavigate} from "react-router";
import {parseSearch} from "@/utils/uri";
import "@/styles/NewFormResult/Content/DataContent.scss"
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import classNames from "classnames";
import WatchProblemContent from "@/pages/ProblemContent/WatchProblemContent";
import empty from '@/assets/images/empty.png'

type DataContentProps = {
    data: IForm | undefined
}

export default function DataContent(props : DataContentProps){
    const location = useLocation()
    const navigate = useNavigate()
    let [data, setData] = useState<IFormResult[]>()
    let [current, setCurrent] = useState<number>(1)
    let [total, setTotal] = useState<number>(0)
    let inputRef = createRef<HTMLInputElement>()
    let [input, setInput] = useState<number>(1)

    useEffect(()=>{
        formResult({
            id: parseSearch(location.search, 'id')
        }).then(res=>{
            let items = res.data.items
            setData(items)
            setCurrent(1)
            setInput(1)
            setTotal(items.length)
        })
    }, [props.data?.id])

    const setCurrentIndex = (next : number) => {
        if (next < 1 || next > total){
            setInput(current)
            return
        }
        setCurrent(next)
        setInput(next)
    }

    const inputBlur = () => {
        setCurrentIndex(input)
    }

    const inputChange = (event : any) => {
      setInput(event.currentTarget.value)
    }

    const share = () => {
        navigate({
            search: location.search,
            hash: "#share"
        })
    }

    return (
        <div className="data-content">
            {
                total === 0 ?
                    <div className="empty-data-container">
                        <div className="empty-data">
                            <img src={empty} />
                            <div className="empty-result">
                                暂无收集结果
                                <span
                                    onClick={share}
                                    className="empty-link">邀请填写</span>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <div className="data-static">
                            <div
                                className="count">{`共收集 ${total} 份数据 (${props.data?.status === 2 ? '未发布' : (props.data?.status === 3 ? '正在收集' : '停止收集')})`}</div>
                            <div className="switch">
                                <div
                                    onClick={() => setCurrentIndex(current - 1)}
                                    className={classNames("back", "operate-color", {
                                        "opacity7": current === 1
                                    })}>
                                    <LeftOutlined/>
                                </div>
                                <div className="current">
                                    第<input
                                    onBlur={inputBlur}
                                    onChange={inputChange}
                                    className="operate-color"
                                    type='text'
                                    ref={inputRef}
                                    value={input}/>份
                                </div>
                                <div
                                    onClick={() => setCurrentIndex(current + 1)}
                                    className={classNames("next", "operate-color", {
                                        "opacity7": current === total
                                    })}>
                                    <RightOutlined/>
                                </div>
                            </div>
                        </div>
                        <div className="get-form-content">
                            <div className="form-time">{`提交时间: 2022/5/28 17:24:01`}</div>
                            <div className="form-content">
                                <WatchProblemContent form={props.data} data={data && data[current - 1]} />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}
