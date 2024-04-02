import { Bar } from '@ant-design/plots';
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

const data = [
  {
    labelName: '用户',
    value: 10,
  },
  {
    labelName: '病例',
    value: 20,
  },
  {
    labelName: '题库',
    value: 30,
  },
  {
    labelName: '试卷',
    value: 40,
  },
];

const Barch = () => {
  axios.defaults.baseURL = 'http://localhost:3007';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  const [datasource, setDatasource] = useState(data)
  useEffect(() => {
    axios.get('/Home/Statistics').then((res) => {
      const source = [
        {
          labelName: '用户',
          value: res.data.data.usernum,
        },
        {
          labelName: '病例',
          value: res.data.data.casenum,
        },
        {
          labelName: '题库',
          value: res.data.data.quesnum,
        },
        {
          labelName: '试卷',
          value: res.data.data.papernum,
        },
      ]
      setDatasource(source)
    })
      .catch(error => {
        console.log(error);
      });
  }, [])
  const config = {
    data:datasource,
    xField: 'labelName',
    yField: 'value',
    paddingRight: 80,
    height:400,
    width:400,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }) => {
          return `${originData.value}`;
        },
        position: 'right',
        dx: 80,
        style: {
          fill: '#aaa',
          fillOpacity: 1,
          fontSize: 14,
        },
      },
      style: {
        fill: '#eee',
      },
    },
    scale: {
      y: {
        domain: [0, 1000],
      },
    },
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    interaction: {
      elementHighlightByColor: false,
    },
  };
  return <Bar {...config} />;
};

export default Barch;
