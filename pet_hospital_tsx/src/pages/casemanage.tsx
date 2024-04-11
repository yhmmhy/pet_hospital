import React, { useEffect, useState } from "react"
import { Card, Button, Form, Input, Table, Modal, message, Space, Upload, Popconfirm, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined } from '@ant-design/icons';
import MyUpload from "../components/MyUpload";
import { delByIdAPI, insertAPI, insertAllAPI, loadDataAPI, loadDataByIdAPI, loadDataByNameAPI, updateByIdAPI } from "../services/caseManage";
import VideoUpload from "../components/VideoUpload";
function CaseManage() {
    const [isShow, setIsShow] = useState(false);//控制添加病例的modal
    const [myForm] = Form.useForm();//获取表单元素实例
    const [query, setQuery] = useState({});
    const [data, setData] = useState([]);
    // const [oldData, setOldData] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [isInfoShow, setIsInfoShow] = useState(false);
    const [imageData1, setImageData1] = useState([]);
    const [imageData2, setImageData2] = useState([]);
    const [videoData, setVideoData] = useState([]);
    // const submitData = async (fileData,value) => {
    //     const formData = new FormData();
    //     console.log('图片信息',fileData);
    //     fileData.forEach((file) => {
    //         formData.append('files', file); // 这里的 'files' 是后端接收文件的字段名
    //     });
    //     console.log('我的formData',formData);
    //     await insertAllAPI(fileData);
    // };
    useEffect(() => {
        loadDataAPI(query)
            .then((res) => {
                console.log(res); // 输出模拟的数据
                setData(res.cases);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [query])
    useEffect(() => {
        if (!isShow) {
            setCurrentId('');
        }
    }, [isShow])
    return (
        <>
            <Card
                title='病例管理'
                extra={
                    <>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => { console.log('image', imageData1); setIsShow(true) }} />
                    </>
                }
            >
                <Form layout="inline" onFinish={async (v) => {
                    console.log('我的', v);
                    // if(v.name === ''){
                    //     setQuery({});
                    // }else{
                    //     const filteredData = data.filter(item => item.name.includes(v.name));
                    //     setData(filteredData);
                    // }
                    await loadDataByNameAPI(v.name)
                        .then((res) => {
                            console.log(res);
                            if (res.message === '读取病例记录成功') {
                                setData(res.cases);
                            }
                            message.success('查询成功')
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            message.error('未查找到该名称病例')
                        });

                }}>
                    <Form.Item label="名称" name='name'>
                        <Input placeholder="请输入关键词"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" icon={<SearchOutlined />} />
                    </Form.Item>
                    <Form.Item>
                        <Tooltip title="重置">
                            <Button type="primary" icon={<UndoOutlined />} onClick={() => { setQuery({}) }} />
                        </Tooltip>
                    </Form.Item>
                </Form>
                <Table
                    dataSource={data}
                    rowKey='id'
                    columns={
                        [
                            {
                                title: '编号',
                                dataIndex: 'id',
                            }, {
                                title: '名称',
                                dataIndex: 'name',
                            }, {
                                title: '接诊',
                                dataIndex: 'admission',
                                render: (text) => text.length > 20 ? `${text.substring(0, 20)}...` : text,
                            }, {
                                title: '病例检查',
                                dataIndex: 'examination',
                                render: (text) => text.length > 20 ? `${text.substring(0, 20)}...` : text,
                            }, {
                                title: '诊断结果',
                                dataIndex: 'diagnosis',
                                render: (text) => text.length > 20 ? `${text.substring(0, 20)}...` : text,
                            }, {
                                title: '治疗方案',
                                dataIndex: 'treatment_plan',
                                render: (text) => text.length > 20 ? `${text.substring(0, 20)}...` : text,
                            }, {
                                title: '操作',
                                align: 'center',
                                width: 100,
                                render(v, r: any) {
                                    return <Space>
                                        <Tooltip title="编辑">
                                            <Button type='primary' icon={<EditOutlined />} onClick={async () => {
                                                console.log(r.id)
                                                await loadDataByIdAPI(r.id).then((res) => {
                                                    console.log('当前病例get', res.case); // 输出模拟的数据
                                                    if (res.case.photo_0.length > 0) {
                                                        
                                                        console.log('图片 URL 数组1:', res.case.photo_0);
                                                        setImageData1(res.case.photo_0);
                                                    }
                                                    if (res.case.photo_1.length > 0) {
                                                        console.log('图片 URL 数组2:', res.case.photo_1);
                                                        setImageData2(res.case.photo_1);
                                                    }
                                                    if (res.case.video.length > 0) {
                                                        console.log('视频 URL 数组:', res.case.video);
                                                        setVideoData(res.case.video);
                                                    }
                                                })
                                                    .catch((error) => {
                                                        console.error("Error:", error);
                                                    })
                                                setIsShow(true)
                                                setCurrentId(r.id)

                                                // console.log(r.编号)
                                                // console.log('回显',imageData);
                                                // setInitialImageList(imageData);
                                                myForm.setFieldsValue(r)
                                            }} />
                                        </Tooltip>
                                        <Tooltip title="查看详情">
                                            <Button type='primary' icon={<ZoomInOutlined />} onClick={() => {
                                                setIsInfoShow(true)
                                                setIsShow(true)
                                                setCurrentId(r.id)
                                                // console.log(r.key)
                                                myForm.setFieldsValue(r)
                                            }} />
                                        </Tooltip>
                                        <Tooltip title="删除">
                                            <Popconfirm title='是否确认删除' onConfirm={async () => {
                                                await delByIdAPI(r.id);
                                                setQuery({});
                                            }}>
                                                <Button type='primary' icon={<DeleteOutlined />} danger />
                                            </Popconfirm>
                                        </Tooltip>

                                    </Space>
                                }
                            }
                        ]
                    } />
            </Card>
            <Modal
                title="编辑"
                open={isShow}
                maskClosable={false}
                onCancel={() => {
                    setIsShow(false);
                    setImageData1([]);
                    setImageData2([]);
                    setVideoData([]);
                    setCurrentId('');
                }}
                destroyOnClose
                onOk={() => {
                    // message.success('上传成功');
                    myForm.submit();
                }}
            >
                <Form
                    preserve={false}
                    onFinish={async (v) => {
                        const { 接诊照片, 病理检查照片, 治疗方案视频, ...newData } = v;
                        newData.photo_0 = imageData1;
                        newData.photo_1 = imageData2;
                        newData.video = videoData;
                        console.log('v', v);
                        if (isInfoShow) {
                            setIsInfoShow(false);
                            setIsShow(false);
                            message.success('展示完毕');
                        }
                        else {
                            // console.log('value',v.名称);
                            // console.log('打印输出',imageData);
                            // const formData = new FormData();
                            // if (imageData.length > 0) {
                            //     imageData.forEach((file, index) => {
                            //       formData.append('files', file);
                            //     });
                            // };
                            // submitData(formData);
                            if (currentId) {
                                console.log('update', newData);
                                await updateByIdAPI(currentId, newData)
                                .then((res) => {
                                    console.log(res);
                                    setIsShow(false);
                                    setImageData1([]);
                                    setImageData2([]);
                                    setVideoData([]);
                                    setCurrentId('');
                                    setQuery({});
                                    message.success('修改成功');
                                })
                                .catch((error) => {
                                    console.error("Error:", error);
                                });
                            } else {
                                console.log('发送信息', newData);
                                await insertAllAPI(newData)
                                .then((res) => {
                                    console.log(res);
                                    setIsShow(false);
                                    setImageData1([]);
                                    setImageData2([]);
                                    setVideoData([]);
                                    setCurrentId('');
                                    setQuery({});
                                    message.success('上传成功');
                                })
                                .catch((error) => {
                                    console.error("Error:", error);
                                });
                                // await submitData(imageData,v);
                                // message.success('上传成功');
                            }
                            // console.log({ ...v,接诊照片:imageData});
                            setIsShow(false);
                            setImageData1([]);
                            setImageData2([]);
                            setVideoData([]);
                            setCurrentId('');
                            setQuery({});//重置查询条件取数据
                        }
                    }}
                    form={myForm}
                >
                    <Form.Item label='名称' name='name' rules={
                        [
                            {
                                required: true,
                                message: '请输入病例名称'
                            }
                        ]
                    }>
                        <Input placeholder="请输入病例名称" />
                    </Form.Item>
                    <Form.Item label='接诊' name='admission' rules={
                        [
                            {
                                required: true,
                                message: '请输入接诊信息'
                            }
                        ]
                    }>
                        <Input placeholder="接诊" />
                    </Form.Item>
                    <Form.Item label='接诊照片' name='接诊照片' >
                        <MyUpload handleFileData={setImageData1} initialImageList={imageData1} />
                    </Form.Item>
                    <Form.Item label='病例检查' name='examination' rules={
                        [
                            {
                                required: true,
                                message: '请输入病例检查信息'
                            }
                        ]
                    }>
                        <Input placeholder="请输入病例检查" />
                    </Form.Item>
                    <Form.Item label='病例检查照片' name='病理检查照片'>
                        <MyUpload handleFileData={setImageData2} initialImageList={imageData2} />
                    </Form.Item>
                    <Form.Item label='诊断结果' name='diagnosis' rules={
                        [
                            {
                                required: true,
                                message: '请输入诊断结果信息'
                            }
                        ]
                    }>
                        <Input placeholder="请输入诊断结果" />
                    </Form.Item>
                    <Form.Item label='治疗方案' name='treatment_plan' rules={
                        [
                            {
                                required: true,
                                message: '请输入治疗方案信息'
                            }
                        ]
                    }>
                        <Input placeholder="请输入治疗方案" />
                    </Form.Item>
                    <Form.Item label='治疗方案视频' name='治疗方案视频'>
                        <VideoUpload handleFileData={setVideoData} initialImageList={videoData}></VideoUpload>

                    </Form.Item>
                </Form>
            </Modal>
        </>


    )
}
export default CaseManage