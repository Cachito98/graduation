
import React, { useState, useEffect } from 'react';
import '../style/ArticalList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
// import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;

function ArticleList(props) {
    const getList = () => {

        axios.get('http://121.4.126.143:5000/api/blog/all')
            .then(function (e) {
                console.log(e.data.data);
                setList(e.data.data)  
            })
            .catch(function (error) {
                console.log(error);
            });



    }
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>作者</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>描述</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.username}
                            </Col>
                            <Col span={3}>
                                {item.updated}
                            </Col>
                            <Col span={3}>
                                <span>{item.description}</span>
                            </Col>
                            <Col span={3}>
                                {item.reviewM}
                            </Col>

                            <Col span={4}>
                                <Button type="primary" >修改</Button>&nbsp;

                              <Button >删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )

}

export default ArticleList