import React from 'react';
import { Drawer } from 'antd';
import { useTheme } from 'antd-style';
import axios from 'axios';
import { ProChat } from '@ant-design/pro-chat/es/ProChat';

axios.defaults.baseURL = 'http://47.102.142.153:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';


  // @ts-ignore
const assist: React.FC<{ open, setOpen, id }> = ({ open, setOpen, id }) => {
    const theme = useTheme();

    return (
        <>
            <Drawer
                title="智能助教"
                onClose={() => { setOpen(false) }}
                open={open}
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <ProChat
                    style={{ background: theme.colorBgLayout }}
                    helloMessage='您好，我是您的智能助教'
                    request={async (messages: Array<any>) => {
                        var ans = '消息回复失败，请重新生成'
                        const resp = await axios.post('/assist', {
                            'messages':messages
                        });
                        if(resp.data.code==200){
                            ans = resp.data.message
                        }
                        // console.log(resp)
                        // console.log(ans)
                        return new Response(ans);
                    }}

                />
            </Drawer>
        </>
    );
};

export default assist;

