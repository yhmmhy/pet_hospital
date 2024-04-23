import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReactEcharts from 'echarts-for-react'

axios.defaults.baseURL = 'http://47.102.142.153:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const option = {
  title: {
    text: '数据量柱状图',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};



const Barch: React.FC = () => {
  const [options, setOptions] = useState(option);
  useEffect(() => {
    axios.get('/admin').then((res) => {
      const option = {
        title: {
          text: '数据量柱状图',
        },
        xAxis: {
          type: 'category',
          data: ["用户", "病例", "题目", "试卷"],
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [res.data.usernum, res.data.casenum, res.data.quesnum, res.data.papernum],
            type: 'bar'
          }
        ]
      };
      setOptions(option)
    })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return <ReactEcharts option={options} notMerge={true}
    lazyUpdate={true}
    style={{ width: '50%', height: '500px' }} />
}


export default Barch;
