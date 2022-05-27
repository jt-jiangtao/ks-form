type svgComponentProps = {
    src: string
}

export default function SvgComponent(props: svgComponentProps){
    return (
        <img src={props.src}/>
    );
}
