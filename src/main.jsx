import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 1、引入 history 路由模式
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2、嵌套并使用 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
