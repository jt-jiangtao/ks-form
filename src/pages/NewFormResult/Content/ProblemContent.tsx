import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";
import '@/styles/NewFormResult/Content/ProblemContent.scss'
import Button from "@/components/Button/Button";
import {useLocation, useNavigate} from "react-router";
import {parseSearch} from "@/utils/uri";


type ProblemContentProps = {
    data: IForm
}

export default function ProblemContent(props : ProblemContentProps){
    const navigate = useNavigate()
    const location = useLocation()
    const modifyForm = () => {
      navigate({
          pathname: "/new-form-create",
          search: location.search,
          hash: "#data"
      })
    }
    const inputForm = () => {
        navigate({
            pathname: `/w/${parseSearch(location.search, 'id')}`
        })
    }

    return (
        <>
            <div className="problem-content-container">
                <EditableProblemContent data={props.data}/>
            </div>
            <div className="problem-footer">
                <Button
                    onClick={modifyForm}
                    className="edit-btn" type="primary">修改表单</Button>
                <Button
                    onClick={inputForm}
                    className="write-btn" type="link">填写表单</Button>
            </div>
        </>
    );
}
