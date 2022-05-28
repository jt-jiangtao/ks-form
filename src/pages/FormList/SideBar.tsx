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
import "./SideBar.scss"
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
            {/*<Button icon={<UnorderedListOutlined style={{fontWeight: "bolder", fontSize: 16}}/>} type="default"*/}
            {/*        onClick={() => navigate("/new-form-create")}*/}
            {/*        style={{marginTop: "15px", borderRight: "solid 4px #40A9FF"}}>表单列表</Button>*/}
            <div className="submenu">
                <NavLink to="#mycreate" className={classNames('nvlink', {
                    'isactive': hash === 'mycreate'
                })}>
                    <PlusSquareOutlined style={{marginRight: 10, fontSize: 14}}/>
                    表单列表
                </NavLink>
                <NavLink to="#myedit" className={classNames('nvlink', {
                    'isactive': hash === 'myedit'
                })}>
                    <FormOutlined style={{marginRight: 10, fontSize: 14}}/>
                    我填写的
                </NavLink>
                <NavLink to="#share" className={classNames('nvlink', {
                    'isactive': hash === 'share'
                })}>
                    <ShareAltOutlined style={{marginRight: 10, fontSize: 14}}/>
                    分享给我的
                </NavLink>
                <NavLink to="#collect" className={classNames('nvlink', {
                    'isactive': hash === 'collect'
                })}>
                    <TeamOutlined style={{marginRight: 10, fontSize: 14}}/>
                    我收集的
                </NavLink>
                <NavLink to="#recycle" className={classNames('nvlink', {
                    'isactive': hash === 'recycle'
                })}>
                    <RestOutlined style={{marginRight: 10, fontSize: 14}}/>
                    回收站
                </NavLink>
            </div>
        </>
    )
}
