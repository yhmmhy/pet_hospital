// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Input, Modal, Form, Select, Radio, message } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined, DownOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { Option } = Select;
import axios from 'axios'
import querystring from 'querystring';
// let data = [
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
function PoolManage() {
    let [data, setData] = useState([])
    const [tableData, setTableData] = useState(data);
    const [totaldatalength, setTotalDataLength] = useState(0);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://47.102.142.153:5000/question/get');
            // const response = await axios.get('http://127.0.0.1:3007/VD_Admin_TestQuestionsGet');
            console.log(response)
            setData(response.data.questions);
            setTableData(response.data.questions)
            setTotalDataLength(response.data.length)
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




    const [selectedDelRowKeys, setselectedDelRowKeys] = useState([]);
    const { Search } = Input;
    const [searchvalue, setsearchvalue] = useState('');
    const [editFormData, setEditFormData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isrowModalVisible, setIsrowModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const [form] = Form.useForm();
    const [rowform] = Form.useForm();
    const handleOk = () => {
        form.validateFields().then(values => {
            // const newkey = data.length >= 1 ? (data[length - 1].key + 1) : 1
            const newData = {
                key: String(totaldatalength + 1),
                id: String(totaldatalength + 1),
                title: values.title,
                A: values.A,
                B: values.B,
                C: values.C,
                D: values.D,
                type: values.type,
                rightchoice: values.rightchoice
            };
            // 将对象转换为 x-www-form-urlencoded 格式的字符串
            // const formData = JSON.stringify(newData);
            console.log(newData)
            // 设置请求头
            const config = {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json'
                }
            };
            console.log(newData)
            axios.post('http://47.102.142.153:5000/admin/question/add', newData)
                .then(response => {
                    console.log(response);
                    fetchData();
                    message.success('添加成功')
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
        })
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const rowhandleOk = () => {
        rowform.validateFields().then(values => {
            const newData = {
                key: editFormData.key,
                id: editFormData.id,
                title: values.title,
                A: values.A,
                B: values.B,
                C: values.C,
                D: values.D,
                type: values.type,
                rightchoice: values.rightchoice
            };
            // const formData = querystring.stringify(newData);

            // 设置请求头

            // console.log(formData)
            axios.post('http://47.102.142.153:5000/admin/question/edit', newData)
                .then(response => {
                    fetchData();
                    message.success('修改成功')
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
            // const updatedData = data.map(item => {
            //     if (item.key === newData.key) {
            //         return newData;
            //     }
            //     return item;
            // });
            // data = [...updatedData];
            onSearch(searchvalue);
            rowform.resetFields();
            setIsrowModalVisible(false);
        })
    };

    const rowhandleCancel = () => {
        rowform.resetFields();
        setIsrowModalVisible(false);
    };



    const onSearch = (value) => {
        const newdata = data.filter((obj) => {
            return obj.title.includes(value)
        })
        setTableData(newdata);
        setsearchvalue(value);
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
        axios.get(`http://47.102.142.153:5000/admin/question/delete/${key}`)
            .then(response => {
                fetchData();
                // 请求成功的处理逻辑
                // console.log('Post request successful');
                // console.log(response)
                // 可以在这里处理请求成功后的逻辑
                message.success('删除成功')
            })
            .catch(error => {
                // 请求失败的处理逻辑
                alert('有关联试卷，无法删除')
                console.error('Error while making POST request:', error);
                // 可以在这里处理请求失败后的逻辑
            });


        // let newdata = data.filter(item => item.key !== key);
        // let id = 1;
        // newdata = newdata.map(item => { item.id = id++; return item; });
        // data = [...newdata];
        // setTableData(tableData.filter(item => item.key !== key));
    };
    const deleteRows = () => {

        // let newdata = data.filter(item => !selectedDelRowKeys.includes(item.key));
        // let id = 1;
        // newdata = newdata.map(item => { item.id = id++; return item; });
        // data = [...newdata];
        // setTableData(tableData.filter(item => !selectedDelRowKeys.includes(item.key)));
        if (confirm("确定要删除吗")) {
            for (let i = 0; i < selectedDelRowKeys.length; i++) {
                deleteRow(selectedDelRowKeys[i])
            }
        }

    }
    const showEditModal = (record) => {
        setIsrowModalVisible(true);
        setEditFormData(record);
        console.log(record)
        rowform.setFieldsValue(record);
    };
    return (
        <div className='examination'>

            <Button className='addbtn' type="primary" size='middle' onClick={showModal}><FileAddOutlined />添加</Button>
            <Button className='deletebtn' type="primary" size='middle' danger onClick={deleteRows}><EditOutlined />删除</Button>
            <Search className='searchpaper' placeholder="input search text" onSearch={onSearch} enterButton style={{
                width: 304,
            }} />

            <Modal title="添加新的题目" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} initialValues={{ type: '接诊' }}
                // form definition
                >
                    <Form.Item label="题目" name="title" rules={[{ required: true, message: '请输入题目' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="类型" name="type">
                        <Select style={{ width: '80%' }}>
                            <Option value="接诊">接诊</Option>
                            <Option value="检验">检验</Option>
                            <Option value="诊断">诊断</Option>
                            <Option value="治疗">治疗</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="选项A" name="A" rules={[{ required: true, message: '请输入选项A' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="选项B" name="B" rules={[{ required: true, message: '请输入选项B' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="选项C" name="C" rules={[{ required: true, message: '请输入选项C' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="选项D" name="D" rules={[{ required: true, message: '请输入选项D' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="正确选项" initialValue="A" name='rightchoice'>
                        <Radio.Group>
                            <Radio value="A"> A </Radio>
                            <Radio value="B"> B </Radio>
                            <Radio value="C"> C </Radio>
                            <Radio value="D"> D </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="修改题目" open={isrowModalVisible} onOk={rowhandleOk} onCancel={rowhandleCancel}>
                <Form form={rowform}
                // form definition
                >
                    <Form.Item label="题目" name="title" rules={[{ required: true, message: '请输入题目' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="类型" name="type">
                        <Select style={{ width: '80%' }}>
                            <Option value="接诊">接诊</Option>
                            <Option value="检验">检验</Option>
                            <Option value="诊断">诊断</Option>
                            <Option value="治疗">治疗</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="选项A" name="A" rules={[{ required: true, message: '请输入选项A' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="选项B" name="B" rules={[{ required: true, message: '请输入选项B' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="选项C" name="C" rules={[{ required: true, message: '请输入选项C' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="选项D" name="D" rules={[{ required: true, message: '请输入选项D' }]}>
                        <Input style={{ width: '70%' }} />
                    </Form.Item>
                    <Form.Item label="正确选项" initialValue="A" name='rightchoice'>
                        <Radio.Group>
                            <Radio value="A"> A </Radio>
                            <Radio value="B"> B </Radio>
                            <Radio value="C"> C </Radio>
                            <Radio value="D"> D </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>


            <Table rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }} className='etable' dataSource={tableData} pagination={{ pageSize: 7 }}>
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="题目" dataIndex="title" key="title" ellipsis="true" />
                <ColumnGroup title="选项">
                    <Column title="A" dataIndex="A" key="A"
                        render={(text, record) => (
                            <span style={{ color: record.rightchoice === 'A' ? 'orange' : 'black' }}>{text}</span>
                        )}
                    />
                    <Column title="B" dataIndex="B" key="B"
                        render={(text, record) => (
                            <span style={{ color: record.rightchoice === 'B' ? 'orange' : 'black' }}>{text}</span>
                        )}
                    />
                    <Column title="C" dataIndex="C" key="C"
                        render={(text, record) => (
                            <span style={{ color: record.rightchoice === 'C' ? 'orange' : 'black' }}>{text}</span>
                        )}
                    />
                    <Column title="D" dataIndex="D" key="D"
                        render={(text, record) => (
                            <span style={{ color: record.rightchoice === 'D' ? 'orange' : 'black' }}>{text}</span>
                        )}
                    />
                </ColumnGroup>
                <Column title="分类" dataIndex="type" key="type" />
                <Column title="操作" dataIndex="action" key="action" render={(_, record) => (
                    <Space size="middle">

                        <Button type="primary" size='small' onClick={() => showEditModal(record)}><EditOutlined /></Button>
                        <Button type="primary" size='small' danger onClick={() => { if (confirm("确定要删除这道试题吗")) { deleteRow(record.key) } }}><DeleteOutlined /></Button>

                    </Space>)}
                >
                </Column>
            </Table>
        </div>
    )
}
export default PoolManage