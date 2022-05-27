import React, {useEffect, useState} from "react";
import {DataInfoProvider} from "@/store/context/DataInfoContext";
import {useLocation} from "react-router";
import Preview from "@/pages/NewFormCreate/Preview";
import Create from "@/pages/NewFormCreate/Create";

export default function NewFormCreate(){
    const location = useLocation()
    const getHash = ()=> {
        if (!location.hash)return 'data'
        let hash = location.hash.slice(1)
        if (["preview", "data"].indexOf(hash) === -1) return "data"
        return hash
    }
    let [hash, setHash] = useState(getHash)

    useEffect(()=>{
        setHash(getHash)
    }, [location.hash])

    return (
        <DataInfoProvider>
            {
                hash === "preview" ? <Preview /> : <Create />
            }
        </DataInfoProvider>
    )
}
