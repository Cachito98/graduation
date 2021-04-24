import React ,{ useState, useEffect } from 'react'
// import BraftEditor from 'braft-editor'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb } from 'antd'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Suggest from '../components/Suggest'
import { useRouter } from 'next/router';




const BraftEditor = dynamic(
  import('../components/BraftEditor'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)
export default function addArtical() {
  const router = useRouter();
  const { username, isLogin } = router.query;
  const [value, setValue] = useState('');
  const [usernameCookie, setUsernameCookie] = useState('')
  const [isLoginCookie, setIsLoginCookie] = useState('')
  useEffect(() => {
    setIsLoginCookie(isLogin)
    setUsernameCookie(username)

    const articalArr = []
    // fetch(`http://localhost:5000/api/blog/blogs?username=${username}`).then(req => req.json())
    //     .then(data => {
    //         console.log(data, "这是Data") //请求到的数据
    //         if (data.data) {
    //             data.data.forEach(item => {
    //                 const articalList = {
    //                     title: item.title,
    //                     description: item.description,
    //                     id: item._id
    //                 }
    //                 articalArr.push(articalList)
    //             })
    //             setMylist(articalArr)
    //         }
    //     })


}, [value])
  return (

    <>
      <Head>
        <title>添加文章</title>
      </Head>
      <Header  isLogin={isLoginCookie} username={usernameCookie}/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>

            <BraftEditor></BraftEditor>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Suggest />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">

            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  )
}

