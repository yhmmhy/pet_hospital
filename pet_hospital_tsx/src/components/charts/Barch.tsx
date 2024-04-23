import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Loadable from 'react-loadable';

const Bar = Loadable({
  loader: async () => {
    const bar = await import('@ant-design/plots/lib/components/bar');
    return bar;
  },
  loading: () => <div>Loading...</div>,
});


interface DataType {
  labelName: string,
  sum: number,
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
          sum: res.data.usernum,
        },
        {
          labelName: '病例',
          sum: res.data.casenum,
        },
        {
          labelName: '题库',
          sum: res.data.quesnum,
        },
        {
          labelName: '试卷',
          sum: res.data.papernum,
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
    yField: 'sum',
    paddingRight: 80,
    height:400,
    width:400,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }) => {
          return `${originData.sum}`;
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
