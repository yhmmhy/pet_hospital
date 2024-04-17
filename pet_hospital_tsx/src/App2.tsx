import React from 'react'
import {Route,Routes} from 'react-router-dom'
import View from './pages/view'
import RolePlay from './pages/roleplay'
import ForeLayout from './components/ForeLayout'
import Home from './pages/home'
import CaseLearn from './pages/caselearn'
import Examination from './pages/examination'
import CaseList from './pages/caselist'
import Show from './pages/show'
import BasicTable from './pages/BasicTable'
function App2() {
  return (
    <ForeLayout>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='BasicTable' element={<BasicTable />} />
        <Route path='roleplay' element={<RolePlay />} />
        <Route path='examination' element={<Examination />} />
        <Route path='caselearn/*' element={<CaseLearn />} />
        <Route path='caselearn/caselist' element={<CaseList />}/>
        <Route path='caselearn/caseshow' element={<Show />}/>
      </Routes>
    </ForeLayout>
      
  )
}

export default App2