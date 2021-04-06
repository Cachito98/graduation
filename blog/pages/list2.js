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
      { title: '神经网络课题研究（一）', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '神经网络课题研究（二）', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '神经网络课题研究（三）', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '神经网络课题研究（四）', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
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
                <Breadcrumb.Item><a href="/list">课题分类</a></Breadcrumb.Item>
                <Breadcrumb.Item>课题一</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <List
                // header={}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <Link href={{ pathname: '/detailed' }}>
                      <a><div className="list-title">{item.title}</div></a>
                    </Link>
                    {/* <div className="list-title">{item.title}</div> */}
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
