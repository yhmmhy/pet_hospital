import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import App2 from './App2.tsx'
import zhCN from 'antd/lib/locale/zh_CN'
import {ConfigProvider} from 'antd'
import {HashRouter as Router,Route,Routes} from'react-router-dom'
import Login from './pages/login.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/index/*' element={<App />} />
        <Route path='/fore/*' element={<App2 />} />
      </Routes>
    </ConfigProvider>
  </Router>
  
)
