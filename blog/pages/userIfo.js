import React, { useState, useEffect } from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb, Card, Descriptions, Divider, Button } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Cookies from 'js-cookie'

import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined,
} from '@ant-design/icons';
import axios from "axios";
import servicePath from "../config/apiUrl";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const userIfo = () => {
    const router = useRouter();
    const { username, isLogin } = router.query;
    const [value, setValue] = useState('');
    const [usernameCookie, setUsernameCookie] = useState('')
    const [isLoginCookie, setIsLoginCookie] = useState('')
    console.log(username, isLogin, "router");
    const [mylist, setMylist] = useState([])
    useEffect(() => {
        setIsLoginCookie(isLogin)
        setUsernameCookie(username)
        
        const articalArr = []
        fetch(`http://localhost:5000/api/blog/blogs?username=${username}`).then(req => req.json())
            .then(data => {
                console.log(data, "这是Data") //请求到的数据
                if (data.data) {
                    data.data.forEach(item => {
                        const articalList = {
                            title: item.title,
                            description: item.description,
                            id: item._id
                        }
                        articalArr.push(articalList)
                    })
                    setMylist(articalArr)
                }
            })


    }, [value])

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header isLogin={isLoginCookie} username={usernameCookie} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <Card title="ta的资料"  >
                            <div> <Avatar size={100} src="" /></div><br />

                            <Descriptions >
                                <Descriptions.Item label="昵称">张三</Descriptions.Item>
                                <Descriptions.Item label="电话">1810000000</Descriptions.Item>
                                <Descriptions.Item label="感兴趣的课题">课题1</Descriptions.Item>
                                <Descriptions.Item label="Remark">empty</Descriptions.Item>

                            </Descriptions>,
                            <Button >编辑资料</Button>
                            <Button type="primary">身份认证</Button>
                        </Card>
                        <Card title="ta的文章"  >
                            <List
                                // header={}
                                itemLayout="vertical"
                                dataSource={mylist}
                                renderItem={item => (
                                    <List.Item>
                                        <div className="list-title"><Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                            <a>{item.title}</a>
                                        </Link></div>
                                        <div className="list-icon">
                                            {/* <span><Icon type="calendar" /> 2019-06-28</span>
                                                <span><Icon type="folder" /> 视频教程</span>
                                                <span><Icon type="fire" /> 5498人</span> */}
                                        </div>
                                        <div className="list-context">{item.description}</div>
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

export default userIfo
