import React from 'react'
import './App.css'
import MyLayout from './components/MyLayout'
import {Route,Routes} from 'react-router-dom'
import CaseManage from './pages/casemanage'
import UserManage from './pages/usermanage'
import ExamManage from './pages/exammanage'
import PoolManage from './pages/poolmanage'
import AdminHome from './pages/adminhome'
import ChargeManage from './pages/chargemanage'
function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path='' element={<AdminHome />} />
        <Route path='case' element={<CaseManage />} />
        <Route path='user' element={<UserManage />} />
        <Route path='examination' element={<ExamManage />} />
        <Route path='pool' element={<PoolManage />} />
        <Route path='charge' element={<ChargeManage />} />
      </Routes>
    </MyLayout>
      
  )
}

export default App
