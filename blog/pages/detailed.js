
import React, { useEffect,useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb } from 'antd'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MarkNav from 'markdown-navbar';
import Suggest from '../components/Suggest'

import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from "../config/apiUrl";
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import CommentCom from '../components/Comment'
import ReactMarkdown from 'react-markdown'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';


const Detailed = (props) => {
  const router = useRouter();

  // const renderer = new marked.Renderer();
  const { id} = router.query;
  console.log(id);

  let markdown = ''
  const tocify = new Tocify()
  const [value, setValue] = useState('');

  const [articaldetail, setArticaldetail] = useState(
    [

    ]
  )
  useEffect(() => {
    console.log(id,"id");
     
    fetch(`http://localhost:5000/api/blog/art?_id=${id}`).then(req => req.json())
      .then(data => {
        console.log(data.data[0],"--------------");
        setArticaldetail(data.data[0])
        console.log(articaldetail,"articaldetail");
        // console.log(data.data, "这是Data") //请求到的数据
        // data.data.forEach(item => {
        //   console.log(item.id,"id");
        //   const articalList = {
        //     title: item.title,
        //     context: item.content,
        //     id:item._id
        //   }
        //   articalArr.push(articalList)
        // })
        // setMylist(articalArr)
        // console.log(mylist,"111");
      })


  }, [value])
  // renderer.heading = function (text, level, raw) {
  //   const anchor = tocify.add(text, level);
  //   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  // };
  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];
  

  // let html = marked(props.article_content)

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>课题研究</Breadcrumb.Item>
                <Breadcrumb.Item>神经网络课题研究</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {articaldetail.title}
                </div>

              <div className="list-icon center">
                <span><CalendarOutlined /> 2019-06-28</span>
                <span><FolderOutlined /> 课题研究</span>
                <span><FireOutlined /> 5498人</span>
              </div>

              {/* <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}>
              </div> */}
              <div className="detailed-content" >
                <ReactMarkdown
                  source={articaldetail.content}
                  escapeHtml={false}
                />
              </div>
            </div>
            {/* <List
              className="comment-list"
              header={`${data.length} replies`}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />, */}
          </div>
          <CommentCom id={id} />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Suggest/>
          <Affix offsetTop={5}>
            
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  )
}

Detailed.getInitialProps = async (context) => {

  console.log(context.query.id,"`111")
  // let id = context.query.id
  const promise = new Promise((resolve) => {

    // axios.get("http://localhost:5000/api/blog/art",{params:{_id:context.query.id}}).then(
    //   (res) => {
    //     console.log(res)
    //     // resolve(res.data.data[0])
    //   }
    
    // )
    axios.get(`http://localhost:5000/api/blog/art?_id=${context.query.id}`,).then(
      (res) => {
        console.log('远程获取数据结果:', res.data.data[0])
       
        // setMylist(res.data.data[0])
        // console.log(object);
        resolve(res.data,"res.data.data[0]")
      }
    )
  })

  return await promise
}

export default Detailed