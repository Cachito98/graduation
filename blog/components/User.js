import React, { Component } from 'react'
import {
    FireOutlined,
    FileTwoTone,
    PushpinTwoTone,
    BankTwoTone,
    IdcardTwoTone,
} from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default class User extends Component {
    render() {
        return (
            <div>
                <div className="User_box">
                    <div className="User_box_left">
                        <Image
                            width={180}
                            height={180}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="User_box_right">
                        <h1>张三</h1>
                        <p><BankTwoTone />学校：广西科技大学</p>
                        <p><IdcardTwoTone />个人简介：这是个人简介</p>
                    </div>
                </div>
                
            </div>
        )
    }
}
