import {RouteObject} from "react-router/lib/router";

export type GuideRouteObject = RouteObject & {
    meta ?: Object
}

export type GuideProps = {
    routes: GuideRouteObject[],
    beforeEach ?: Function
}
