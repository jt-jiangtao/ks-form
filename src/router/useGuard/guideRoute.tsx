import {GuideProps, GuideRouteObject} from "@/router/types/router";
import NormalRoute from "@/router/useGuard/normalRoute";
import {BrowserRouter, Navigate, useLocation} from "react-router-dom";
import React from "react";
import {LoadingOutlined} from "@ant-design/icons";

function Loading(){
    return(
        <div style={{
            backgroundColor: "#f2f4f7",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <LoadingOutlined style={{
                color: "#1488ed",
                fontSize: "26px"
            }} />
        </div>
    )
}

type GuideElementProps = {
    route : GuideRouteObject,
    beforeEach : Function | undefined
}

export type LocationType = {
    pathname: string,
    search: string,
    hash: string
}

let temp : any = null
let last : LocationType | null = null

function Guide(props : GuideElementProps) : any{
    const location = useLocation()
    const {pathname, search, hash} = location
    const meta = props.route.meta || {}
    if (props.beforeEach){
        if (temp === props.route.element){
            return props.route.element
        }
        let newPath = props.beforeEach({pathname, search, hash}, meta, last)
        last = {pathname, search, hash}
        if (newPath && newPath !== pathname) return <Navigate to={newPath} />
    }
    temp = props.route.element
    return props.route.element
}

function transformRoute(guide : GuideProps) : GuideRouteObject[]{
    if (guide.routes == null || guide.routes.length === 0)return []
    const {routes, beforeEach} = guide
    let newRoutes : GuideRouteObject[] = []
    for (let i = 0;i < routes.length;i++){
        let route : GuideRouteObject = routes[i]
        let newRoute : GuideRouteObject = {...route}
        // TODO: fallback完善
        newRoute.element = (
            <React.Suspense fallback={<Loading />}>
                <Guide route={route} beforeEach={beforeEach} />
            </React.Suspense>
        )
        newRoute.children && (newRoute.children = transformRoute({
            routes: newRoute.children,
            beforeEach: guide.beforeEach
        }))
        newRoutes.push(newRoute)
    }
    return newRoutes
}

export default function guideRoute(guide : GuideProps) : JSX.Element{
    let newRoutes = transformRoute(guide)
    return (
        <BrowserRouter>
            <NormalRoute routes={newRoutes} />
        </BrowserRouter>
    )
}
