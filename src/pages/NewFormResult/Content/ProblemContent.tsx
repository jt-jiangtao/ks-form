import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";
import style from '@/styles/NewFormResult/Content/ProblemContent.module.scss'
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
            <div className={style["problem-content-container"]}>
                <EditableProblemContent data={props.data}/>
            </div>
            <div className={style["problem-footer"]}>
                <Button
                    onClick={modifyForm}
                    className={style["edit-btn"]} type="primary">修改表单</Button>
                <Button
                    onClick={inputForm}
                    className={style["write-btn"]} type="link">填写表单</Button>
            </div>
        </>
    );
}
