import React, { useState } from 'react';
import { Space, Table, Button, Input, Tag, Dropdown, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined, DownOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
let data = [
    {
        key: '1',
        id: '1',
        title: '狗狗狗狗狗狗',
        a: '狗狗狗狗',
        b: '狗狗狗狗',
        c: '狗狗狗狗',
        d: '狗狗狗狗',
        classification: '接诊',
    },
    {
        key: '2',
        id: '2',
        title: '猫猫猫猫猫',
        a: '狗狗狗狗',
        b: '狗狗狗狗',
        c: '狗狗狗狗',
        d: '狗狗狗狗',
        classification: '接诊',

    },
    {
        key: '3',
        id: '3',
        title: '猫狗',
        a: '狗狗狗狗',
        b: '狗狗狗狗',
        c: '狗狗狗狗',
        d: '狗狗狗狗',
        classification: '接诊',

    },
    {
        key: '4',
        id: '4',
        title: '嘻嘻',
        a: '狗狗狗狗',
        b: '狗狗狗狗',
        c: '狗狗狗狗',
        d: '狗狗狗狗',
        classification: '接诊',
    }
];
function PoolManage(){
    const [tableData, setTableData] = useState(data);
    const [selectedDelRowKeys, setselectedDelRowKeys] = useState([]);
    const { Search } = Input;
    const onSearch = (value) => {
        const newdata = data.filter((obj) => {
            return obj.title.includes(value)
        })
        setTableData(newdata);
    };


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setselectedDelRowKeys(selectedRowKeys)
            console.log(selectedDelRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const deleteRow = (key) => {
        // console.log(record.key)
        const newdata = data.filter(item => item.key !== key);
        data = [...newdata];
        setTableData(tableData.filter(item => item.key !== key));
    };
    const deleteRows = () => {

        const newdata = data.filter(item => !selectedDelRowKeys.includes(item.key));
        data = [...newdata];
        setTableData(tableData.filter(item => !selectedDelRowKeys.includes(item.key)));
    }
    return (
        <div className='examination'>

            <Button className='addbtn' type="primary" size='middle'><FileAddOutlined />添加</Button>
            <Button className='deletebtn' type="primary" size='middle' danger onClick={deleteRows}><EditOutlined />删除</Button>
            <Search className='searchpaper' placeholder="input search text" onSearch={onSearch} enterButton style={{
                width: 304,
            }} />


            <Table rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }} className='etable' dataSource={tableData} pagination={{ pageSize: 7 }}>
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="题目" dataIndex="title" key="title" ellipsis="true" />
                <ColumnGroup title="选项">
                    <Column title="A" dataIndex="a" key="a" />
                    <Column title="B" dataIndex="b" key="b" />
                    <Column title="C" dataIndex="c" key="c" />
                    <Column title="D" dataIndex="d" key="d" />
                </ColumnGroup>
                <Column title="分类" dataIndex="classification" key="classification" />
                <Column title="操作" dataIndex="action" key="action" render={(_, record) => (
                    <Space size="middle">

                        <Button type="primary" size='small'><EditOutlined /></Button>
                        <Button type="primary" size='small' danger onClick={() => deleteRow(record.key)}><DeleteOutlined /></Button>

                    </Space>)}
                >
                </Column>
            </Table>
        </div>
    )
}
export default PoolManage