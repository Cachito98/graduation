import React, {createRef} from "react";
import {ChatList, MessageList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import {Button, Row, Col, Divider, Input} from "antd";

const {TextArea} = Input;

class ChatWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            msgDataList: [],
            sendMsg: "",
        }
        this.clickButton = this.clickButton.bind(this);
        this.messagesEnd = createRef();
    }

    componentDidMount() {
        let list = [];
        for (let i = 0; i < 10; ++i)
            list.push({
                position: 'left',
                type: 'text',
                text: 'hello' + i,
                date: new Date(),
            });
        this.setState({msgDataList: list});
        this.setState({user: this.props.user});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({user: nextProps.user});
    }

    clickButton() {
        let list = this.state.msgDataList;
        list.push({
            position: 'right',
            type: 'text',
            text: this.state.sendMsg,
            date: new Date(),
        })
        this.setState({msgDataList: list});
        this.setState({sendMsg: ""});
        sendmessage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }

    render() {

        return (
            <Col style={{
                width: 500,
                height: 600,
                display: 'inline-block',
                border: "1px solid whitesmoke",
                // border: "1px solid red",
                // borderTop: "1px solid",
                // borderBottom: "1px solid",
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
                            this.setState({sendMsg: e.target.value});
                        }}
                                  ref={el => (this.inputRef = el)}
                                  value={this.state.sendMsg}/>
                        <Button type="primary" onClick={this.clickButton}>??????</Button>
                    </Col>
                </Row>
            </Col>
        );
    }
}

class PrivateChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            clickUser: null,
        }
    }

    componentDidMount() {
            // let list = [];
            // for (let i = 0; i < 14; ++i)
            //     list.push({
            //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            //         alt: 'Reactjs',
            //         title: '??????' + i,
            //         subtitle: 'What are you doing?',
            //         date: new Date(),
            //         unread: Math.floor(Math.random() * 10),
            //     });
            // this.setState({userList: list});
            // this.setState({clickUser: list[0]});
    }
    render() {
        const ws = new WebSocket('ws://localhost:4000');
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
            console.log("?????????????????????");
        }
        ws.onmessage = function (event) {
            var data = JSON.parse(event.data)
            // ????????????
            console.log(data, "???????????????");
        };
        function sendmessage(){
            if (ws.readyState===1) {
                ws.send("??????");
            }else{
                //do something
                console.log();
            }
        }
        return (
            <div>
                <Divider orientation="left" style={{color: '#333', fontWeight: 'normal'}}>
                    ?????????
                </Divider>

                <Row>
                    <Col style={{
                        // width: '40%',
                        height: 600,
                        display: 'inline-block',
                        // border: "1px solid",
                        overflow:"auto"
                    }}>
                        <ChatList
                            className='chat-list'
                            onClick={e => this.setState({clickUser: e})}
                            dataSource={this.state.userList}/>
                    </Col>
                    {this.state.userList.length == 0 ? <div>?????????</div> : <ChatWidget user={this.state.clickUser}/>}

                </Row>

            </div>
        );
    }
}

export default PrivateChatView;
