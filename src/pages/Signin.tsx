import '@/styles/signin.scss'
import {useNavigate} from "react-router";
import SignLayout from "@/layout/SignLayout";

export default function Signin(){
    const navigate = useNavigate()
    return (
        <SignLayout>
            <div style={{
                height: 200
            }}
                 className="todo"
                 onClick={()=> {
                     navigate("/signup")
                 }}
            >
                TODO: 登录页面
            </div>
        </SignLayout>
    )
}
