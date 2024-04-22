import React, { useEffect, useState } from "react"
import { Card, Button, Form, Input, Table, Modal, message, Space, Upload, Popconfirm, Tooltip, Spin } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined } from '@ant-design/icons';
import MyUpload from "../components/MyUpload";
import { loadRoomDataAPI, loadRoomDataByIdAPI, updateRoomByIdAPI } from "../services/caseManage";
import VideoUpload from "../components/VideoUpload";
import {  setLoadingInterceptor } from '../utils/request';
function RoomManage() {
    const [isShow, setIsShow] = useState(false);//控制添加病例的modal
    const [myForm] = Form.useForm();//获取表单元素实例
    const [myInfoForm] = Form.useForm();//获取表单元素实例
    const [query, setQuery] = useState({});
    const [data, setData] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [isInfoShow, setIsInfoShow] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     // 在组件加载时设置拦截器
    //     setLoadingInterceptor(setLoading);
    //   }, []);
    useEffect(() => {
        loadRoomDataAPI().then((res) => {
            console.log(res);
            setData(res.departments);
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
                title='科室管理'
            // extra={
            //     <>
            //        <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setIsShow(true)}/>
            //     </>
            // }
            >
                <Form layout="inline" onFinish={ (v) => {
                    const filtered = data.filter(item => item.name.includes(v.name));
                    console.log('Filtered data:', filtered);
                    setData(filtered);

                    message.success('查询成功')
                }}>
                    <Form.Item label="科室名称" name='name'>
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
                    rowKey='key'
                    columns={
                        [
                            {
                                title: '科室编号',
                                dataIndex: 'id',
                            },
                            {
                                title: '科室名称',
                                dataIndex: 'name',
                            },
                            {
                                title: '科室信息',
                                dataIndex: 'department_info',
                            },
                            {
                                title: '操作',
                                align: 'center',
                                width: 100,
                                render(v, r: any) {
                                    return <Space>
                                        <Button type='primary' icon={<EditOutlined />} onClick={async () => {
                                            setCurrentId(r.id)
                                            setImageData(r.picture)
                                            setVideoData(r.video)
                                            setIsShow(true)

                                            console.log('当前行', r);
                                            // await loadRoomDataByIdAPI(currentId) 
                                            // .then((res) => {
                                            //     console.log(res); // 输出模拟的数据
                                            //     // 在这里设置image和video
                                            //   })
                                            //   .catch((error) => {
                                            //     console.error("Error:", error);
                                            //   });
                                            myForm.setFieldsValue(r)
                                        }} />
                                        <Button type='primary' icon={<ZoomInOutlined />} onClick={() => {
                                            setIsInfoShow(true)                                        
                                            setCurrentId(r.id)
                                            setImageData(r.picture)
                                            setVideoData(r.video)
                                            // console.log(r.key)
                                            myInfoForm.setFieldsValue(r)
                                        }} />

                                    </Space>
                                }
                            }
                        ]
                    } pagination={{defaultPageSize:7}}/>
            </Card>
            <Modal
                title="编辑"
                open={isShow}
                maskClosable={false}
                onCancel={() => setIsShow(false)}
                destroyOnClose
                onOk={() => {
                    // message.success('上传成功');
                    myForm.submit();
                }}
            >
                <Form
                    preserve={false}
                    onFinish={async (v) => {
                        // const { picture,video, ...newData } = v;
                        // const imageURLs = imageData.map(item => item.url);
                        v.picture = imageData;
                        // const VideoURLs = videoData[0].url;
                        v.video = videoData;
                        console.log('发送信息', v);
                        console.log('当前id', currentId);
                        if (isInfoShow) {
                            setIsInfoShow(false);
                            setIsShow(false);
                            setImageData([]);
                            setVideoData([]);

                            message.success('展示完毕');
                        }
                        else {
                            if (currentId) {
                                // setInitialImageList(imageData)
                                setLoading(true);
                                setIsShow(false);
                                await updateRoomByIdAPI(currentId, v)
                                    .then((res) => {
                                        console.log(res);
                                        setLoading(false);
                                        // setIsShow(false);
                                        setImageData([]);
                                        setVideoData([]);
                                        setCurrentId('');
                                        setQuery({});
                                        message.success('修改成功');
                                    })
                                    .catch((error) => {
                                        message.error('上传失败')
                                        setLoading(false);
                                        console.error("Error:", error);
                                    });


                            }
                            // console.log({ ...v,接诊照片:imageData});

                            // setQuery({});//重置查询条件取数据
                        }
                    }}
                    form={myForm}
                >
                    <Form.Item label='科室名称' name='name' rules={
                        [
                            {
                                required: true,
                                message: '请输入科室名称'
                            }
                        ]
                    }>
                        <Input placeholder="请输入科室名称" />
                    </Form.Item>
                    <Form.Item label='科室信息' name='department_info'>
                        <Input placeholder="科室信息" />
                    </Form.Item>
                    <Form.Item label='科室图片' name='picture'>
                        <MyUpload handleFileData={setImageData} initialImageList={imageData} isShow={false}/>
                    </Form.Item>
                    <Form.Item label='科室视频' name='video'>
                        <VideoUpload handleFileData={setVideoData} initialImageList={videoData} isShow={false}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="查看详情"
                open={isInfoShow}
                maskClosable={false}
                onCancel={() => setIsInfoShow(false)}
                destroyOnClose
                onOk={() => {
                    // message.success('上传成功');
                    setIsInfoShow(false)
                }}
            >
                <Form
                    preserve={false}
                    onFinish={() =>{
                        setIsInfoShow(false);
                        setImageData([]);
                        setVideoData([]);
                        setCurrentId('');
                    }
                    }
                    form={myInfoForm}
                >
                    <Form.Item label='科室名称' name='name' rules={
                        [
                            {
                                required: true,
                                message: '请输入科室名称'
                            }
                        ]
                    }>
                        <Input placeholder="请输入科室名称" />
                    </Form.Item>
                    <Form.Item label='科室信息' name='department_info'>
                        <Input placeholder="科室信息" />
                    </Form.Item>
                    <Form.Item label='科室图片' name='picture'>
                        <MyUpload handleFileData={setImageData} initialImageList={imageData} isShow={true}/>
                    </Form.Item>
                    <Form.Item label='科室视频' name='video'>
                        <VideoUpload handleFileData={setVideoData} initialImageList={videoData} isShow={true}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Spin spinning={loading} fullscreen />
        </>
        

    )
}
export default RoomManage