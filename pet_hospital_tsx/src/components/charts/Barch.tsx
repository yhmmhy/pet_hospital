import { Bar } from '@ant-design/plots';
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

interface DataType {
  labelName: string,
  value: number,
}

const Barch = () => {
  axios.defaults.baseURL = 'http://47.102.142.153:5000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const [datasource, setDatasource] = useState<DataType[]>()
  useEffect(() => {
    axios.get('/admin').then((res) => {
      const source = [
        {
          labelName: '用户',
          value: res.data.usernum,
        },
        {
          labelName: '病例',
          value: res.data.casenum,
        },
        {
          labelName: '题库',
          value: res.data.quesnum,
        },
        {
          labelName: '试卷',
          value: res.data.papernum,
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
        domain: [0, 100],
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
