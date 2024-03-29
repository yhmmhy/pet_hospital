import { Bar } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

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
  const config = {
    data,
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
