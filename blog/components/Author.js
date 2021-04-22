
import { Avatar, Divider } from 'antd'
import Link from 'next/link'

const Author = (props) => {

    return (
        <div className="author-div comm-box">
            {/* <Link href={{ pathname: '/userIfo', query: { id: item.id } }}> */}
            <Link href={{ pathname: '/userIfo' }}>
                <div> <Avatar src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3324287611,3832720410&fm=26&gp=0.jpg" size={150}  /></div>
                
            </Link>
            <div className="author-introduction">
                用户名：{props.username}<br></br>
                个人简介:
                {/* <Divider>社交账号</Divider>
                <Avatar size={28}  className="account" />
                <Avatar size={28}  className="account" />
                <Avatar size={28}  className="account" /> */}

            </div>
        </div>
    )

}

export default Author