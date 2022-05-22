// 表单
export interface IForm {
  id: string;
  title: string;
  subTitle: string;
  status: EFormStatus;
  ctime: number;
  utime: number;
  author: string;
  isStar: boolean
  problems: IProblem<TProblemType>[];
}

// 表单题目
export type IProblem<Type extends TProblemType> = {
  id?: string;
  type: Type;
  title: string;
  required: boolean;
  setting?: TSetting<Type>;
  result?: TResult<Type>;
};

export interface IStarProblem<Type extends TProblemType> {
  id: string;
  uId: string;
  problem: Omit<IProblem<Type>, "result" | "id" | "status">;
  status: EStatus;
}

// 题目类型
export type TProblemType =
  | "input"
  | "singleSelect"
  | "multiSelect"
  | "pullSelect"
  | "date"
  | "time"
  | "score";

export interface IProblemType {
  title: string;
  type: TProblemType;
}

// 题目结果
export type TResult<T extends TProblemType> = T extends "singleSelect"
  ? ISingleResult
  : T extends "multiSelect"
  ? IMultiResult
  : T extends "pullSelect"
  ? ISingleResult
  : T extends "score"
  ? IScoreResult
  : IInputResult;

// 单选题结果
export interface ISingleResult {
  value: Omit<ISelectOption, "status">;
}

// 多选题结果
export interface IMultiResult {
  value: Omit<ISelectOption, "status">[];
}

// 填空题结果
export interface IInputResult {
  value: string;
}

// 分数题结果
export interface IScoreResult {
  value: number;
}

// 题目设置
export type TSetting<T extends TProblemType> = T extends "singleSelect"
  ? ISelectSetting
  : T extends "multiSelect"
  ? ISelectSetting
  : T extends "pullSelect"
  ? ISelectSetting
  : null;

// 选择设置
export interface ISelectSetting {
  options: ISelectOption[];
  // other: boolean;
}

// 选项
export interface ISelectOption {
  id: string;
  title: string;
  status: ESelectOptionStatus;
}

// 选项状态
export enum ESelectOptionStatus {
  delete = 1,
  normal,
}

// 表单状态
export enum EFormStatus {
  delete = 1,
  normal,
  ing,
  end,
}

// 用户
export interface IUser {
  id: string;
  nickname: string;
  account: string;
  status: EStatus;
  pwd: string;
  avatar: string;
  ctime: number;
  utime: number;
}

export enum EStatus {
  delete = 1,
  normal,
}

export interface IFormModule {
  id: string;
  formId: string;
  ctime: string;
  status: EStatus;
  problems: IProblem<TProblemType>[];
}

export interface IFormResult {
  id: string;
  formAuthor: string
  formId: string;
  result: IProblem<TProblemType>[];
}

export interface SuccessRes<Type> {
  stat: string
  data ?: Type
}

export interface ErrorRes {
  stat : string
  msg: string
}
