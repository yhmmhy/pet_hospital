import React from 'react';
import { Space, Table, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
function ExamManage(){
    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const data = [
        {
            key: '1',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',
        },
        {
            key: '2',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',

        },
        {
            key: '3',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',

        },
        {
            key: '4',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',
        },
        {
            key: '5',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',

        },
        {
            key: '6',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',
        },
        {
            key: '7',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',

        },
        {
            key: '8',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',
        },
        {
            key: '9',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',

        },
        {
            key: '10',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',
        },
        {
            key: '11',
            id: 'zhangsan',
            name: 'JimGreen',
            time: '12',
            grade: '100',

        },
    ];



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const columns = [
        {
            title: '试卷ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: '试卷名称',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: '考试时间(分钟)',
            dataIndex: 'time',
            key: 'time',

        },
        {
            title: '总分',
            key: 'grade',
            dataIndex: 'grade',

        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Button type="primary" size='small'><EditOutlined /></Button>
                    <Button type="primary" size='small' danger ><DeleteOutlined /></Button>

                </Space>


            ),
        },
    ];

    return (
        <div className='examination' >
            <Button className='addbtn' type="primary" size='middle'><FileAddOutlined />添加</Button>
            <Button className='deletebtn' type="primary" size='middle' danger><EditOutlined />删除</Button>
            <Search className='searchpaper' placeholder="input search text" onSearch={onSearch} enterButton style={{
                width: 304,
            }} />


            <Table rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }} className='etable' columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
        </div >
    )
}
export default ExamManage