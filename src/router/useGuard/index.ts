import {useMemo} from "react";
import generateRouters from "@/router/useGuard/generateRouters";
import {GuideProps} from "@/router/types/router";

function useGuard(guide: GuideProps) : JSX.Element{
    let routers = useMemo(()=> generateRouters(guide), [guide])
    return routers
}

export default useGuard
