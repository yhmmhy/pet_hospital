import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import axios from "axios";


const Piech = () => {
  axios.defaults.baseURL = 'http://47.102.142.153:5000';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  const [datasource, setDatasource] = useState([
    { role: '实习生', sold: 0.45 },
    { role: '管理员', sold: 0.55 },
  ])
  useEffect(() => {
    axios.get('/Home/Statistics').then((res) => {
      // const source = [
      //   { role: '实习生', sold: res.data.data.stunum / res.data.data.usernum },
      //   { role: '管理员', sold: res.data.data.adminnum / res.data.data.usernum },
      // ]
      // setDatasource(source)
      console.log(res)
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
