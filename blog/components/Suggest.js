import React, { Component } from 'react'
import { List, Typography, Divider } from 'antd';
import Link from 'next/link'


const data = [
    '神经网络课题研究一',
    '神经网络课题研究二',
    '神经网络课题研究三',
    '神经网络课题研究四',
    '神经网络课题研究五',
];


export default class Suggest extends Component {
    render() {
        return (
            <div className="author-div comm-box" >

                <List
                    header={<div>推荐文章</div>}
                    bordered={false}
                    dataSource={data}
                    renderItem={item => <List.Item><Link href={{ pathname: '/detailed' }}>
                        <a>{item}</a>
                    </Link></List.Item>}
                />
            </div>
        )
    }
}
