import style from '@/styles/NewFormResult/NavigateBar.module.scss'
import {useLocation, useNavigate} from "react-router";
import classNames from "classnames";

type SideBarProps = {
    active: string
}

export default function NavigateBar(props: SideBarProps) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className={style["result-navigator-container"]}>
            <div className={style["result-navigator"]}>
                <div className={style["navigate-tabs"]}>
                    <span
                        onClick={()=> navigate({
                            hash: "#data",
                            search: location.search
                        })}
                        className={classNames(style["tab"], {
                            [style["tab-active"]]: props.active === 'data'
                        })}>数据统计&分析</span>
                    <span
                        onClick={()=> navigate({
                            hash: "#problem",
                            search: location.search
                        })}
                        className={classNames(style["tab"], {
                            [style["tab-active"]]: props.active === 'problem'
                        })}>表单问题</span>
                    <span
                        onClick={()=> navigate({
                            hash: "#share",
                            search: location.search
                        })}
                        className={classNames(style["tab"], {
                            [style["tab-active"]]: props.active === 'share'
                        })}>分享</span>
                </div>
            </div>
        </div>
    )
}
