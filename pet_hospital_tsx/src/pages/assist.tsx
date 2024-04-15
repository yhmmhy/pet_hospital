import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3007';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const assist: React.FC<{ open, setOpen }> = ({ open, setOpen }) => {
    const theme = useTheme();
    return (
        <>
            <Drawer
                title="智能助教"
                onClose={()=>{setOpen(false)}}
                open={open}
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <ProChat
                    style={{ background: theme.colorBgLayout }}
                    helloMessage = "你好，这里是智能助教。"
                    request={async (messages:Array<any>) => {
                        const resp = await axios.post('/ai/aiResponse', {
                            'messages':messages
                        });
                        console.log(messages)
                        return new Response(resp.data.message);
                    }}
                    
                />
            </Drawer>
        </>
    );
};

export default assist;

