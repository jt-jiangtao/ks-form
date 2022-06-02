import Button from "@/components/Button/Button";
import successIcon from "@/assets/icon/success.png"
import "@/styles/Write/WriteSuccess.scss"
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
        <div className="success-container">
            <div className="success-tip">
                <img src={successIcon} />
                <span>提交成功</span>
            </div>
            <div className="write-again">
                <Button onClick={writeAgain} className="write-btn" type="primary">再写一份</Button>
            </div>
        </div>
    );
}
