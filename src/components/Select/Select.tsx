import React, {FC, useMemo, createRef, useEffect, useState, useCallback, memo} from 'react';
import {DownOutlined, LoadingOutlined, CloseOutlined} from '@ant-design/icons';
import style from './select.module.scss';

interface Options {
    label: String | number;
    value: String | number;
    disabled?: Boolean;
}

interface SelectProps {
    /**
     * @description 选择器数据
     * @default []
     */
    option: Array<Options>;
    /**
     * @description 宽度
     * @default 80px
     */
    width?: Number;
    /**
     * @description 提示
     * @default false
     */
    placeholder?: String;
    /**
     * @description 禁用状态
     * @default false
     */
    disabled?: Boolean;
    /**
     * @description 加载状态
     * @default false
     */
    loading?: Boolean;
    /**
     * @description 可输入状态
     * @default false
     */
    showSearch?: Boolean;
    /**
     * @description 可输入状态下清除
     * @default false
     */
    clearable?: Boolean;
    /**
     * @description 选择后的回调
     * @default {}
     */
    handleSelectCallback?: Function;
    /**
     * @description 输入后的回调
     * @default {}
     */
    handleTextChange?: Function;
}

const Select: FC<SelectProps> = (props) => {
    const {
        option,
        width,
        placeholder,
        disabled,
        loading,
        showSearch,
        clearable,
        handleSelectCallback,
        handleTextChange,
    } = props;
    const [selected, setSelected] = useState<string | number | any>('');
    const [selectedValue, setSelectedValue] = useState<string | number | any>('');
    const optionRef = createRef() as any;

    useEffect(() => {
        optionRef.current.height = `0px`;
        // console.log(option);
    }, []);
    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const ownsWidth = useMemo(() => {
        //传参宽度
        if (width) {
            return {
                width: `${width}px`,
            };
        }
        return {};
    }, [width]);
    const disabledStyle = useMemo(() => {
        //禁用状态
        if (disabled) {
            return {
                cursor: 'not-allowed',
                background: 'rgb(238, 238, 238)',
            };
        }
    }, [disabled]);

    const toggleOptions = (e: any) => {
        //切换下拉
        e.stopPropagation();
        if (disabled) return;
        console.log(optionRef.current.style.height);
        if (optionRef.current.style.height === '0px' || optionRef.current.style.height === '') {
            if (showSearch) {
                optionRef.current.style.height = `${inputFilterOtpions.length * 100}%`;
            } else {
                optionRef.current.style.height = `${option.length * 100}%`;
            }
        } else {
            optionRef.current.style.height = '0px';
        }
    };
    const changeOptions = (v: Options, e: any) => {
        //选择选项
        e.stopPropagation();
        if (v.disabled) return;
        optionRef.current.style.height = '0px';
        setSelected(v.label);
        setSelectedValue(v.value);
        if (handleSelectCallback) {
            handleSelectCallback(v);
        }
    };
    const inputFilterOtpions = useMemo(() => {
        //输入状态options过滤
        return option.filter((item) => {
            return (item.label as string).includes(selected);
        });
    }, [option, selected]);
    const handleInputChange = useCallback(
        (e: any) => {
            //输入后的回调
            setSelected(e.target.value);
            console.log(selected);
            optionRef.current.style.height =
                option.filter((item) => {
                    return (item.label as string).includes(e.target.value);
                }).length *
                100 +
                '%';
            if (handleTextChange) {
                handleTextChange(e.target.value);
            }
        },
        [selected],
    );

    return showSearch ? (
        <>
            <div className={style.select} style={{...ownsWidth, ...disabledStyle}}>
                <div className={style.selected}>
                    <input
                        type="text"
                        className={style.selected}
                        value={selected}
                        placeholder={placeholder as string}
                        onClick={toggleOptions}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {clearable ? (
                        <CloseOutlined onClick={() => setSelected('')}/>
                    ) : (
                        <DownOutlined onClick={toggleOptions}/>
                    )}
                </div>
                <div className={style.selectOptions} style={ownsWidth} ref={optionRef}>
                    {inputFilterOtpions.map((s) => {
                        return (
                            <div
                                key={s.label as any}
                                className={style.option}
                                style={
                                    s.disabled ? {cursor: 'not-allowed', background: 'rgb(238, 238, 238)'} : {}
                                }
                                onClick={(e) => changeOptions(s as Options, e)}
                            >
                                {s.label}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    ) : (
        <div className={style.select} style={{...ownsWidth, ...disabledStyle}}>
            <div className={style.selected} onClick={toggleOptions}>
                {selected ? (
                    <div className={style.size}>{selected}</div>
                ) : (
                    (placeholder && <div className={style.placeholder}>{placeholder}</div>) || <div/>
                )}
                {loading ? <LoadingOutlined/> : <DownOutlined/>}
            </div>
            <div className={style.selectOptions} style={ownsWidth} ref={optionRef}>
                {option.map((s) => {
                    return (
                        <div
                            key={s.label as any}
                            className={s.value == selectedValue ? style.select_option : style.option}
                            style={s.disabled ? {cursor: 'not-allowed', background: 'rgb(238, 238, 238)'} : {}}
                            onClick={(e) => changeOptions(s as Options, e)}
                        >
                            {s.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default memo(Select);