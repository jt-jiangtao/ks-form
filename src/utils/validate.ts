import {
    IForm,
    IMultiResult,
    IProblem,
    ISelectOption,
    ISelectSetting,
    ISingleResult,
    TProblemType
} from "@/types/service/model";
import message from "@/components/Message";

export function checkProblems(form : IForm) : boolean{
    if (!form.title){
        message.info("请输入表单标题")
        return false
    }
    if (!form.subTitle){
        message.info("请输入表单子标题")
        return false
    }
    for (let i = 0; i < form.problems.length; i++) {
        let problem = form.problems[i]
        if (!checkProblem(problem)) return false
    }
    return true
}

export function checkProblem(problem : IProblem<TProblemType>) : boolean{
    if (!problem.title){
        message.info("问题不能为空，请输入")
        return false
    }
    if (["singleSelect", "multiSelect", "pullSelect"].indexOf(problem.type) !== -1){
        let options = (problem?.setting as ISelectSetting).options || []
        for (let i = 0; i < options.length; i++) {
            let option = options[i]
            if (!option.title){
                message.info("选项不能为空，请输入")
                return false
            }
        }
    }
    return true
}

export function checkUnWriteProblem(problems: IProblem<TProblemType>[]): boolean[] {
    let res : boolean[] = []
    console.log(problems)
    for (let i = 0; i < problems.length; i++) {
        let problem = problems[i]
        switch (problem.type) {
            case "input":
            case "date":
            case "score":
            case "time":
                res.push(problem.required && !problem.result?.value)
                break
            case "singleSelect":
            case "pullSelect":
                res.push(problem.required && !(problem.result as ISingleResult)?.value.title)
                break
            case "multiSelect":
                if (!problem.result){
                    res.push(problem.required &&true)
                }else{
                    res.push(problem.required && (problem.result as IMultiResult).value.some(item => !item.title))
                }
                break
        }
    }
    return res
}
