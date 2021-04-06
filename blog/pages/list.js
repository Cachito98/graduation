import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Suggest from '../components/Suggest'

import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from 'next/link';



const MyList = (list) => {

  const [mylist, setMylist] = useState(
    [
      { title: '课题一', context: '这是课题1的介绍这是课题1的介绍这是课题1的介绍这是课题1的介绍这是课题1的介绍这是课题1的介绍这是课题1的介绍' },
      { title: '课题二', context: '这是课题2的介绍这是课题2的介绍这是课题2的介绍这是课题2的介绍这是课题2的介绍这是课题2的介绍这是课题2的介绍这是课题2的介绍' },
      { title: '课题三', context: '这是课题2的介绍这是课题3的介绍这是课题3的介绍这是课题3的介绍这是课题3的介绍这是课题3的介绍这是课题3的介绍这是课题3的介绍这是课题3的介绍' },
      { title: '课题四', context: '这是课题4的介绍这是课题4的介绍这是课题4的介绍这是课题4的介绍这是课题4的介绍这是课题4的介绍这是课题4的介绍这是课题4的介绍这是课题4的介绍' },
    ]
  )

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>课题分类</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <List
                // header={}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <Link href={{ pathname: '/list2' }}>
                      <a><div className="list-title">{item.title}</div></a>
                    </Link>
                    
                    <div className="list-icon">
                      {/* <span><Icon type="calendar" /> 2019-06-28</span>
                      <span><Icon type="folder" /> 视频教程</span>
                      <span><Icon type="fire" /> 5498人</span> */}
                    </div>
                    <div className="list-context">{item.context}</div>
                  </List.Item>
                )}
              />
            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Suggest/>
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

export default MyList
