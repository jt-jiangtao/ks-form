import React from "react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import Button from "@/components/Button/Button";

const Code: React.FC = () => {
  const handleDownload = () => {
    html2canvas(document.querySelector("#react-qrcode-logo") as any).then(
      function (canvas) {
        const link = document.createElement("a");
        link.download = "qrcode-logo.png";
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  return (
    <div className="code">
      <QRCode value={"https://baidu.com"} size={200} />
      <div>
        <Button type="default" onClick={handleDownload}>
          下载二维码
        </Button>
      </div>
    </div>
  );
};

export default Code;
