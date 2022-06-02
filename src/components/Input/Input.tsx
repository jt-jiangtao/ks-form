import React, {FC, useState, useMemo, memo, forwardRef} from 'react';
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import style from './input.module.scss'

interface InputProps {
    // 自定义宽度
    // default 170px
    width?: string;
    // 自定义样式
    // default {}
    moreStyle?: object;
    // 输入框类型
    // default text
    type?: string;
    // 提示
    // default ''
    placeholder?: string;
    // 显示密码切换按钮(需同时设置type="password")
    // default false
    showTogglePwd?: boolean;
    // 输入框内容改变回调
    handleIptChange?: Function;
    // 输入框聚焦回调
    handleIptFocus?: Function;
    // 输入框失去焦点回调
    handleIptBlur?: Function;
    // 输入框键盘监听
    handleKeyDown?: Function;
    // 默认内容
    // default ''
    defaultValue?: string;
}

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLElement>, 'type'>; //原生Input接口
const Input: FC<InputProps & NativeInputProps> = (props) => {
    const {
        width,
        moreStyle,
        type,
        placeholder,
        showTogglePwd,
        handleIptBlur,
        handleIptChange,
        handleKeyDown,
        handleIptFocus,
        defaultValue,
    } = props;
    const [iptValue, setIptValue] = useState<string | number>(defaultValue || '');
    const [pwdIptState, setPwdIptState] = useState(true); //密码框切换状态
    const changeIpt = (e: any) => {
        //改变文本框
        if (moreStyle && Object.keys(moreStyle).includes('caretColor')) {
            return;
        }
        setIptValue(e.target.value);
        handleIptChange && handleIptChange(e.target.value);
    };
    const focusIpt = () => {
        handleIptFocus && handleIptFocus(iptValue);
    };
    const blurIpt = () => {
        handleIptBlur && handleIptBlur(iptValue);
    }

    // 输入框类型
    const iptType = useMemo(() => {
        if (showTogglePwd && type === 'password') {
            return pwdIptState ? 'password' : 'text';
        }
        return type || 'text';
    }, [type, showTogglePwd, pwdIptState]);
    // 自定义输入框样式
    const exticStyle = useMemo(() => {
        let style = {width: '170px'};
        if (width) {
            style.width = width + 'px'
        }
        return {...style, ...moreStyle};
    }, [width, moreStyle]);
    return (
        <div className={style.box} style={{width: width ? width + 'px' : '170px'}}>
            <input
                className={style.input}
                style={exticStyle}
                type={iptType}
                placeholder={placeholder}
                onBlur={blurIpt}
                value={defaultValue || iptValue}
                onChange={changeIpt}
                onFocus={focusIpt}
                onKeyUp={(e) => handleKeyDown && handleKeyDown(e)}
            />
            {
                //密码框
                (type === 'password' && showTogglePwd && (
                    pwdIptState ?
                        <EyeOutlined
                            style={{position: 'absolute', right: '15px', fontSize: '14px', cursor: 'pointer', color: 'grey'}}
                            onClick={() => setPwdIptState(!pwdIptState)}/>
                        :
                        <EyeInvisibleOutlined
                            style={{position: 'absolute', right: '15px', fontSize: '14px', cursor: 'pointer', color: 'grey'
                            }}
                            onClick={() => setPwdIptState(!pwdIptState)}/>
                ))
            }
        </div>
    );
};
export default memo(Input)