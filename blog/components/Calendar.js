
import { Avatar, Divider,Calendar  } from 'antd'
import Link from 'next/link'
import Cookies from 'js-cookie'
import React, { Component } from 'react'

export default class CalendarCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            ArticleList: [],
            user: this.props.user,
            isLogin: this.props.isLogin,
            power: this.props.power,
            userInfo: ''
        };
    }
     onPanelChange=(value, mode)=> {
        console.log(value, mode);
      }
    render() {
        return (
            <div className="calendar_box">
                    <div >
                        <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
                    </div>
             </div>
        )
    }
}

