import React from "react";
import classNames from "classnames";
import {CloseOutlined} from "@ant-design/icons";

interface Props {
  visible: boolean
  title: string | React.ReactNode
  footer: React.ReactNode
  onClose ?: Function,
  children ?: JSX.Element | string | React.ReactNode,
  width ?: number,
  height ?: number
}

export default class Modal extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  static defaultProps = {
    onClose: ()=>{}
  }

  renderTitle = ()=>{
    if (typeof this.props.title === 'string'){
      return <div className="modal-title">{this.props.title}</div>
    }
    return this.props.title
  }

  render() {
    return (
        <div className={classNames('modal-root', {
          'modal-root-hidden': !this.props.visible
        })}>
          <div className="modal-mask" onClick={(event : any)=> this.props.onClose && this.props.onClose(event)}/>
          <div
              style={{
                width: this.props.width + "px",
                height: this.props.height + "px"
              }}
              className="modal-content">
            <div className="close-button" onClick={(event : any)=> this.props.onClose && this.props.onClose(event)}>
                <div className="close-container">
                    <CloseOutlined />
                </div>
              </div>
            <div className="modal-header">
                {
                  this.renderTitle()
                }
              </div>
            <div className="modal-body">
                {this.props.children}
              </div>
            <div className="modal-footer">
                {
                  this.props.footer
                }
              </div>
          </div>
        </div>
    );
  }

}
