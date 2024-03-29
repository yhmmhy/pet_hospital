import React, { useEffect, useState } from "react"
import{Card,Button,Form,Input,Table,Modal, message, Space, Upload, Popconfirm} from 'antd'
import {DeleteOutlined, EditOutlined, PlusOutlined,SearchOutlined, ZoomInOutlined} from '@ant-design/icons';
import MyUpload from "../components/MyUpload";
import { delByIdAPI, insertAPI, insertAllAPI, insertRoomAPI, loadDataAPI, loadDataByNameAPI, loadRoomDataByIdAPI, updateByIdAPI, updateRoomByIdAPI } from "../services/caseManage";
const roomdata = [
    {
        key: '1',
        科室编号: '1',
        科室信息: '前台',
        科室名称: '前台',
        科室负责人: '前台',
    },
    {
        key: '2',
        科室编号: '2',
        科室信息: '档案室',
        科室名称: '档案室',
        科室负责人: '前台',
    },
    {
        key: '3',
        科室编号: '3',
        科室信息: '诊室',
        科室名称: '诊室',
        科室负责人: '执业兽医师',
    },
    {
        key: '4',
        科室编号: '4',
        科室信息: '免疫室',
        科室名称: '免疫室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '5',
        科室编号: '5',
        科室信息: '化验室',
        科室名称: '化验室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '6',
        科室编号: '6',
        科室信息: '影像室',
        科室名称: '影像室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '7',
        科室编号: '7',
        科室信息: '专科检查室',
        科室名称: '专科检查室',
        科室负责人: '执业兽医师',
    },
    {
        key: '8',
        科室编号: '8',
        科室信息: '处置室',
        科室名称: '处置室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '9',
        科室编号: '9',
        科室信息: '药房',
        科室名称: '药房',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '10',
        科室编号: '10',
        科室信息: '注射室',
        科室名称: '注射室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '11',
        科室编号: '11',
        科室信息: '手术准备室',
        科室名称: '手术准备室',
        科室负责人: '助理执业兽医师',
    },
    {
        key: '12',
        科室编号: '12',
        科室信息: '手术室',
        科室名称: '手术室',
        科室负责人: '执业兽医师',
    },
    {
        key: '13',
        科室编号: '13',
        科室信息: '住院部',
        科室名称: '住院部',
        科室负责人: '住院执业兽医师或助理执业兽医师',
    },
    {
        key: '14',
        科室编号: '14',
        科室信息: '病理剖检室',
        科室名称: '病理剖检室',
        科室负责人: '执业兽医师',
    },
];
function RoomManage(){
    const [isShow,setIsShow]=useState(false);//控制添加病例的modal
    const [myForm] = Form.useForm();//获取表单元素实例
    const [query,setQuery] = useState({});
    const [data,setData]= useState(roomdata);
    const [currentId,setCurrentId] =useState('');
    const [isInfoShow,setIsInfoShow]= useState(false);
    const [imageData, setImageData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    useEffect(()=>{
        if(!isShow){
            setCurrentId('');
        }
    },[isShow])
    return(
      <>
         <Card
            title='科室管理'
            // extra={
            //     <>
            //        <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setIsShow(true)}/>
            //     </>
            // }
        >
            <Form layout="inline" onFinish={async(v)=>{
                const filtered = roomdata.filter(item => item.科室信息.includes(v.name));
                console.log('Filtered data:', filtered);
                setData(filtered);
                
                message.success('查询成功')
            }}>
                <Form.Item label="科室名称" name='name'>
                    <Input placeholder="请输入关键词"></Input>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<SearchOutlined/>} />
                </Form.Item>
            </Form>
            <Table 
            dataSource={data}
            rowKey='key'
            columns={
                [
                    {
                        title: '科室编号',
                        dataIndex: '科室编号',
                    },
                    {
                        title: '科室名称',
                        dataIndex: '科室名称',
                    },
                    {
                        title: '科室信息',
                        dataIndex: '科室信息',
                    },
                    {
                        title: '科室负责人',
                        dataIndex: '科室负责人',
                    },{
                        title:'操作',
                        align:'center',
                        width:100,
                        render(v,r:any){
                            return <Space>
                                <Button type='primary' icon={<EditOutlined/>} onClick={async ()=>{
                                    setIsShow(true)
                                    setCurrentId(r.科室编号)
                                    console.log(r);
                                    await loadRoomDataByIdAPI(currentId) 
                                    .then((res) => {
                                        console.log(res); // 输出模拟的数据
                                        // 在这里设置image和video
                                      })
                                      .catch((error) => {
                                        console.error("Error:", error);
                                      });
                                    myForm.setFieldsValue(r)
                                }}/>
                                <Button type='primary' icon={<ZoomInOutlined />} onClick={()=>{
                                    setIsInfoShow(true)
                                    setIsShow(true)
                                    setCurrentId(r.科室编号)
                                    // console.log(r.key)
                                    myForm.setFieldsValue(r)
                                }}/>
                        
                            </Space>
                        }
                    }
                ]
            }/>
        </Card>
        <Modal 
          title="编辑" 
          open={isShow}
          maskClosable={false}
          onCancel={()=>setIsShow(false)}
          destroyOnClose
          onOk={()=>{
            // message.success('上传成功');
            myForm.submit();
          }}
        >
          <Form 
             preserve={false}
             onFinish={async(v)=>{
                const { 科室图片,科室视频, ...newData } = v;
                v.科室图片=imageData;
                v.科室信息=videoData;
                console.log('发送信息',v);
                if(isInfoShow){
                    setIsInfoShow(false);
                    setIsShow(false);
                    message.success('展示完毕');
                }
                else{
                    if(currentId){
                        // setInitialImageList(imageData)
                        await updateRoomByIdAPI(currentId,newData);
                        message.success('修改成功');
                        
                    }else{
                        await insertRoomAPI(v);
                        // await submitData(imageData,v);
                        message.success('上传成功');
                    }
                    // console.log({ ...v,接诊照片:imageData});
                    setIsShow(false);
                    setImageData([]);
                    setCurrentId('');
                    setQuery({});//重置查询条件取数据
                }
             }}
             form={myForm}
          >
            <Form.Item label='科室名称' name='科室名称' rules={
                [
                    {
                        required:true,
                        message:'请输入科室名称'
                    }
                ]
            }>
                <Input placeholder="请输入科室名称"/>
            </Form.Item>
            <Form.Item label='科室信息' name='科室信息'>
                <Input placeholder="科室信息"/>
            </Form.Item>
            <Form.Item label='科室负责人' name='科室负责人'>
                <Input placeholder="科室负责人"/>
            </Form.Item>
            <Form.Item label='科室图片' name='科室图片'>
                <MyUpload handleFileData={setImageData} initialImageList={imageData}/>
            </Form.Item>
            <Form.Item label='科室视频' name='科室视频'>
                <MyUpload handleFileData={setVideoData} initialImageList={videoData}/>
            </Form.Item>  
          </Form>
        </Modal>
      </>  
        
        
    )
}
export default RoomManage