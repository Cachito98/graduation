
import React, { useState, useEffect } from 'react';
import '../style/ArticalList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
// import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;

function Userlist(props) {
    const getList = () => {

        axios.get('http://localhost:5000/api/user/all')
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
                            <b>用户名</b>
                        </Col>
                        <Col span={3}>
                            <b>学校</b>
                        </Col>
                        <Col span={3}>
                            <b>学历</b>
                        </Col>
                        <Col span={3}>
                            <b>邮箱</b>
                        </Col>
                        <Col span={3}>
                            <b>手机号</b>
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
                                {item.username}
                            </Col>
                            <Col span={3}>
                                {item.school}
                            </Col>
                            <Col span={3}>
                                {item.edu}
                            </Col>
                            <Col span={3}>
                               {item.email}
                            </Col>
                            <Col span={3}>
                                {item.phone}
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

export default Userlist