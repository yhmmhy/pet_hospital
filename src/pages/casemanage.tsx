import React, { useEffect, useState } from "react"
import{Card,Button,Form,Input,Table,Modal, message, Space, Upload, Popconfirm} from 'antd'
import {DeleteOutlined, EditOutlined, PlusOutlined,SearchOutlined, ZoomInOutlined} from '@ant-design/icons';
import MyUpload from "../components/MyUpload";
import { delByIdAPI, insertAPI, insertAllAPI, loadDataAPI, loadDataByNameAPI, updateByIdAPI } from "../services/caseManage";
function CaseManage(){
    const [isShow,setIsShow]=useState(false);//控制添加病例的modal
    const [myForm] = Form.useForm();//获取表单元素实例
    const [query,setQuery] = useState({});
    const [data,setData]= useState([]);
    const [currentId,setCurrentId] =useState('');
    const [isInfoShow,setIsInfoShow]= useState(false);
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
    useEffect(()=>{
        loadDataAPI(query)
        .then((res) => {
          console.log(res); // 输出模拟的数据
          setData(res);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },[query])
    useEffect(()=>{
        if(!isShow){
            setCurrentId('');
        }
    },[isShow])
    return(
      <>
         <Card
            title='病例管理'
            extra={
                <>
                   <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setIsShow(true)}/>
                </>
            }
        >
            <Form layout="inline" onFinish={async(v)=>{
                console.log('我的',v);
                await loadDataByNameAPI(v.name)
                .then((res) => {
                    console.log(res); // 输出模拟的数据
                    setData(res);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
                
                message.success('查询成功')
            }}>
                <Form.Item label="名称" name='name'>
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
                        title:'编号',
                        dataIndex:'编号',
                    },{
                        title:'名称',
                        dataIndex:'名称',
                    },{
                        title:'接诊',
                        dataIndex:'接诊',
                    },{
                        title:'病例检查',
                        dataIndex:'病例检查',
                    },{
                        title:'诊断结果',
                        dataIndex:'诊断结果',
                    },{
                        title:'治疗方案',
                        dataIndex:'治疗方案',
                    },{
                        title:'操作',
                        align:'center',
                        width:100,
                        render(v,r:any){
                            return <Space>
                                <Button type='primary' icon={<EditOutlined/>} onClick={()=>{
                                    setIsShow(true)
                                    setCurrentId(r.编号)
                                    // console.log(r.编号)
                                    // console.log('回显',imageData);
                                    // setInitialImageList(imageData);
                                    myForm.setFieldsValue(r)
                                }}/>
                                <Button type='primary' icon={<ZoomInOutlined />} onClick={()=>{
                                    setIsInfoShow(true)
                                    setIsShow(true)
                                    setCurrentId(r.编号)
                                    // console.log(r.key)
                                    myForm.setFieldsValue(r)
                                }}/>
                                <Popconfirm title='是否确认删除' onConfirm={async()=>{
                                    await delByIdAPI(r.编号);
                                    setQuery({});
                                }}>
                                   <Button type='primary' icon={<DeleteOutlined/>} danger/>
                                </Popconfirm>
                                
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
                const { 接诊照片, 病理检查照片, 治疗方案视频, ...newData } = v;
                v.接诊照片=imageData1;
                v.病理检查照片=imageData2;
                v.治疗方案视频=videoData;
                console.log('发送信息',v);
                if(isInfoShow){
                    setIsInfoShow(false);
                    setIsShow(false);
                    message.success('展示完毕');
                }
                else{
                    // console.log('value',v.名称);
                    // console.log('打印输出',imageData);
                    // const formData = new FormData();
                    // if (imageData.length > 0) {
                    //     imageData.forEach((file, index) => {
                    //       formData.append('files', file);
                    //     });
                    // };
                    // submitData(formData);
                    if(currentId){
                        // setInitialImageList(imageData)
                        await updateByIdAPI(currentId,newData);
                        message.success('修改成功');
                        
                    }else{
                        await insertAPI(v);
                        // await submitData(imageData,v);
                        message.success('上传成功');
                    }
                    // console.log({ ...v,接诊照片:imageData});
                    setIsShow(false);
                    setImageData1([]);
                    setImageData2([]);
                    setCurrentId('');
                    setQuery({});//重置查询条件取数据
                }
             }}
             form={myForm}
          >
            <Form.Item label='名称' name='名称' rules={
                [
                    {
                        required:true,
                        message:'请输入病例名称'
                    }
                ]
            }>
                <Input placeholder="请输入病例名称"/>
            </Form.Item>
            <Form.Item label='接诊' name='接诊'>
                <Input placeholder="接诊"/>
            </Form.Item>
            <Form.Item label='接诊照片' name='接诊照片'>
                <MyUpload handleFileData={setImageData1} initialImageList={['http://localhost:3007/da.png', 'http://localhost:3007/12.png']}/>
            </Form.Item>
            <Form.Item label='病例检查' name='病例检查'>
                <Input placeholder="请输入病例检查"/>
            </Form.Item>
            <Form.Item label='病例检查照片' name='病理检查照片'>
                {/* <MyUpload handleFileData={setImageData2} initialImageList={initialImageList}/> */}
            </Form.Item>
            <Form.Item label='诊断结果' name='诊断结果'>
                <Input placeholder="请输入诊断结果"/>
            </Form.Item>
            <Form.Item label='治疗方案' name='治疗方案'>
                <Input placeholder="请输入治疗方案"/>
            </Form.Item>
            <Form.Item label='治疗方案视频' name='治疗方案视频'>
                {/* <MyUpload handleFileData={setVideoData} initialImageList={videoData}/> */}
            </Form.Item>  
          </Form>
        </Modal>
      </>  
        
        
    )
}
export default CaseManage