import React,{Component} from 'react';

import { Area } from '@ant-design/plots';

const DemoArea = () => {
    const config = {
        data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/aapl.json',
        },
        xField: (d) => new Date(d.date),
        yField: 'close',
    };

    return <Area {...config} />;
};
