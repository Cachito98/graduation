import React, { useState } from 'react'
import Head from 'next/head'
// import Link from 'next/link'

import { Row, Col, List, Breadcrumb, Card, Descriptions, Divider } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined,
} from '@ant-design/icons';
import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from 'next/link';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const groupMemb = (list) => {

    const [mylist, setMylist] = useState(
        [
            { title: '50元加入小密圈 胖哥带你学一年', context: '我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
            { title: 'React实战视频教程-技术胖Blog开发(更新04集)', context: '我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
            { title: 'React服务端渲染框架Next.js入门(共12集)', context: '我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
            { title: 'React Hooks 免费视频教程(共11集)', context: '我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
        ]
    )

    return (
        <>
            <Head>
                <title>课题组成员</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div className="group_box">
                    <h2 className="listTitle">课题组成员</h2>
                        <Card title="成员1" bordered={false} >
                            <div> <Avatar size={100} src="" /></div><br />

                            <Descriptions >
                                <Descriptions.Item label="昵称">张三</Descriptions.Item>
                                <Descriptions.Item label="电话">1810000000</Descriptions.Item>
                                <Descriptions.Item label="感兴趣的课题">课题1</Descriptions.Item>
                                <Descriptions.Item label="Remark">empty</Descriptions.Item>

                            </Descriptions>,
                            <List
                                // header={}
                                itemLayout="vertical"
                                dataSource={mylist}
                                renderItem={item => (
                                    <List.Item>
                                        <div className="list-title1"><Link href={{ pathname: '/detailed' }}>
                                            <a>{item.title}</a>
                                        </Link></div>
                                        
                                        {/* <div className="list-context">{item.context}</div> */}
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <Card title="成员二" bordered={false}  >
                            <div> <Avatar size={100} src="" /></div><br />

                            <Descriptions >
                                <Descriptions.Item label="昵称">张三</Descriptions.Item>
                                <Descriptions.Item label="电话">1810000000</Descriptions.Item>
                                <Descriptions.Item label="感兴趣的课题">课题1</Descriptions.Item>
                                <Descriptions.Item label="Remark">empty</Descriptions.Item>

                            </Descriptions>,
                            <List
                                // header={}
                                itemLayout="vertical"
                                dataSource={mylist}
                                renderItem={item => (
                                    <List.Item>
                                        <div className="list-title1"><Link href={{ pathname: '/detailed' }}>
                                            <a>{item.title}</a>
                                        </Link></div>
                                        <div className="list-icon">
                                            {/* <span><Icon type="calendar" /> 2019-06-28</span>
                                                <span><Icon type="folder" /> 视频教程</span>
                                                <span><Icon type="fire" /> 5498人</span> */}
                                        </div>
                                        {/* <div className="list-context">{item.context}</div> */}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>
                </Col>

            </Row>
            <Footer />

        </>
    )




}
// MyList.getInitialProps = async () => {
//   const promise = new Promise((resolve) => {
//     axios(servicePath.getArticleList).then(
//       (res) => {
//         console.log('远程获取数据结果:', res.data.data)
//         resolve(res.data)
//       }
//     )
//   })

//   return await promise
// }

export default groupMemb
