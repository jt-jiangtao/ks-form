import '@/styles/NewFormCreate/Create/questionContent.scss'
import logo from '@/assets/icon/logo.svg'
import {FormOutlined} from "@ant-design/icons";
import EditProblemContent from "@/pages/ProblemContent/EditProblemContent";
import {DragModule} from "@/components/QuestionComponents/Module/DragModule";

export default function QuestionContent(){
    return (
        <div className="question-content">
            <div className="problem-content">
                <DragModule />
                <EditProblemContent />
            </div>
            <div className="success-edit">
                <div className="divider"/>
                <div className="add-success-container">
                    <div className="success-edit__label">
                        <span>自定义提交成功页</span>
                        <FormOutlined className="success-edit__label-icon" />
                    </div>
                    <div className="success-edit__content">可编辑结束语和填写者互动工具</div>
                </div>
                <div className="divider"/>
            </div>
            <div className="brand">
                <div className="brand__logo">
                    <img src={logo}/>
                    <span>金山表单</span>
                </div>
                <div className="brand__text">
                    <span>百万数据收集量</span>
                    <span className="brand__line">|</span>
                    <span>可视化结果分析</span>
                </div>
            </div>
        </div>
    );
}
