type WatchTitleProps = {
    title : string
}

export default function WatchTitle(props : WatchTitleProps){
    return (
        <div className="watch-title">{props.title}</div>
    )
}
