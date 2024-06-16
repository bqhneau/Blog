import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 1、引入 history 路由模式
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // 嵌套并使用
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
