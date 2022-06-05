import React from "react";
import style from "@/styles/NewFormResult/Content/ShareContent.module.scss"
import Button from "@/components/Button/Button";
import {LinkOutlined} from "@ant-design/icons";
import {QRCode} from "react-qrcode-logo";
import logo from "@/assets/icon/logo.svg";
import html2canvas from "html2canvas";
import {IForm} from "@/types/service/model";
import message from "@/components/Message";

type ShareContentProps = {
    data: IForm | undefined
}

export default function ShareContent(props : ShareContentProps){
    const handleDownload = () => {
        html2canvas(document.querySelector("#result-qr") as any).then(
            function (canvas) {
                const link = document.createElement("a");
                link.download = "qrcode-logo.png";
                link.href = canvas.toDataURL();
                link.click();
            }
        );
    };

    const getUrl = ()=>{
        if (!props.data) return window.origin + "/w/"
        return window.origin + "/w/" + props.data.id
    }

    const copyLink = () => {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', getUrl());
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            message.success('复制成功')
        }else {
            message.error('复制失败')
        }
        document.body.removeChild(input);
    }

    return (
        <div className={style["result-share"]}>
            <h3>分享邀请他人填写</h3>
            <div className={style["result-code"]}>
                <div className={style["qr-wrapper"]}>
                    <div className={style["qr-container"]}>
                        <div className={style["qr__title"]}>{!props.data ? '' : props.data.title}</div>
                        <div id="result-qr" className="qr">
                            <QRCode value={getUrl()} size={180} />
                            <div className={style["qr-logo-container"]}>
                                <img src={logo} />
                            </div>
                        </div>
                        <div className={style["qr__des"]}>微信扫码或长按识别，填写内容</div>
                    </div>
                </div>
                <Button type="link" onClick={handleDownload}>下载二维码</Button>
                <Button
                    onClick={copyLink}
                    className={style["copy-link"]} icon={<LinkOutlined />} type="default">复制链接</Button>
            </div>
        </div>
    )
}
