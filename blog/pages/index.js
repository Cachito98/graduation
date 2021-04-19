import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image, Divider } from 'antd'
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


import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

const Home = (list) => {
  // const [mylist, setMylist] = useState(list.data)
  const [value, setValue] = useState('');
  const [mylist, setMylist] = useState(
    [

    ]
  )
  // const renderer = new marked.Renderer();
  const contentStyle = {
    height: '300px',
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

  useEffect(() => {
    // fetch('http://localhost:5000/api/blog/all').then(res => {
    //   console.log(res, "111111111111111111111111111111");
    // })
    const articalArr = []
    fetch('http://localhost:5000/api/blog/all').then(req => req.json())
      .then(data => {
        console.log(data.data, "这是Data") //请求到的数据
        data.data.forEach(item => {
          console.log(item,"id");
          const articalList = {
            title: item.title,
            description: item.description,
            id:item._id
          }
          articalArr.push(articalList)
        })
        setMylist(articalArr)
        console.log(mylist,"111");
      })


  }, [value])
  console.log(mylist,"mylist");
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <h2 className="listTitle">近期活动</h2>
            <Carousel className="carousel_box" autoplay>
            <div className="activity_box">
                  <h1>神经网络</h1>
                  <h2>活动简介：这是活动简介</h2>
                  <h3>活动时间：2021.09.09</h3>
              </div>
              <div className="activity_box">
                  <h1>神经网络</h1>
                  <h2>活动简介：这是活动简介</h2>
                  <h3>活动时间：2021.09.09</h3>
              </div>
              <div className="activity_box">
                  <h1>神经网络</h1>
                  <h2>活动简介：这是活动简介</h2>
                  <h3>活动时间：2021.09.09</h3>
              </div>
            </Carousel>
          </div>
          <Divider />
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
            <h2 className="listTitle">最新文章</h2>
            <List
              // header={<h2 className="listTitle">最新文章</h2>}
              className="artical_show"
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title"><Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                  </div>
                  <div className="list-context">{item.description}</div>
                </List.Item>
              )}
            />
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

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios("http://localhost:5000/api/blog/all").then(
      (res) => {
        console.log('远程获取数据结果:', res)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home