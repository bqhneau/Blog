import { PureComponent } from "react";
import { Link } from 'react-router-dom'
import Menu from "./menu";

const user = {
    avatar:null
}

class Header extends PureComponent{
    render() {
        return (
            <>
                <nav className="navbar navbar-light">
                    <div className="container">
                        {/* 测试样式 */}
                        <Link to={"/"} className="navbar-brand"> 个人博客</Link>

                        <Menu user={ null } />
                    </div>
                </nav>
            </>
        )
    }
}

export default Header