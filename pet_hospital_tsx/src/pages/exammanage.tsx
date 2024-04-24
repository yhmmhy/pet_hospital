// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input, Form, Modal, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import axios from 'axios'
import querystring from 'querystring';
// let pooldata = [
//     {
//         key: '1',
//         id: '1',
//         title: '狗狗狗狗狗狗',
//         A: '狗狗狗狗',
//         B: '狗狗狗狗',
//         C: '狗狗狗狗',
//         D: '狗狗狗狗',
//         type: '接诊',
//         rightchoice: 'A'
//     },
//     {
//         key: '2',
//         id: '2',
//         title: '猫猫猫猫猫',
//         A: '狗狗狗狗',
//         B: '狗狗狗狗',
//         C: '狗狗狗狗',
//         D: '狗狗狗狗',
//         type: '接诊',
//         rightchoice: 'B'
//     },
//     {
//         key: '3',
//         id: '3',
//         title: '猫狗',
//         A: '狗狗狗狗',
//         B: '狗狗狗狗',
//         C: '狗狗狗狗',
//         D: '狗狗狗狗',
//         type: '接诊',
//         rightchoice: 'C'
//     },
//     {
//         key: '4',
//         id: '4',
//         title: '嘻嘻',
//         A: '狗狗狗狗',
//         B: '狗狗狗狗',
//         C: '狗狗狗狗',
//         D: '狗狗狗狗',
//         type: '接诊',
//         rightchoice: 'D'
//     }
// ];
// let data = [
//     {
//         key: '1',
//         id: '1',
//         name: 'JimGreen',
//         time: '12',
//         grade: '100',
//         selected: [{ key: '1', score: 20 }, { key: '2', score: 80 }],
//         record: []
//     },
//     {
//         key: '2',
//         id: '2',
//         name: 'lisi',
//         time: '13',
//         grade: '10',
//         selected: [{ key: '2', score: '2' }, { key: '3', score: '8' }],
//         record: []
//     },
//     {
//         key: '3',
//         id: '3',
//         name: 'wangwu',
//         time: '50',
//         grade: '80',
//         selected: [{ key: '3', score: '20' }, { key: '4', score: '60' }],
//         record: []
//     },
//     {
//         key: '4',
//         id: '4',
//         name: 'zhangsan',
//         time: '70',
//         grade: '70',
//         selected: [{ key: '4', score: '20' }, { key: '1', score: '50' }],
//         record: []
//     },

