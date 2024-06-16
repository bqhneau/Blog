import { memo } from "react";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

const Menu = memo(() => {

    const {currentUser} = useSelector(state=>state.login)
    
    // 登录状态
    if (currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item" >
                    <Link to={"/"} className="nav-link">主页</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/article/new"} className="nav-link">写作</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/setting"} className="nav-link">设置</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                        <img
                            src={currentUser.avatar || 'http://localhost:8000/default.png'}
                            alt=""
                            className="user-pic"
                        />
                    </Link>
                </li>
            </ul>
        )
    } else {
        // 非登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">主页</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">登录</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/regist"} className="nav-link">注册</Link>
                </li>
            </ul>
        )
    }

})

export default Menu