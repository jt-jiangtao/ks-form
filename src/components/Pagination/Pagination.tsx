import React, {useState, FC, useMemo, memo} from 'react';
import {EllipsisOutlined, LeftOutlined, RightOutlined, DownOutlined} from '@ant-design/icons';
import Select from "../Select/Select";
import style from "./pagination.module.scss";

interface PaginationProps {
    // 总数据条数
    // default 0
    total: number;
    // 显示每页条数Select
    // default false
    showSizeChanger?: Boolean;
    // 每页条数配置
    // default 每页10条数据
    pageSizeOptions?: Array<number>;
    // 改变页码后的回调
    // default {}
    showJumpInput?: Boolean;
    // 显示跳转页面输入框
    // default false
    changePageCallback: Function;
    // 改变每页条数后的回调
    changePageSizeCallback?: Function;
}

const Pagination: FC<PaginationProps> = (props) => {
    const {changePageCallback, total, pageSizeOptions, showJumpInput, showSizeChanger, changePageSizeCallback} = props;
    const [nowIndex, setNowIndex] = useState<number>(1);
    const [pageRenderArray, setPageRenderArray] = useState<Array<number>>([]);
    const [sizePage, setSizePage] = useState<number>(pageSizeOptions ? pageSizeOptions[0] : 4);

    const totalPage = useMemo(() => {
        setNowIndex(1);
        if (Math.ceil(total / sizePage) > 6) {
            setPageRenderArray([2, 3, 4, 5, 6]);
        } else {
            if (Math.ceil(total / sizePage) > 2) {
                const array = new Array((Math.ceil(total / sizePage) as number) - 2).fill(0);
                array.forEach((item, index) => {
                    array[index] = index + 2;
                });
                setPageRenderArray(array);
            } else {
                setPageRenderArray([]);
            }
        }
        return Math.ceil(total / sizePage);
    }, [total, sizePage]);
    //点击改页码
    const changePage = (pageNum: number) => {
        return () => {
            //小型分页器
            if (totalPage <= 6) {
                changePageCallback(pageNum);
                return setNowIndex(pageNum);
            }
            if (pageNum > 4 && pageNum <= totalPage - 4) {
                setPageRenderArray([pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2]);
            }
            //页码为1的情况
            if (pageNum <= 4) {
                setPageRenderArray([2, 3, 4, 5, 6]);
            }
            //页码到倒数第四页内的情况
            if (pageNum > totalPage - 4) {
                setPageRenderArray([
                    totalPage - 5,
                    totalPage - 4,
                    totalPage - 3,
                    totalPage - 2,
                    totalPage - 1,
                ]);
            }
            setNowIndex(pageNum);
            changePageCallback(pageNum);
        };
    };
    //向前翻一页
    const prevPage = () => {
        if (nowIndex === 1) {
            return;
        }
        setNowIndex(nowIndex - 1);
        if (totalPage > 6) {
            if (nowIndex > totalPage - 3) {
                return;
            } else if (nowIndex > 4) {
                setPageRenderArray(
                    pageRenderArray.map((item) => {
                        return item - 1;
                    }),
                );
            } else if (nowIndex - 5 <= 4) {
                //开头几页翻页的情况，回到第一页
                setPageRenderArray([2, 3, 4, 5, 6]);
            }
        }
        changePageCallback(nowIndex - 1);
    };
    //向后翻一页
    const nextPage = () => {
        if (nowIndex === totalPage) {
            return;
        }
        setNowIndex(nowIndex + 1);
        if (totalPage > 6) {
            if (nowIndex + 5 > totalPage) {
                setPageRenderArray([
                    totalPage - 5,
                    totalPage - 4,
                    totalPage - 3,
                    totalPage - 2,
                    totalPage - 1,
                ]);
            } else if (nowIndex < 4) {
                return;
            } else if (nowIndex + 5 < totalPage) {
                setPageRenderArray(
                    pageRenderArray.map((item) => {
                        return item + 1;
                    }),
                );
            }
        }
        changePageCallback(nowIndex + 1);
    };
    //向前翻五页
    const prevFivePage = () => {
        var updateIndex: number = 0;
        if (nowIndex - 5 <= 4) {
            //开头几页翻页的情况，回到第一页
            setPageRenderArray([2, 3, 4, 5, 6]);
            updateIndex = nowIndex - 5 <= 1 ? 1 : nowIndex - 5;
        } else if (nowIndex + 5 > totalPage) {
            setPageRenderArray([nowIndex - 7, nowIndex - 6, nowIndex - 5, nowIndex - 4, nowIndex - 3]);
            updateIndex = nowIndex - 5;
        } else if (nowIndex - 5 > 4) {
            //中间翻页的情况
            setPageRenderArray(
                pageRenderArray.map((item) => {
                    return item - 5;
                }),
            );
            updateIndex = nowIndex - 5;
        }
        setNowIndex(updateIndex);
        changePageCallback(updateIndex);
    };
    //向后翻五页
    const nextFivePage = () => {
        var updateIndex: number = 0;
        if (nowIndex + 7 >= totalPage) {
            setPageRenderArray([
                totalPage - 5,
                totalPage - 4,
                totalPage - 3,
                totalPage - 2,
                totalPage - 1,
            ]);
            updateIndex = nowIndex + 5 > totalPage ? totalPage : nowIndex + 5;
        } else if (nowIndex - 5 < 0) {
            setPageRenderArray([nowIndex + 3, nowIndex + 4, nowIndex + 5, nowIndex + 6, nowIndex + 7]);
            updateIndex = nowIndex + 5;
        } else if (nowIndex + 5 < totalPage) {
            setPageRenderArray(
                pageRenderArray.map((item) => {
                    return item + 5;
                }),
            );
            updateIndex = nowIndex + 5;
        }
        setNowIndex(updateIndex);
        changePageCallback(updateIndex);
    };
    //跳页
    const jumpPageNum = (e: any) => {
        if (e.keyCode === 13) {
            const jumpPage = Number(e.target.value);
            if (jumpPage > totalPage || jumpPage < 0 || isNaN(jumpPage)) {
                //超出页码范围，不挑
                return (e.target.value = '');
            }
            if (Math.ceil(total / sizePage) > 6) {
                setPageRenderArray([2, 3, 4, 5, 6]);
            } else {
                if (Math.ceil(total / sizePage) > 2) {
                    const array = new Array((Math.ceil(total / sizePage) as number) - 2).fill(0);
                    array.forEach((item, index) => {
                        array[index] = index + 2;
                    });
                    setPageRenderArray(array);
                } else {
                    setPageRenderArray([]);
                }
            }
            console.log(pageRenderArray, totalPage);
            setNowIndex(jumpPage);
            changePageCallback(jumpPage);
            e.target.value = '';
        }
    };
    //select回调
    const handleSelectCallback = (pageSize: any) => {
        console.log(pageSize.value)
        setSizePage(pageSize.value)
        // 加一个回调函数，设置每页展示数据的条数
        changePageSizeCallback && changePageSizeCallback(pageSize.value, nowIndex);
    };


    return (
        <div className={style.pagination}>
            <div className={nowIndex === 1 ? `${style.prev} ${style.disabled}` : `${style.prev}`} onClick={prevPage}>
                <LeftOutlined/>
            </div>
            <div className={nowIndex === 1 ? `${style.actived} ${style.numberBox}` : `${style.numberBox}`}
                 onClick={changePage(1)}>
                1
            </div>
            {nowIndex > 4 && totalPage > 6 && (
                <div className={style.numberBox} onClick={prevFivePage}>
                    <EllipsisOutlined/>
                </div>
            )}

            {totalPage <= 4 &&
                pageRenderArray.length >= 1 &&
                pageRenderArray.map((item, index) => {
                    return (
                        <div
                            className={nowIndex === item ? `${style.actived} ${style.numberBox}` : `${style.numberBox}`}
                            key={index}
                            onClick={changePage(item)}
                        >
                            {item}
                        </div>
                    );
                })}
            {totalPage > 4 &&
                pageRenderArray.map((item, index) => {
                    {
                        return (
                            <div
                                className={nowIndex === item ? `${style.actived} ${style.numberBox}` : `${style.numberBox}`}
                                key={index}
                                onClick={changePage(item)}
                            >
                                {item}
                            </div>
                        );
                    }
                })}
            {totalPage - nowIndex >= 4 && totalPage > 6 && (
                <div className={style.numberBox} onClick={nextFivePage}>
                    <EllipsisOutlined/>
                </div>
            )}
            {totalPage > 1 && (
                <div
                    className={nowIndex === totalPage ? `${style.actived} ${style.numberBox}` : `${style.numberBox}`}
                    onClick={changePage(totalPage)}
                >
                    {totalPage}
                </div>
            )}
            <div
                className={nowIndex === totalPage || totalPage <= 1 ? `${style.next} ${style.disabled}` : `${style.next}`}
                onClick={nextPage}
            >
                <RightOutlined/>
            </div>
            {Array.isArray(pageSizeOptions) && showSizeChanger && (
                <Select
                    option={pageSizeOptions.map((item) => {
                        return {
                            label: `${item} 条/页`,
                            value: item,
                        };
                    })}
                    placeholder="4条/页"
                    width={100}
                    handleSelectCallback={handleSelectCallback}
                />
            )}
            {showJumpInput && (
                <div className={style.jumpBox}>
                    <span>跳至</span>
                    <input type="text" className={style.jump} onKeyUp={jumpPageNum}/>
                    <span>页</span>
                </div>
            )}
        </div>
    );
};
export default memo(Pagination);