// ];
let data = []
let pooldata = []
function ExamManage() {
    // let [data, setData] = useState([]);
    // let data = []
    const { Search } = Input;
    const [tableData, setTableData] = useState([]);
    const [selectedDelRowKeys, setselectedDelRowKeys] = useState([]);
    const [selectedAddRowKeys, setselectedAddRowKeys] = useState([]);
    const [searchvalue, setsearchvalue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [inputEditAddValues, setInputEditAddValues] = useState([]);
    const [form] = Form.useForm();
    const [editform] = Form.useForm();
    const [selected, setselected] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [isEditAddModalVisible, setisEditAddModalVisible] = useState(false);
    const [editPoolDataKeys, seteditPoolDataKeys] = useState([]);
    const [editaddselected, seteditaddselected] = useState([]);
    const [totaldatalength, setTotalDataLength] = useState(0);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://47.102.142.153:5000/test-paper/get');
            // const response = await axios.get('http://127.0.0.1:3007/VD_Admin_TestPaperGet');
            console.log(response)
            setTotalDataLength(response.data.length)
            const parsedData = response.data.exams.map(item => {
                return {
                    ...item,
                    selected: item.selected
                };
            });
            // console.log(parsedData)
            data = parsedData
            const pooldataresponse = await axios.get('http://47.102.142.153:5000/question/get');
            // console.log(response)
            pooldata = pooldataresponse.data.questions;
            // setData(parsedData)
            // data = parsedData
            // console.log(data)
            setTableData(parsedData)
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

    const showModal = () => {
        setselectedAddRowKeys([]);
        setInputValues([]);
        setIsModalVisible(true);
    };
    const showAddModal = () => {

        setIsAddModalVisible(true);
    };
    const showEditModal = (record) => {
        console.log(data)
        editform.setFieldsValue(record);
        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            if (item.key === record.key) {
                // console.log('setEditData')
                // console.log(item)
                setEditData(item);
                break; // 终止循环，因为已找到匹配的项
            }
        }

        let newpooldata = [];

        for (let i = 0; i < record.selected.length; i++) {
            const item = record.selected[i];
            newpooldata.push(item.key);
        }

        seteditPoolDataKeys(newpooldata)
        // console.log(editPoolDataKeys)
        setIsEditModalVisible(true);

    };


    const showEditAddModal = () => {

        // editaddform.setFieldsValue({ score: '80' });

        setisEditAddModalVisible(true)
    }
    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;

        setInputValues(newInputValues);
    };
    const handleInputEditAddChange = (index, value) => {
        const newInputEditAddValues = [...inputEditAddValues];
        newInputEditAddValues[index] = value;

        setInputEditAddValues(newInputEditAddValues);
    };
    const handleOk = () => {
        if (!(selectedAddRowKeys.length === 0)) {

            form.validateFields().then(values => {
                const isTimeValid = Number.isInteger(Number(values.time)) && Number(values.time) > 0;
                if (isTimeValid === true) {
                    const totalScore = selected.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.score * 1;
                    }, 0);
                    // const newkey = data.length >= 1 ? (data[length - 1].key + 1) : 1
                    const newData = {
                        key: String(totaldatalength + 1),
                        id: String(totaldatalength + 1),
                        name: values.name,
                        time: values.time,
                        grade: totalScore,
                        // selected: JSON.stringify(selected),
                        selected: selected,
                    };
                    // const nextData = [...data, newData]
                    // console.log(nextData)
                    // setData(nextData);
                    // console.log(data)
                    // 将对象转换为 x-www-form-urlencoded 格式的字符串
                    // const formData = querystring.stringify(newData);

                    // 设置请求头
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    console.log(newData)
                    axios.post('http://47.102.142.153:5000/admin/test-paper/add', newData)
                        .then(response => {
                            message.success('添加成功')
                            fetchData();
                            // 请求成功的处理逻辑
                            // console.log('Post request successful');
                            // console.log(response)
                            // 可以在这里处理请求成功后的逻辑
                        })
                        .catch(error => {
                            // 请求失败的处理逻辑
                            message.error('重名添加失败')
                            console.error('Error while making POST request:', error);
                            // 可以在这里处理请求失败后的逻辑
                        });
                    // data.push(newData);

                    onSearch(searchvalue);
                    form.resetFields();
                    setIsModalVisible(false);
                    // Do something when form is submitted
                }
                else {
                    alert('考试时间应为正整数')
                }
            })
        }
        else {
            alert('请添加试题')
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleAddOk = () => {
        let flag = true;
        // console.log(selectedAddRowKeys)
        selectedAddRowKeys.forEach(key => {
            // console.log(inputValues[key])
            if (inputValues[key] === '' || inputValues[key] === undefined) {

                flag = false;
            }
        })
        if (flag) {
            const newSelected = selectedAddRowKeys.map(key => {
                return {
                    key: key,
                    score: inputValues[key] // 这里根据你的需求，可能需要根据 key 获取对应的值
                };
            });
            setselected(newSelected)
            setIsAddModalVisible(false);
            // Do something when form is submitted
        }
        else {
            alert('请添加分值')
        }


    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };

    const handleEditOk = () => {
        console.log('修改试卷')
        if (!(editPoolDataKeys.length === 0)) {
            console.log(2)
            editform.validateFields().then(values => {
                console.log(values)
                const totalScore = editaddselected.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.score * 1;
                }, 0);
                let newData = {};
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (item !== undefined && editData !== undefined && item.key === editData.key) {
                        newData = {
                            key: item.key,
                            id: item.id,
                            name: values.name,
                            time: values.time,
                            grade: totalScore,
                            // selected: JSON.stringify(editaddselected)
                            selected: editaddselected
                        };
                    }
                }
                console.log(newData)
                // data = newdata
                // const formData = querystring.stringify(newData);

                // 设置请求头
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                // console.log(formData)
                axios.post('http://47.102.142.153:5000/admin/test-paper/edit', newData)
                    .then(response => {
                        fetchData();
                        // 请求成功的处理逻辑
                        // console.log('Post request successful');
                        // console.log(response)
                        // 可以在这里处理请求成功后的逻辑
                    })
                    .catch(error => {
                        // 请求失败的处理逻辑
                        console.error('Error while making POST request:', error);
                        // 可以在这里处理请求失败后的逻辑
                    });
                onSearch(searchvalue);
                editform.resetFields();
                setIsEditModalVisible(false);
                // Do something when form is submitted
            })
        }
        else {
            alert('请添加试题')
        }


    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };
    const handleEditAddOk = () => {
        setInputEditAddValues([]);
        let flag = true;
        console.log(editPoolDataKeys)
        console.log(inputEditAddValues)
        editPoolDataKeys.forEach(key => {

            if (inputEditAddValues[key] === '' || inputEditAddValues[key] === undefined) {

                flag = false;
            }
        })
        if (flag) {
            const neweditaddselectedSelected = editPoolDataKeys.map(key => {
                return {
                    key: key,
                    score: inputEditAddValues[key] // 这里根据你的需求，可能需要根据 key 获取对应的值
                };
            });
            seteditaddselected(newSelected)
            setisEditAddModalVisible(false);
            // Do something when form is submitted
        }
        else {
            alert('请添加分值')
        }


    };

    const handleEditAddCancel = () => {
        setInputEditAddValues([]);
        setisEditAddModalVisible(false);
    };

    const onSearch = (value) => {
        console.log(data)
        const newdata = data.filter((obj) => {
            return obj.name.includes(value)
        })
        setTableData(newdata);
        setsearchvalue(value);
    };
    const deleteRow = (key) => {
        // console.log(record.key)
        // let newdata = data.filter(item => item.key !== key);
        // let id = 1;
        // newdata = newdata.map(item => { item.id = id++; return item; });
        // data = [...newdata];
        // setTableData(tableData.filter(item => item.key !== key));
        axios.get(`http://47.102.142.153:5000/admin/test-paper/delete/${key}`)
            .then(response => {
                fetchData();
                message.success('删除成功')
                // 请求成功的处理逻辑
                // console.log('Post request successful');
                // console.log(response)
                // 可以在这里处理请求成功后的逻辑
            })
            .catch(error => {
                // 请求失败的处理逻辑
                console.error('Error while making POST request:', error);
                // 可以在这里处理请求失败后的逻辑
            });
        onSearch(searchvalue);
    };
    const deleteRows = () => {

        // let newdata = data.filter(item => !selectedDelRowKeys.includes(item.key));
        // let id = 1;
        // newdata = newdata.map(item => { item.id = id++; return item; });
        // data = [...newdata];
        // setTableData(tableData.filter(item => !selectedDelRowKeys.includes(item.key)));
        if (confirm("确定要删除这张试卷吗")) {
            for (let i = 0; i < selectedDelRowKeys.length; i++) {
                // console.log(selectedDelRowKeys[i])
                deleteRow(selectedDelRowKeys[i])
            }
        }
    }
    const searchInputValue = (key) => {
        // console.log('kk')
        // console.log(editData)
        let searchedInputValue = '';
        for (let i = 0; i < editData.selected.length; i++) {
            const item = editData.selected[i];
            if (item.key === key) {
                inputEditAddValues[key] = item.score
                searchedInputValue = item.score;
                break; // 终止循环，因为已找到匹配的项
            }
        }

        return searchedInputValue;
    };



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setselectedDelRowKeys(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const addRowSelection = {
        selectedRowKeys: selectedAddRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setselectedAddRowKeys(selectedRowKeys)
            // console.log(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const editAddRowSelection = {
        selectedRowKeys: editPoolDataKeys,
        // selectedRowKeys: ['1', '2', '3', '4'],
        // getCheckboxProps: (record) => {

        //     let checked = editPoolDataKeys.includes(record.key);

        //     return { checked };
        // },
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
            seteditPoolDataKeys(selectedRowKeys)
        },
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
            selectedkeys: [1, 2],
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

                    {/* <Button type="primary" size='small' onClick={() => showEditModal(record)}><EditOutlined /></Button> */}
                    <Button type="primary" size='small' danger onClick={() => { if (confirm("确定要删除这张试卷吗")) { deleteRow(record.key) } }}><DeleteOutlined /></Button>

                </Space>


            ),
        },
    ];



    return (
        <div className='examination' >
            <Button className='addbtn' type="primary" size='middle' onClick={showModal}><FileAddOutlined />添加</Button>
            <Button className='deletebtn' type="primary" size='middle' danger onClick={deleteRows}><EditOutlined />删除</Button>
            <Search className='searchpaper' placeholder="input search text" onSearch={onSearch} enterButton style={{
                width: 304,
            }} />

            <Modal title="添加新的试卷" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}
                // form definition
                >
                    <Form.Item label="试卷名称" name="name" rules={[{ required: true, message: '请输入试卷名称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="用时(分钟)" name="time" rules={[{ required: true, message: '请输入试卷名称' }]}>
                        <Input />
                    </Form.Item>
                </Form>
                <Button className='addbtn' type="primary" size='middle' onClick={showAddModal}><FileAddOutlined />添加试题</Button>
            </Modal>

            <Modal title="添加试题" open={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                <Table rowSelection={{
                    type: 'checkbox',
                    ...addRowSelection,
                }} className='etable' dataSource={pooldata} pagination={{ pageSize: 4 }}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="题目" dataIndex="title" key="title" ellipsis="true" />
                    <Column title="类型" dataIndex="type" key="type" />
                    <Column title="分值" key="score" render={(_, record) => (
                        <Space size="middle">
                            <Input value={inputValues[record.key]}
                                onChange={(e) => {
                                    // console.log(record.key)
                                    const { value } = e.target;
                                    const reg = /^[1-9]\d*$/; // 正整数正则表达式
                                    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
                                        // 如果输入为空，或者符合正整数正则表达式，允许输入
                                        handleInputChange(record.key, value);
                                    }
                                }} />


                        </Space>)}
                    >
                    </Column>
                </Table>
            </Modal>

            <Modal title="修改试卷" open={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                <Form form={editform}
                // form definition
                >
                    <Form.Item label="试卷名称" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="用时(分钟)" name="time" >
                        <Input />
                    </Form.Item>
                </Form>
                <Button className='addbtn' type="primary" size='middle' onClick={showEditAddModal}><FileAddOutlined />修改试题</Button>
            </Modal>
            <Modal title="修改试题" open={isEditAddModalVisible} onOk={handleEditAddOk} onCancel={handleEditAddCancel}>
                <Table rowSelection={{
                    type: 'checkbox',
                    ...editAddRowSelection,
                }} className='etable' dataSource={pooldata} pagination={{ pageSize: 4 }}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="题目" dataIndex="title" key="title" ellipsis="true" />
                    <Column title="类型" dataIndex="type" key="type" />
                    <Column title="分值" key="score" render={(_, record) => (
                        <Space size="middle">

                            <Input key={editPoolDataKeys.includes(record.key) ? searchInputValue(record.key) : ''} defaultValue={editPoolDataKeys.includes(record.key) ? searchInputValue(record.key) : ''}
                                value={inputEditAddValues[record.key]}
                                onChange={(e) => {
                                    // console.log(record.key)
                                    const { value } = e.target;
                                    const reg = /^[1-9]\d*$/; // 正整数正则表达式
                                    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
                                        // 如果输入为空，或者符合正整数正则表达式，允许输入
                                        handleInputEditAddChange(record.key, value);
                                    }
                                }}
                            />



                        </Space>)}
                    >
                    </Column>
                </Table>
            </Modal>

            <Table rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }} className='etable' columns={columns} dataSource={tableData} pagination={{ pageSize: 8 }} />
        </div >
    )
}
export default ExamManage