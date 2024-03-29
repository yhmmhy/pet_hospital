import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const Piech = () => {
  const config = {
    data: [
      { role: '实习生', sold: 0.45 },
      { role: '管理员', sold: 0.55 },
    ],
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
