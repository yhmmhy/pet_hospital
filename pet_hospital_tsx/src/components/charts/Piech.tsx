import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import axios from "axios";
interface DataType {
  role: string,
  sold: number,
}

const Piech = () => {
  axios.defaults.baseURL = 'http://47.102.142.153:5000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const [datasource, setDatasource] = useState<DataType[]>()
  useEffect(() => {
    axios.get('/admin').then((res) => {
      const source = [
        { role: '实习生', sold: res.data.stunum / res.data.usernum },
        { role: '管理员', sold: res.data.adminnum / res.data.usernum },
      ]
      setDatasource(source)

    })
      .catch(error => {
        console.log(error);
      });
  }, [])
  const config = {
    data: datasource,
    angleField: 'sold',
    colorField: 'role',
    legend: false,
    label: {
      text: ({ role, sold }) => {
        return `${role}: ${parseInt(sold * 100)}%`;
      },
      fill: '#fff',
      fontSize: 18,
    },
    style: {
      padding: 10,
      fill: ({ role }) => {
        if (role === '实习生') {
          return 'p(a)https://gw.alipayobjects.com/zos/antfincdn/FioHMFgIld/pie-wenli1.png';
        }
        return 'p(a)https://gw.alipayobjects.com/zos/antfincdn/Ye2DqRx%2627/pie-wenli2.png';
      },
    },
  };
  return <Pie {...config} />;
};

export default Piech
