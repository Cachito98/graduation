import React, { Component } from 'react'

import { createRef } from "react";
import { ChatList, MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Button, Row, Col, Divider, Input, List, Avatar } from "antd";

const { TextArea } = Input;
const Msg = [{
    title: 'zhansan',
    content: '你好'
},
{
    title: 'lisi',
    content: '你好'
},
{
    title: 'wangwu',
    content: '你好'
},
{
    title: 'liliu',
    content: '你好'
},]

export default class Chat2 extends Component {
    ws = null;
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            msgDataList: [],
            sendMsg: "",
            MSG: []
        }

    }
    componentDidMount() {

        // 调用websoket 聊天室
        fetch('http://localhost:5000/api/chat/enter?username=zhangsan').then(req => req.json())
            .then(data => {

                console.log("加入成功");
            })
        this.ws = new WebSocket('ws://localhost:4000');
        const ws = this.ws
        console.log("ws", ws)

        switch (ws.readyState) {
            case WebSocket.CONNECTING:
                console.log("CONNECTING");
                break;
            case WebSocket.OPEN:
                console.log("OPEN");

                break;
            case WebSocket.CLOSING:
                console.log("CLOSING");
                break;
            case WebSocket.CLOSED:
                console.log("CLOSED");
                break;
            default:
                // this never happens
                break;
        }
        ws.onopen = function () {
            ws.send('zhangsan');
            console.log("链接服务器成功");
        }
       
        ws.onmessage = event => {
            console.log(event, "event");
            const { type, msg } = JSON.parse(event.data);
            console.log("type", type)
            if (Number(type) === 2) {
                this.doMessage(msg)
            }

        };

        // function sendmessage() {
        //     if (ws.readyState === 1) {
        //         ws.send("你好");
        //     } else {
        //         //do something
        //         console.log();
        //     }
        // }
    }

    doMessage(msg) {
        const { MSG } = this.state;
        if (!msg) return
        const { name, data } = msg
        console.log("doMessage:", MSG)
        let arr = {
                title: msg.name,
                content: msg.data
        }
        MSG.push(arr)
        this.setState({
            MSG:MSG
        })
        

    }



    sendmessage() {
        console.log("点击按钮");
        const ws = this.ws
        if (ws.readyState === 1) {
            ws.send("你好");
        } else {
            //do something
            console.log();
        }
    }

    render() {

        return (
            <div>
                <div className="chat_box">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.MSG}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.title}
                                    description={item.content}
                                />
                            </List.Item>
                        )}
                    />,</div>

                <Input ></Input>
                <Button onClick={this.sendmessage.bind(this)}>发送数据</Button>
            </div>
        )
    }
}
