import React,{Suspense} from "react";
import { Card, ConfigProvider } from "antd";


const Barch = React.lazy(() => import('../components/charts/Barch'));
const Piech = React.lazy(() => import('../components/charts/Piech'));

const AdminHome: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        headerFontSize: 30,
                    },
                },
            }}
        >

            <Card
                title='欢迎使用虚拟宠物医院后台管理系统！'
                style={{ textAlign: "center" }}
            >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Barch />
                        <Piech />
                    </Suspense>

                </div>
            </Card>
        </ConfigProvider>

    )
}
export default AdminHome