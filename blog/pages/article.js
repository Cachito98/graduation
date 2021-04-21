

import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Suggest from '../components/Suggest'
import axios from 'axios'
import servicePath from "../config/apiUrl";
// import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { Carousel } from 'antd';
import { Calendar } from 'antd';
import Chat2 from '../components/Chat2'

import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

const Home = (list) => {
  // const [mylist, setMylist] = useState(list.data)
  const [mylist, setMylist] = useState(
    [
      { title: '图神经网络（Graph Neural Networks）概述', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '图神经网络 VS 图嵌入', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '图神经网络的分类', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '图卷积网络（Graph Convolutional Networks, GCN）', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
    ]
  )
  // const renderer = new marked.Renderer();
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  // marked.setOptions({
  //   renderer: renderer,
  //   gfm: true,
  //   pedantic: false,
  //   sanitize: false,
  //   tables: true,
  //   breaks: false,
  //   smartLists: true,
  //   smartypants: false,
  //   highlight: function (code) {
  //     return hljs.highlightAuto(code).value;
  //   }
  // });
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    <>
      <Head>
        <title >活动聊天室</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <h2 className="listTitle">活动详情</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          <div>
            <Chat2></Chat2>
          </div>
          <div>
            {/* <List
              header={<div>最新文章</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><FolderOutlined /> {item.type_name}</span>
                    <span><FireOutlined /> {item.view_count}</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                  </div>
                </List.Item>
              )}
            /> */}

          </div>

        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />

          <Suggest />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

// Home.getInitialProps = async () => {
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


export default Home