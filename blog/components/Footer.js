import { List, Typography, Divider } from 'antd';
const data = [
    <a>www.baidu.com</a>,
    <a>www.baidu.com</a>,
    <a>www.baidu.com</a>,
];
const Footer = () => (
    <div className="footer-div">
        <div className="footer-son">
            <List
                size="small"
                header={<h3>相关链接:</h3>}
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
        <div className="footer-son">
            <List
                size="small"
                header={<h3>资料下载:</h3>}
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>

    </div>
)

export default Footer