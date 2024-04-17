import React, { useEffect, useState } from "react"
import { Card, Button, Form, Input, Table, Modal, message, Space, Upload, Popconfirm, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined } from '@ant-design/icons';
import MyUpload from "../components/MyUpload";
import { loadRoomDataAPI, loadRoomDataByIdAPI, updateRoomByIdAPI } from "../services/caseManage";
import VideoUpload from "../components/VideoUpload";
const roomdata = [
    {
        key: '1',
        科室信息: '前台',
        科室名称: '前台',
        科室负责人: '前台',
    },
    {
        key: '2',
        科室信息: '档案室',
        科室名称: '档案室',
        科室负责人: '前台',
    },
    {
        key: '3',
        科室信息: '诊室',
        科室名称: '诊室',
        科室负责人: '执业兽医师',
    },
    {
        key: '4',
        科室信息: '免疫室',
        科室名称: '免疫室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '5',
        科室信息: '化验室',
        科室名称: '化验室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '6',
        科室信息: '影像室',
        科室名称: '影像室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '7',
        科室信息: '专科检查室',
        科室名称: '专科检查室',
        科室负责人: '执业兽医师',
    },
    {
        key: '8',
        科室信息: '处置室',
        科室名称: '处置室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '9',
        科室信息: '药房',
        科室名称: '药房',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '10',
        科室信息: '注射室',
        科室名称: '注射室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '11',
        科室信息: '手术准备室',
        科室名称: '手术准备室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '12',
        科室信息: '手术室',
        科室名称: '手术室',
        科室负责人: '执业兽医师',
    },
    {
        key: '13',
        科室信息: '住院部',
        科室名称: '住院部',
        科室负责人: '住院执业兽医师或助理执业兽医师',
    },
    {
        key: '14',
        科室信息: '病理剖检室',
        科室名称: '病理剖检室',
        科室负责人: '执业兽医师',
    },
];
const updatedRoomData = roomdata.map(item => ({
    key: item.key,
    department_info: item['科室信息'],
    name: item['科室名称']
}));
function RoomManage() {
    const [isShow, setIsShow] = useState(false);//控制添加病例的modal
    const [myForm] = Form.useForm();//获取表单元素实例
    const [query, setQuery] = useState({});
    const [data, setData] = useState(updatedRoomData);
    const [currentId, setCurrentId] = useState('');
    const [isInfoShow, setIsInfoShow] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [videoData, setVideoData] = useState([]);
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
                                            setIsShow(true)
                                            setCurrentId(r.id)
                                            setImageData(r.picture)
                                            setVideoData(r.video)
                                            // console.log(r.key)
                                            myForm.setFieldsValue(r)
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
                                await updateRoomByIdAPI(currentId, v)
                                    .then((res) => {
                                        console.log(res);
                                        setIsShow(false);
                                        setImageData([]);
                                        setVideoData([]);
                                        setCurrentId('');
                                        setQuery({});
                                        message.success('修改成功');
                                    })
                                    .catch((error) => {
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
                        <MyUpload handleFileData={setImageData} initialImageList={imageData} />
                    </Form.Item>
                    <Form.Item label='科室视频' name='video'>
                        <VideoUpload handleFileData={setVideoData} initialImageList={videoData} />
                    </Form.Item>
                </Form>
            </Modal>
        </>


    )
}
export default RoomManage