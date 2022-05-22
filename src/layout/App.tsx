import useGuard from "@/router/useGuard";
import router from "@/router";
import '@/components/styles/index.scss'
import '@/styles/app.scss'

export default function App(){
    let routers = useGuard(router)
    return routers
}
