import { PureComponent } from "react";
import {Link} from 'react-router-dom'

class Home extends PureComponent {
    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">
                    {/* 测试样式 */}
                    <Link to={"/"} className="navbar-brand"> 个人博客</Link>

                    {/* 测试图标 */}
                    <div className="iconfont icon-gift"></div>
                </div>
            </nav>
        )
    }
}

export default Home