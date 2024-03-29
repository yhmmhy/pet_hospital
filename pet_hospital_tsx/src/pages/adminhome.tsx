import React from "react";
import { Card ,ConfigProvider, Flex} from "antd";
import Barch from '../components/charts/Barch'
import Piech from "../components/charts/Piech";

const AdminHome: React.FC = () => {
    return(
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        headerFontSize:30,
                    },
                },
            }}
        >
        <Card
            title='欢迎使用虚拟宠物医院后台管理系统！'
            style={{textAlign:"center"}}
        >
            <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                <Barch/>
                <Piech/>
            </div>
           
        </Card>
        </ConfigProvider>
        
    )
}
export default AdminHome