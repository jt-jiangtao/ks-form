import {IMultiResult, IProblem, ISelectSetting, ISingleResult, TProblemType, TSetting} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import {useCallback, useEffect, useState} from "react";
import Radio from "@/components/Radio";
import CheckBox from "@/components/CheckBox";

type EditableSelectProps = {
    data: IProblem<TProblemType>,
    changeData: Function,
    index: number
}

export default function EditableSelect(props : EditableSelectProps){
    let [select, setSelect] = useState(props.data)

    useEffect(()=>{
        console.log(props.data)
        setSelect(props.data)
    }, [props])

    const getValueObject = (value : string) => {
        if (value === '')return  {}
        let options = (props.data.setting as ISelectSetting).options
        return options.filter((item)=> item.title === value)[0]
    }

    const singleSelectChange = (value : string) => {
        let copy = JSON.parse(JSON.stringify(props.data))
        copy['result'] = {
            'value': getValueObject(value)
        }
        props.changeData(props.index, copy)
    }

    const multiSelectChange = (value : string[]) => {
        let copy = JSON.parse(JSON.stringify(props.data))
        let values : any= []
        for (let i = 0; i < value.length; i++) {
            values.push(getValueObject(value[i]))
        }
        copy['result'] = {
            'value': values
        }
        props.changeData(props.index, copy)
    }

    const renderSelect = ()  => {
        let items : any = []
        let options = (props.data.setting as ISelectSetting).options
        for (let i = 0; i < options.length; i++) {
            let item = options[i]
            items.push({
                label: item.title,
                value: item.title
            })
        }
      if (props.data.type === 'singleSelect'){
          return <Radio options={items} defaultValue={(props.data?.result as ISingleResult)?.value?.title || ''} onChange={singleSelectChange} />
      }else if (props.data.type === 'multiSelect'){
          let def : string[] = []
          if ((props.data?.result as ISingleResult)?.value){
            let values = (props.data?.result as IMultiResult)?.value
              for (let i = 0; i < values?.length; i++) {
                  def.push(values[i].title)
              }
          }
          return <CheckBox options={items} defaultValue={def} onChange={multiSelectChange}  />
      }else {
        // TODO: 封装Select组件
      }
      return null
    }

    return (
        <div
            className="editable-select-wrapper"
        >
            <div className="select__title select__title--no-hover">
                <div className="number">{`${props.index + 1}.`}</div>
                <Textarea
                    editable={false}
                    className="select__textarea"
                    value={select.title} />
            </div>
            <div className="select-container">
                {renderSelect()}
            </div>
        </div>
    );
}
