import classNames from "classnames";
import React from "react";
import {LoadingOutlined} from "@ant-design/icons";

type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text'
type ButtonShape = 'default' | 'circle' | 'round'
type ButtonSize = 'large' | 'middle' | 'small'
type TargetType = '_self' | '_blank' | '_parent' | '_top' | string

interface Props {style ?: Object
  type?: ButtonType
  shape?: ButtonShape
  size?: ButtonSize
  icon?: JSX.Element | React.ReactNode | string
  disabled ?: boolean
  block?: boolean
  href?: string
  target?: TargetType
  onClick?: (event : any) => void
  loading?: boolean,
  className?: string,
  children ?: JSX.Element | string | React.ReactNode
    danger ?: boolean
}

export default class Button extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    static defaultProps = {
        type: 'default',
        shape: 'default',
        size: 'middle',
        disabled: false,
        block: false,
        loading: false,
        // TODO: 添加danger属性
        danger: false,
        onClick: () => {
        }
    }

    iconOnly = () => {
        if (this.props.shape === 'circle') return true
        return false
    }

    renderLink = () => {
        return (
            <a href={this.props.href} target={this.props.target}>
                {this.props.children}
            </a>
        )
    }

    renderChildren = () => {
        if (typeof this.props.children === 'string' ||
            typeof this.props.children === 'number') {
            return (
                <span>
            {this.props.children}
          </span>
            )
        }
        return this.props.children
    }

    renderIcon = () => {
        if (this.props.loading) {
            return <span className="btn-icon-container btn-icon-loading">
          <LoadingOutlined/>
      </span>
        }
        return (
            this.props.icon === 'string' ? this.props.icon
            : this.props.icon && <span className="btn-icon-container">{this.props.icon}</span>
        )
    }

  // TODO: PROBLEM click事件传参
  clickEvent = (event : any)=>{
    this.props.onClick && this.props.onClick(event)
  }

  render() {
    return (
        <button
            style={this.props.style}
          onClick={this.clickEvent}
          disabled={this.props.disabled}
          className={classNames('btn',
              `btn-${this.props.type}`,
              `btn-${this.props.size}`,
              `btn-${this.props.shape}`,
              this.props.className,
          {
                'btn-icon-only': this.iconOnly(),
                'btn-block': this.props.block,
                'btn-loading': this.props.loading
              }
              )}
        >
          {
            this.renderIcon()
          }
          {
            this.props.href ? this.renderLink() :  this.renderChildren()
          }
        </button>
    )
  }
}
