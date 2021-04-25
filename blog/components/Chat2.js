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
            MSG: [],
            userList: [],
            clickUser: null,
        }

    }
    componentDidMount() {
        let list = [];
        for (let i = 0; i < 14; ++i)
            list.push({
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                alt: 'Reactjs',
                title: '用户' + i,
                subtitle: 'What are you doing?',
                date: new Date(),
                unread: Math.floor(Math.random() * 10),
            });
        this.setState({ userList: list });
        this.setState({ clickUser: list[0] })
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
            MSG: MSG
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
                
                <Row>
                    
                    {this.state.userList.length == 0 ? <div>无私信</div> : <ChatWidget user={this.state.clickUser} />}

                </Row>
            </div>
        )
    }
}
class ChatWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: null,
            msgDataList: [],
            sendMsg: "",
            tips:''
        }
        this.clickButton = this.clickButton.bind(this);
        this.messagesEnd = createRef();
    }

    componentDidMount() {
       
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
            if (Number(type) === 0) {
                this.showTips(msg)
            }

        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ user: nextProps.user });
    }

    clickButton() {
        let list = this.state.msgDataList;
        list.push({
            position: 'right',
            type: 'text',
            text: this.state.sendMsg,
            date: new Date(),
        })
        this.setState({ msgDataList: list });
        this.setState({ sendMsg: "" });
        const ws = this.ws
        if (ws.readyState === 1) {
            ws.send(this.state.sendMsg);
        } else {
            console.log();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }
    showTips(msg){
        this.setState({
            tips:msg
        })
    }
    doMessage(msg) {
        console.log(msg, "msg");
        if (msg.name == "zhangsan") {
            return
        } else {
            let newReciveList = this.state.msgDataList
            newReciveList.push({
                position: 'left',
                type: 'text',
                text: msg.data,
                date: new Date(),
            });
            this.setState({
                ...this.state,
                msgDataList: newReciveList
            });
        }
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
            <Col style={{
                width: 500,
                height: 600,
                display: 'inline-block',
                border: "1px solid whitesmoke",
            }}>
                <Row>
                    <Col style={{
                        width: 500,
                        height: 40,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        // border: "1px solid pink"
                    }}>
                        {this.state.user == null ? "" : this.state.user.title}
                    </Col>
                </Row>
                <Row>
                    <div style={{
                        width: 500,
                        height: 420,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        overflow: "auto",
                        backgroundColor: "whitesmoke"
                    }}
                        ref={(el) => {
                            this.messagesEnd = el;
                        }}
                    >   
                        {/* {this.state.tips} */}
                        <MessageList
                            className='message-list'
                            dataSource={this.state.msgDataList}
                        />
                    </div>
                </Row>

                <Row>
                    <Col style={{
                        width: 500,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20
                    }}>

                        <TextArea rows={4} onChange={e => {
                            this.setState({ sendMsg: e.target.value });
                        }}
                            ref={el => (this.inputRef = el)}
                            value={this.state.sendMsg} />
                        <Button type="primary" onClick={this.clickButton}>发送</Button>
                    </Col>
                </Row>
            </Col>
        );
    }
}