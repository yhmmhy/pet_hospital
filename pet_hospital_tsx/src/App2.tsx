import React, { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import View from './pages/view'
import RolePlay from './pages/roleplay'
import ForeLayout from './components/ForeLayout'
import Home from './pages/home'
import CaseLearn from './pages/caselearn'
import Examination from './pages/examination'


function App2() {
  return (
    <ForeLayout>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='view' element={<View />} />
        <Route path='roleplay' element={<RolePlay />} />
        <Route path='examination' element={<Examination />} />
        <Route path='caselearn' element={<CaseLearn />} />
      </Routes>
    </ForeLayout>
      
  )
}

export default App2
