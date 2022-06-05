import Button from "@/components/Button/Button";
import successIcon from "@/assets/icon/success.png"
import style from "@/styles/Write/WriteSuccess.module.scss"
import {useLocation, useNavigate} from "react-router";

export default function WriteSuccess(){
    const navigate = useNavigate()
    const location = useLocation()
    const writeAgain = () => {
        navigate({
            pathname: location.pathname,
            hash: ""
        })
    }
    return (
        <div className={style["success-container"]}>
            <div className={style["success-tip"]}>
                <img src={successIcon} />
                <span>提交成功</span>
            </div>
            <div className={style["write-again"]}>
                <Button onClick={writeAgain} className={style["write-btn"]} type="primary">再写一份</Button>
            </div>
        </div>
    );
}
