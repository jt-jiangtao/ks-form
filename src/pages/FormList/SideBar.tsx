import Button from "@/components/Button/Button";
import {useNavigate} from "react-router";
import {PlusOutlined} from "@ant-design/icons";

type SideBarProps = {
    active: string
}

export default function SideBar(props: SideBarProps){
    // 根据active选择当前sidebar
    const navigate = useNavigate()
    return (
        <>
            <Button icon={<PlusOutlined style={{fontWeight: "bolder", fontSize: 16}} />} type="primary" onClick={()=> navigate("/new-form-create")}>新建</Button>
        </>
    )
}
