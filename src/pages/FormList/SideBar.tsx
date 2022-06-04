import Button from "@/components/Button/Button";
import {useLocation, useNavigate} from "react-router";
import {PlusOutlined, PlusSquareOutlined, FormOutlined} from "@ant-design/icons";
import style from "@/styles/FormList/SideBar.module.scss"
import {NavLink} from "react-router-dom";
import classNames from "classnames";

type SideBarProps = {
    active: string
}

export default function SideBar(props: SideBarProps) {
    // 根据active选择当前sidebar
    const navigate = useNavigate()
    let hash = useLocation().hash.slice(1)
    return (
        <>
            <Button icon={<PlusOutlined style={{fontWeight: "bolder", fontSize: 16}}/>} type="primary"
                    onClick={() => navigate({
                        pathname: "/new-form-create",
                        hash: "#data"
                    })}>新建</Button>
            <div className={style.submenu}>
                <NavLink to="#mycreate" className={classNames(style.link,
                    hash === 'mycreate' ? style.active : ""
                )}>
                    <PlusSquareOutlined style={{marginRight: 10, fontSize: 14}}/>
                    表单列表
                </NavLink>
                <NavLink to="#myedit" className={classNames(style.link,
                    hash === 'myedit' ? style.active : ""
                )}>
                    <FormOutlined style={{marginRight: 10, fontSize: 14}}/>
                    我填写的
                </NavLink>
            </div>
        </>
    )
}
