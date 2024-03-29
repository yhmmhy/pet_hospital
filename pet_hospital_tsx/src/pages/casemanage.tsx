import React, { useEffect, useState } from "react"
import{Card,Button,Form,Input,Table,Modal, message, Space} from 'antd'
import {DeleteOutlined, EditOutlined, PlusOutlined,SearchOutlined, ZoomInOutlined} from '@ant-design/icons';
import MyUpload from "../components/MyUpload";
import MyVideoUpload from "../components/MyVideoUpload";
const generateData = () => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
      data.push({
        key: i,
        编号: `编号 ${i}`,
        名称: `名称 ${i}`,
        接诊: `接诊 ${i}`,
        病例检查: `病例检查 ${i}`,
        诊断结果: `诊断结果 ${i}`,
        治疗方案: `治疗方案 ${i}`,
      });
    }
    return data;
  };
function CaseManage(){
    const [isShow,setIsShow]=useState(false);//控制添加病例的modal
    const [myForm] = Form.useForm();//获取表单元素实例
    const [query,setQuery] = useState({});
    const [data,setData]= useState([]);
    const [currentId,setCurrentId] =useState('');
    const [isInfoShow,setIsInfoShow]= useState(false);
    const [imageData, setImageData] = useState([]);
    const mockData = generateData();
      
      // 模拟的 API 函数
      const loadDataAPI = async (query = {}) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // 返回模拟的数据
        return mockData;
      };
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
            <Form layout="inline" onFinish={(v)=>{
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
            rowKey='id'
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
                        title:'病理检查',
                        dataIndex:'病理检查',
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
                                    setCurrentId(r.key)
                                    // console.log(r.key)
                                    myForm.setFieldsValue(r)
                                }}/>
                                <Button type='primary' icon={<ZoomInOutlined />} onClick={()=>{
                                    setIsInfoShow(true)
                                    setIsShow(true)
                                    setCurrentId(r.key)
                                    // console.log(r.key)
                                    myForm.setFieldsValue(r)
                                }}/>
                                <Button type='primary' icon={<DeleteOutlined/>} danger/>
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
             onFinish={(v)=>{
                if(isInfoShow){
                    setIsInfoShow(false);
                    setIsShow(false);
                    message.success('展示完毕');
                }
                else{
                    if(currentId){
                        message.success('修改成功');
                    }else{
                        message.success('上传成功');
                    }
                    console.log({ ...v,接诊照片:imageData});
                    setIsShow(false);
                    setImageData([]);
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
                <MyUpload handleFileData={setImageData}/>
            </Form.Item>
            <Form.Item label='病例检查' name='病例检查'>
                <Input placeholder="请输入病例检查"/>
            </Form.Item>
            <Form.Item label='病例检查照片' name='病理检查照片'>
                <MyUpload handleFileData={setImageData}/>
            </Form.Item>
            <Form.Item label='诊断结果' name='诊断结果'>
                <Input placeholder="请输入诊断结果"/>
            </Form.Item>
            <Form.Item label='治疗方案' name='治疗方案'>
                <Input placeholder="请输入治疗方案"/>
            </Form.Item>
            <Form.Item label='治疗方案视频' name='治疗方案视频'>
                <MyVideoUpload/>
            </Form.Item>  
          </Form>
        </Modal>
      </>  
        
        
    )
}
export default CaseManage