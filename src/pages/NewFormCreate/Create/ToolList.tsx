import '@/styles/NewFormCreate/Create/toolList.scss'
import Button from "@/components/Button/Button";

export default function ToolList(){
    return (
        <div className="tool-list">
            <div className="button-wrapper over-btn">
                <Button>预览</Button>
                <Button>保存草稿</Button>
            </div>
            <div className="button-wrapper">
                <Button block type="primary">完成创建</Button>
            </div>
        </div>
    )
}
