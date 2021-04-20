
import { Avatar, Divider } from 'antd'
import Link from 'next/link'

const Author = (props) => {

    return (
        <div className="author-div comm-box">
            {/* <Link href={{ pathname: '/userIfo', query: { id: item.id } }}> */}
            <Link href={{ pathname: '/userIfo' }}>
                <div> <Avatar size={100} src="" /></div>
                
            </Link>
            <div className="author-introduction">
                用户名：{props.username}
                {/* <Divider>社交账号</Divider>
                <Avatar size={28}  className="account" />
                <Avatar size={28}  className="account" />
                <Avatar size={28}  className="account" /> */}

            </div>
        </div>
    )

}

export default Author