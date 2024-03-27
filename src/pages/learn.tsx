import { Button } from 'antd'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


function Learn() {
  const rou1 = "/fore/learn/caselearn"
  const rou2 = "/fore/learn/examination"
  const navigate = useNavigate()
  return (
    <div style={{gap:"100px"}}>
        <Button type="primary" onClick={()=> {
          navigate(rou1)
        }}>病例学习</Button>
        <br></br>
        <Button type="primary" onClick={()=> {
          navigate(rou2)
        }}>测试</Button>
    </div>
      
  )
}

export default Learn
