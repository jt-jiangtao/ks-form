import React from "react";
import { useNavigate } from "react-router";

export default function NewFormCreate(){
    const navigate = useNavigate()
    let id = 1
    function complete(){
        navigate(`/w/${id}`,{
            state:{
                id
            }
        })
    }
    return (
        <div onClick={complete}>NewFormCreate</div>
    )
}
