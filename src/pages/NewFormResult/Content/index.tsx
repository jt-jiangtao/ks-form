import {IForm} from "@/types/service/model";
import ShareContent from "@/pages/NewFormResult/Content/ShareContent";
import ProblemContent from "@/pages/NewFormResult/Content/ProblemContent";
import DataContent from "@/pages/NewFormResult/Content/DataContent";

type ContentProps = {
    data: IForm | undefined,
    active: string
}

export default function Content(props : ContentProps){
    switch (props.active){
        case "data":
            return <DataContent data={props.data} />
        case "share":
            return <ShareContent data={props.data} />
        case "problem":
            if (!props.data)return null
            return <ProblemContent data={props.data} />
    }
    return null
}
