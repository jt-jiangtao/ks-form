import SignLayout from "@/layout/SignLayout";
import {useNavigate} from "react-router";

export default function Signup(){
    const navigate = useNavigate()
    return (
        <SignLayout>
            <div style={{
                height: 200
            }}
                 className="todo"
                 onClick={()=> {
                     navigate("/signin")
                 }}
            >
                TODO: 注册页面
            </div>
        </SignLayout>
    )
}
