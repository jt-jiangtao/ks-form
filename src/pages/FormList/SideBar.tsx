import Button from "@/components/Button/Button";
import {useLocation, useNavigate} from "react-router";
import {
    PlusOutlined,
    UnorderedListOutlined,
    PlusSquareOutlined,
    FormOutlined,
    ShareAltOutlined,
    TeamOutlined,
    RestOutlined
} from "@ant-design/icons";
import style from "./SideBar.module.scss"
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
                    onClick={() => navigate("/new-form-create")}>新建</Button>
            <div className={style.submenu}>
                <NavLink to="#mycreate" className={classNames(style.nvlink,
                    hash === 'mycreate' ? style.isactive : ""
                )}>
                    <PlusSquareOutlined style={{marginRight: 10, fontSize: 14}}/>
                    表单列表
                </NavLink>
                <NavLink to="#myedit" className={classNames(style.nvlink,
                    hash === 'myedit' ? style.isactive : ""
                )}>
                    <FormOutlined style={{marginRight: 10, fontSize: 14}}/>
                    我填写的
                </NavLink>
                <NavLink to="#share" className={classNames(style.nvlink,
                    hash === 'share' ? style.isactive : ""
                )}>
                    <ShareAltOutlined style={{marginRight: 10, fontSize: 14}}/>
                    分享给我的
                </NavLink>
                <NavLink to="#collect" className={classNames(style.nvlink,
                    hash === 'collect' ? style.isactive : ""
                )}>
                    <TeamOutlined style={{marginRight: 10, fontSize: 14}}/>
                    我收集的
                </NavLink>
                <NavLink to="#recycle" className={classNames(style.nvlink,
                    hash === 'recycle' ? style.isactive : ""
                )}>
                    <RestOutlined style={{marginRight: 10, fontSize: 14}}/>
                    回收站
                </NavLink>
            </div>
        </>
    )
}
