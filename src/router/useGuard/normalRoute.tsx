import {GuideProps} from "@/router/types/router";
import {useRoutes} from "react-router-dom";

export default function NormalRoute(props : GuideProps){
    return useRoutes(props.routes)
}
