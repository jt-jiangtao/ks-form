type WatchSubTitleProps = {
    title : string
}

export default function WatchSubTitle(props : WatchSubTitleProps){
    return (
        <div className="watch-subTitle-container">
            <div className="watch-subTitle">{props.title}</div>
        </div>
)
}
