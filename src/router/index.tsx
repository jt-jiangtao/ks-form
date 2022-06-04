import {GuideRouteObject} from "@/router/types/router";
import {lazy} from "react";
import { getCache } from "@/utils/localStorage";
const Signin = lazy(()=> import('@/pages/Signin'))
const Signup = lazy(()=> import('@/pages/Signup'))
const FormList = lazy(()=> import('@/pages/FormList'))
const NewFormCreate = lazy(()=> import('@/pages/NewFormCreate'))
const NewFormResult = lazy(()=> import('@/pages/NewFormResult'))
const Write = lazy(()=> import('@/pages/Write'))
const PhoneWrite = lazy(()=> import('@/pages/PhoneWrite'))
const Account = lazy(()=> import('@/pages/Account'))

const routes : GuideRouteObject[] = [
    {
        path: "/signin",
        element: <Signin />,
        meta: {
            logRe: "/form-list"
        }
    },
    {
        path: "/signup",
        element: <Signup />,
        meta: {
            logRe: "/form-list"
        }
    },
    {
        path: "/form-list",
        element: <FormList />,
        meta: {
            log: true
        }
    },
    {
        path: "/new-form-create",
        element: <NewFormCreate />,
        meta: {
            log: true
        }
    },
    {
        path: "/new-form-result",
        element: <NewFormResult />,
        meta: {
            log: true
        }
    },
    {
        path: "/w/:id",
        element: <Write />,
        meta: {
            log: false
        }
    },
    {
        path: "/m/w/:id",
        element: <PhoneWrite />,
        meta: {
            log: false
        }
    },
    {
        path: "/account",
        element: <Account />,
        meta: {
            log: true
        }
    },
    {
        path: "/*",
        meta: {
            redirect: "/form-list"
        }
    }
]

function beforeEach(pathname: string, meta: any, last: string) {
    if (meta.redirect)return meta.redirect
    const hasLogin = getCache('login') === 'true'
    // 权限校验
    // 已登录跳转
    if (meta.log && !hasLogin) return '/signin'
    else if (hasLogin && meta.logRe) return meta.logRe
}

export default {
    routes,
    beforeEach
}
