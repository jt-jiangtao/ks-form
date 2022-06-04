import HeaderLayout from "@/layout/HeaderLayout";
import folder from '@/assets/icon/folder.svg'
import {LeftOutlined} from "@ant-design/icons";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import '@/styles/NewFormCreate/Create/index.scss'
import {useNavigate} from "react-router";
import {useContext, useRef} from "react";
import QuestionList from "@/pages/NewFormCreate/Create/QuestionList";
import QuestionContent from "@/pages/NewFormCreate/Create/QuestionContent";
import ToolList from "@/pages/NewFormCreate/Create/ToolList";
import {NormalUsedProblemProvider} from "@/store/context/NormalUsedProblem";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export default function Create() {
    const navigate = useNavigate()
    const {data} = useContext(DataInfoContext)
    const scrollRef = useRef<HTMLDivElement>(null)
    return (
        <DndProvider backend={HTML5Backend}>
            <NormalUsedProblemProvider>
            <div className="create">
                <HeaderLayout className="create-header">
                    <div onClick={() => navigate({
                        pathname: "/form-list",
                        hash: "#mycreate"
                    })} className="create-back">
                        <LeftOutlined className="back-icon"/>
                        <img className="folder-icon" src={folder}/>
                        <h1 className="create-title">{data.title || '新建表单'}</h1>
                    </div>
                </HeaderLayout>
                <div className="create-edit__content">
                    <div ref={scrollRef} className="create-edit__scroll">
                        <div className="create-edit">
                            <div className="left-side">
                                <QuestionList />
                            </div>
                            <div className="center">
                                <QuestionContent scrollRef={scrollRef} />
                            </div>
                            <div className="right-side">
                                <ToolList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NormalUsedProblemProvider>
        </DndProvider>
    )
}
