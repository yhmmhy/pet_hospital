import React from 'react'
import ReactDOM from 'react-dom/client'
import zhCN from 'antd/lib/locale/zh_CN'
import ConfigProvider from 'antd/lib/config-provider'
import {HashRouter as Router,Route,Routes} from'react-router-dom/dist'


const Login = React.lazy(() => import('./pages/login.tsx'));
const App = React.lazy(() => import('./App.tsx'));
const App2 = React.lazy(() => import('./App2.tsx'));

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
