  // @ts-nocheck
import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import TestContent from './TestContent'
import axios from 'axios'
const { Header, Content, Footer, Sider } = Layout;
import { Statistic } from 'antd';
const { Countdown } = Statistic;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
let outpooldata = [
    {
        key: '1',
        id: '1',
        title: '狗狗狗狗狗狗',
        A: '狗狗狗狗',
        B: '狗狗狗狗',
        C: '狗狗狗狗',
        D: '狗狗狗狗',
        type: '接诊',
        rightchoice: 'A'
    },
    {
        key: '2',
        id: '2',
        title: '猫猫猫猫猫',
        A: '狗狗狗狗',
        B: '狗狗狗狗',
        C: '狗狗狗狗',
        D: '狗狗狗狗',
        type: '接诊',
        rightchoice: 'B'
    },
    {
        key: '3',
        id: '3',
        title: '猫狗',
        A: '狗狗狗狗',
        B: '狗狗狗狗',
        C: '狗狗狗狗',
        D: '狗狗狗狗',
        type: '接诊',
        rightchoice: 'C'
    },
    {
        key: '4',
        id: '4',
        title: '嘻嘻',
        A: '狗狗狗狗',
        B: '狗狗狗狗',
        C: '狗狗狗狗',
        D: '狗狗狗狗',
        type: '接诊',
        rightchoice: 'D'
    }
];
let outdata = [
    {
        key: '1',
        id: '1',
        name: 'JimGreen',
        time: '0.1',
        grade: '100',
        selected: [{ key: '1', score: 20 }, { key: '2', score: 80 }],
        record: []
    },
    {
        key: '2',
        id: '2',
        name: 'lisi',
        time: '13',
        grade: '10',
        selected: [{ key: '2', score: 2 }, { key: '3', score: 8 }],
        record: []
    },
    {
        key: '3',
        id: '3',
        name: 'wangwu',
        time: '50',
        grade: '80',
        selected: [{ key: '3', score: 20 }, { key: '4', score: 60 }],
        record: []
    },
    {
        key: '4',
        id: '4',
        name: 'zhangsan',
        time: '70',
        grade: '70',
        selected: [{ key: '4', score: 20 }, { key: '1', score: 50 }],
        record: []
    },
];
const TestLayout = () => {
    const [data, setdata] = useState([])
    const [pooldata, setpooldata] = useState([])
    const [time, settime] = useState([])
    const [isStart, setisStart] = useState(false)
    const [countEnd, setcountEnd] = useState(false)
    const [items, setitems] = useState([])
    const [selectkey, setselectkey] = useState('1')
    const fetchData = async () => {
        try {
            const response = await axios.get('http://47.102.142.153:5000/test-paper/get');
            console.log(response)
            const parsedData = response.data.exams.map(item => {
                return {
                    ...item,
                    selected: item.selected
                };
            });
            // console.log(parsedData)
            outdata = parsedData
            const newitems = outdata.map((item) => (
                {
                    key: item.key,
                    icon: React.createElement(FileTextOutlined),
                    label: ` ${item.name}`,
                }
            ))
            setitems(newitems)

            setselectkey((prev) => parsedData[0].key)
            settime((prev) => parsedData[0].time)
            // console.log(parsedData[0].key)
            // setData(parsedData)
            // data = parsedData
            // console.log(data)
            // setTableData(parsedData)
            // console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
        // Cleanup function if needed
        return () => {
            // Any cleanup code goes here, if needed
        };
    }, []);


    // setdata(outdata)
    // setpooldata(outpooldata)
    const countdownStart = () => {
        setisStart(true)
    }
    const handleClick = (e) => {
        if (isStart) {
            alert('考试进行中，离开先交卷')
        }
        else {


            const clickedKey = e.key;
            const selectedItem = outdata.find(item => item.key === clickedKey);
            if (selectedItem) {
                settime(selectedItem.time);
            }
            // console.log(time)
            console.log(selectedItem.key)
            setselectkey(prev => selectedItem.key)
        }
    };
    const onFinish: CountdownProps['onFinish'] = () => {
        setcountEnd(true)
        setisStart(false)
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const changeisStart = () => {
        setisStart(false)
    }

    return (
        <Layout>

            <Content
                style={{
                    padding: '0 0px',
                }}
            >

                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            selectable={!isStart}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}
                            items={items}
                            onClick={handleClick}
                        />
                    </Sider>

                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                            maxHeight: 750,
                            overflowY: 'scroll',
                        }}
                    >
                        <Header style={{ padding: 0, background: colorBgContainer, position: 'sticky', top: '0px', zIndex: 1 }}>
                            {isStart && (<Countdown title="Countdown" value={Date.now() + time * 60 * 1000} onFinish={onFinish} />)}
                        </Header>
                        <TestContent data={data} pooldata={pooldata} countdownStart={countdownStart} countEnd={countEnd} changeisStart={changeisStart} selectkey={selectkey}></TestContent>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};
export default TestLayout;