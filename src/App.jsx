import Header from './components/Header'
import {useRoutes} from 'react-router-dom';
import routes from './routes';

function App() {
  // 1、通过 useRoutes 使用路由表
  const element = useRoutes(routes)

  return (
    <>
      {/* 引入公共组件 header */}
      <Header />
      {/* 2、将 element 放到页面上 */}
      <div>
        {element}
      </div>
    </>
  )
}

export default App
