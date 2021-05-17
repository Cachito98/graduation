import React, { useState, useEffect, Children } from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb, Carousel, Input, Card, Tabs, Descriptions, Divider, Button, Statistic, Image, Empty } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Cookies from 'js-cookie'
const { TabPane } = Tabs;
import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined,
    LikeOutlined,
    LikeTwoTone,
    BankTwoTone,
    IdcardTwoTone,
    CodepenOutlined,
    FireTwoTone
} from '@ant-design/icons';
import axios from "axios";
import servicePath from "../config/apiUrl";
import { Avatar } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import User from '../components/User'
import Searcharticle from '../components/SearchArticle';
import SuggestArt from "../components/SuggestArt"
// import userArticle from '../components/userArticle';
const { Search } = Input;

const searchPage = () => {
    const router = useRouter();
    const { user, power, isLogin } = router.query;
    const [value, setValue] = useState('');
    const [usernameCookie, setUsernameCookie] = useState('')
    const [isLoginCookie, setIsLoginCookie] = useState('')
    const [powerCookie, setPowerCookie] = useState('')
    const [userinfo, setUserinfo] = useState([])
    const [searchusername, setsearchusername] = useState('')
    const [searchtags, setsearchtags] = useState('')
    const [searchList, setsearchList] = useState('')
    const [suggestList, setSuggestList] = useState('')
    const [searchresult, setSearchresult] = useState(0)
    const [alldata, setalldata] = useState('')
    const [mylist, setMylist] = useState([])
    function callback(key) {
        console.log(key);
    }
    useEffect(() => {
        setIsLoginCookie(isLogin)
        setPowerCookie(power)
        setUsernameCookie(user)


        const articalArr = []
        fetch(`http://localhost:5000/api/blog/all`).then(req => req.json())
            .then(data => {
                console.log(data, "这是所有文章Data") //请求到的数据
                if (data.data) {
                    setalldata(data.data)
                }
            })


    }, [value])
    // console.log(userinfo, "userinfo")
    const onSearch = value => console.log(value);
    const usernameInput = (e) => {
        setsearchusername(e.target.value)
    }
    const tagsInput = (e) => {
        setsearchtags(e.target.value)
        // console.log(searchtags)
    }
    const dosearchtags = () => {
        // let newarr = [searchList]
        let newarr = ['']
        // let newarr = ''
        // setSearchresult(0)
        // let searchresult = 0
        console.log("执行搜索")
        alldata.filter(e => {
            if (e.username && e.username == searchtags) {
                newarr.push(e)
                setsearchList(newarr)
                setSuggestList(newarr)
                setSearchresult(searchresult+1)
                console.log("添加一条数据")
            }
            if (e.tags && e.tags.filter(item => {
                if (item === searchtags) {
                    newarr.push(e)
                    setsearchList(newarr)
                    setSuggestList(newarr)
                    setSearchresult(searchresult+1)
                    console.log(searchresult, "添加一条数据")

                }
            })) {
                // console.log(e,"找到关键字值")
                console.log(searchresult)
            } else {
                console.log("都没有找到")
            }

        })
                    console.log(searchresult, "1====")
        // if (searchresult == 0) {
        //     setsearchList('')
        //     console.log("置空")
        // }
        // Cookies.set("newarr", newarr, { path: '/' });
    }
    const searchuser = () => {
        fetch(`http://localhost:5000/api/blog/blogs?username=${searchusername}`).then(req => req.json())
            .then(data => {
                console.log(data, "这是Data") //请求到的数据
                if (data.data) {
                    setsearchList(data.data)
                }
            })
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header isLogin={isLoginCookie} username={usernameCookie} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={30} xl={14}  >
                    <h2 className="biaoti">搜索</h2>
                    <div className="search_box">
                        {/* <div className="search_1"><Input placeholder="根据用户名查找成果" onChange={usernameInput} prefix={<SearchOutlined />} /><Button type="link" onClick={searchuser} size={40}>搜索</Button></div> */}
                        <div className="search_1"><Input placeholder="请输入作者或关键字" onChange={tagsInput} prefix={<SearchOutlined />} /><Button type="link" onClick={dosearchtags} size={50}>搜索</Button></div>
                    </div>
                    <h3 className="biaoti">热门搜索</h3>
                    <div className="search_1">
                        <Button type="link" size={50}><FireTwoTone />神经网络</Button>
                        <Button type="link" size={50}><FireTwoTone />人工智能</Button>
                        <Button type="link" size={50}><FireTwoTone />智能学习</Button>
                        {/* <Button type="link" size={50}><FireTwoTone />搜索</Button> */}
                    </div>

                    <Divider />
                    <h2 className="biaoti">搜索结果</h2>
                    {
                        searchList == '' && <div><Empty /></div>
                    }
                    {
                        searchList &&
                        <div>
                            {searchList.map((item, index) => {
                                // console.log(item, "item")
                                if (item.reviewM == "1" && item.isBad == "0") {
                                    return (
                                        <Link key={index} href={{ pathname: '/detailed', query: { id: item._id, user: user, power: power } }}>
                                            <div className="article_box">
                                                <div className="article_box_left">

                                                    <h2 className="list-title"><CodepenOutlined />{item.title}</h2>
                                                    <p >作者：{item.username}</p>
                                                    {/* <p >发布时间：{item.updated}</p> */}
                                                    <p>简介：{item.description}</p>
                                                    <p>关键词：{item.tags.map(e => { return e + ";" })}</p>
                                                    <p>点赞数：{item.likes}</p>

                                                </div>
                                                <div className="article_box_right">
                                                    <img className="article_img" src={item.blogimgurl}></img>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                } else {
                                    <Empty />
                                }

                            })}
                        </div>



                    }
                    <Divider />
                    <h2 className="biaoti">为您推荐</h2>
                    {/* <SuggestArt></SuggestArt> */}
                    <Carousel autoplay>
                        {
                            suggestList ?
                                suggestList.map((item, index) => {
                                    // console.log(item, "item")
                                    if (item.reviewM == "1" && item.isBad == "0" && index < 3) {
                                        return (
                                            <div>
                                                <Link key={index} href={{ pathname: '/detailed', query: { id: item._id, user: user, power: power } }}>
                                                    <div className="article_box1">
                                                        <div className="article_box_left">
                                                            <h2 className="list-title"><CodepenOutlined />{item.title}</h2>
                                                            <p >作者：{item.username}</p>
                                                            {/* <p >发布时间：{item.updated}</p> */}
                                                            <p>简介：{item.description}</p>
                                                            <p>关键词：{item.tags.map(e => { return e + ";" })}</p>
                                                            <p>点赞数：{item.likes}</p>
                                                        </div>
                                                        <div className="article_box_right">
                                                            <img className="article_img" src={item.blogimgurl}></img>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    } else {
                                        <Empty />
                                    }
                                })
                                :
                                <SuggestArt></SuggestArt>
                        }
                    </Carousel>

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

export default searchPage
