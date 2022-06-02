import HeaderLayout from "@/layout/HeaderLayout";
import folder from '@/assets/icon/folder.svg'
import {LeftOutlined} from "@ant-design/icons";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import '@/styles/NewFormCreate/Create/index.scss'
import {useNavigate} from "react-router";
import {useContext} from "react";
import QuestionList from "@/pages/NewFormCreate/Create/QuestionList";
import QuestionContent from "@/pages/NewFormCreate/Create/QuestionContent";
import ToolList from "@/pages/NewFormCreate/Create/ToolList";
import {NormalUsedProblemProvider} from "@/store/context/NormalUsedProblem";

export default function Create() {
    const navigate = useNavigate()
    const {data} = useContext(DataInfoContext)
    return (
        <NormalUsedProblemProvider>
            <div className="create">
                <HeaderLayout className="create-header">
                    <div className="create-back">
                        <LeftOutlined onClick={() => navigate(-1)} className="back-icon"/>
                        <img className="folder-icon" src={folder}/>
                        <h1 className="create-title">{data.title || '新建表单'}</h1>
                    </div>
                </HeaderLayout>
                <div className="create-edit__content">
                    <div className="create-edit__scroll">
                        <div className="create-edit">
                            <div className="left-side">
                                <QuestionList />
                            </div>
                            <div className="center">
                                <QuestionContent />
                            </div>
                            <div className="right-side">
                                <ToolList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NormalUsedProblemProvider>
    )
}
