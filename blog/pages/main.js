import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image, Divider, Carousel } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Suggest from '../components/Suggest'

export default class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: []
        };
    }
    
    render() {
        const contentStyle = {
            height: '300px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          };
        return (
            <div>
                <Head>
                    <title>Home</title>
                </Head>
                <Header />
                <Row className="comm-main" type="flex" justify="center">
                    <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                        <div>
                            <h2 className="listTitle">近期活动</h2>
                            <Carousel className="carousel_box" autoplay>
                                <div>
                                    <Image
                                        width={300}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                </div>
                                <div>
                                    <h3 style={contentStyle}>2</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>3</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>4</h3>
                                </div>
                            </Carousel>
                        </div>
                        <Divider />
                        <div>
                           
                            <h2 className="listTitle">最新文章</h2>
                            <List
                                // header={<h2 className="listTitle">最新文章</h2>}
                                className="artical_show"
                                itemLayout="vertical"
                                dataSource={articleList}
                                renderItem={item => (
                                    <List.Item>
                                        <div className="list-title"><Link href={{ pathname: '/detailed' }}>
                                            <a>{item.title}</a>
                                        </Link>
                                        </div>
                                        <div className="list-context">{item.context}</div>
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

            </div>
        )
    }
}
