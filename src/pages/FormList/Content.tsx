import Pagination from "@/components/Pagination/Pagination";
import Select from "@/components/Select/Select";

type ContentProps = {
    sidebar? :string
}

export default function Content(props: ContentProps) {

    const changePageCallback = (pageNum: number) => {
        console.log(pageNum);
    }
    const handleSelectCallback = (v: number) => {
        console.log(v);
    }
    const option = [
        {
            label: 'Mucy',
            value: 'mucy',
        },
        {
            label: 'Mike',
            value: 'mike',
        },
        {
            label: 'aMck',
            value: 'amck',
        },
    ];
    return (
        <>
            <div>首页</div>
            <Pagination total={45} showSizeChanger={true} showJumpInput={false} pageSizeOptions={[5,10,15,20,25]} changePageCallback={changePageCallback}/>
            <Select option={option} width={200} handleSelectCallback={handleSelectCallback} placeholder={"请选择"}/>
        </>
    )
}
