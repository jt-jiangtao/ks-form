import {useState} from "react";
import {StarFilled} from "@ant-design/icons";
import {nanoid} from "nanoid";

type StarsProps = {
    editable ?: boolean,
    onScoreChange ?: Function,
    score : number,
    maxScore: number,
    size ?: number,
    defaultColor ?: string,
    activeColor ?: string
}


export default function Stars(props : StarsProps){
    const {size = '16px' , defaultColor = '#c2c2c2', activeColor = '#f8d61d'} = props
    let [hoverIndex, setHoverIndex] = useState(0)
    let [clickIndex, setClickIndex] = useState(props.score)

    const onclick = (index : number) => {
        if (!props.editable)return
        setClickIndex(index)
        props.onScoreChange && props.onScoreChange(index)
    }

    const onMouseEnter = (index : number) => {
        if (!props.editable)return
        setHoverIndex(index)
    }

    const onMouseLeave = (index : number) => {
        if (!props.editable)return
        setHoverIndex(0)
    }

    const getStars = () => {
        let num = hoverIndex === 0 ? clickIndex : hoverIndex;
        let starContainer = [];
        for (let i = 1; i <= props.maxScore; i++) {
            starContainer.push(
                <span
                    key={`star-${nanoid(5)}`}
                    className="star"
                    onClick={()=> onclick(i)}
                    onMouseEnter={()=> onMouseEnter(i)}
                    onMouseLeave={()=> onMouseLeave(i)}
                >
                    {i > num ? <StarFilled style={{color: defaultColor, fontSize: size}} /> : <StarFilled style={{color: activeColor, fontSize: size}}/>}
                </span>
            );
        }
        return starContainer
    }

    return (
        <div className="stars-container">
            {getStars()}
        </div>
    )
}
