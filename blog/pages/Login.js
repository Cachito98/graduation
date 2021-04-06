import React, { useState } from 'react';
import { Alert, Space, message, Tabs, Button, Form, Input, Checkbox, Cascader, Select, Row, Col, AutoComplete,Card } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const hello = () => {
    console.log("object");
    fetch('/api/user/tt').then(res => {
        console.log(res, "111111111111111111111111111111");
    })
    fetch('/api/user/tt').then(res => {
        res.json().then((data) => {
            console.log(data, "22222222222222222222222222222");
        })
    })
}
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
function callback(key) {
    console.log(key);
}

const residences = [
    {
        value: '本科',
        label: '本科',

    },
    {
        value: '研究生',
        label: '研究生',

    },
];

export default function Login() {

    const [form] = Form.useForm();

    const onFinish2 = (values) => {
        console.log('Received values of form: ', values);
    };


    const [autoCompleteResult, setAutoCompleteResult] = useState([]);



    const onFinish = (values) => {
        console.log('Success:', values);
        fetch('/api/user/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({//请求的参数
                values
            })
        }).then(res => res.json()).then(data => {
            console.log(data) //请求的结果
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="loginBox">
            <Card className="CardBox" style={{ width: 450  }}>
            <Tabs  centered defaultActiveKey="1" onChange={callback}>
                <TabPane className="logincontentBox"  tab="登录" key="1">
                    <Form 
                        className="logincontentBox"
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            label="账号"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
        </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                    <Form
                    className="logincontentBox"
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish2}
                        initialValues={{
                            residence: ["本科"],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="username"
                            label="账号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号！',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="邮箱"
                            rules={[
                                {
                                    type: 'email',
                                    message: '请输入正确的邮箱格式',
                                },
                                {
                                    required: true,
                                    message: '邮箱不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="school"
                            label="学校"
                            rules={[

                                {
                                    required: true,
                                    message: '学校不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="residence"
                            label="学历"
                            rules={[
                                {
                                    // type: 'array',
                                    required: true,
                                    message: '请选择您的学历',
                                },
                            ]}
                        >
                            <Select style={{ width: 120 }}>
                                <Option value="本科">本科</Option>
                                <Option value="研究生">研究生</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请再次确认密码！',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('两次密码不匹配！'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            label="昵称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入昵称！',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>




                        {/* <Form.Item label="Captcha" extra="验证这是你本人操作">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Please input the captcha you got!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>验证</Button>
                </Col>
              </Row>
            </Form.Item> */}

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                                我已阅读 <a href="">“声明”</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                注册
                        </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>

            </Card>

        </div>

    )
}
