import React, { Component } from 'react'
import { List, Typography, Divider } from 'antd';
import Link from 'next/link'
import {
    TagTwoTone,
    PushpinTwoTone
} from '@ant-design/icons';


export default class Suggest extends Component {
    render() {
        return (
            <div className=" comm-box" >
                <div className="sug_box">
                    <div className="sug_box_child">
                        <h3>相关网站：</h3>
                        <h4><TagTwoTone /><a href="https://www.cnki.net/" target="_blank">中国知网</a></h4>
                        <h4><TagTwoTone /><a href="https://www.gxust.edu.cn/" target="_blank">广西科技大学官网</a></h4>
                        <h4><TagTwoTone /><a href="https://pattern.swarma.org/" target="_blank">集智斑图</a></h4>
                    </div>
                    <div className="sug_box_child">
                        <h3>相关资料：</h3>
                        <h4><PushpinTwoTone /><a>神经网络课题1</a></h4>
                        <h4><PushpinTwoTone /><a>神经网络课题2</a></h4>
                        <h4><PushpinTwoTone /><a>神经网络课题3</a></h4>
                    </div>
                </div>
            </div>
        )
    }
}
