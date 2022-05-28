import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";
import '@/styles/NewFormResult/Content/ProblemContent.scss'
import Button from "@/components/Button/Button";


type ProblemContentProps = {
    data: IForm
}

export default function ProblemContent(props : ProblemContentProps){
    return (
        <>
            <div className="problem-content-container">
                <EditableProblemContent data={props.data}/>
            </div>
            <div className="problem-footer">
                <Button className="edit-btn" type="primary">修改表单</Button>
                <Button className="write-btn" type="link">填写表单</Button>
            </div>
        </>
    );
}
