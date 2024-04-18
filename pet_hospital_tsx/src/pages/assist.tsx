import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = 'Bearer fastgpt-7ABK8zeleOPA8abak7PvwMo6o6SiCDVdpQycq8cMRMAOZVTTKAkgZcz9BaZzH58';

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
                        const resp = await axios.post('https://api.fastgpt.in/api/v1/chat/completions', {
                            "chatId": id,
                            "stream": false,
                            "detail": false,
                            'messages': [
                                {
                                    'content': messages[messages.length - 1].content,
                                    'role': messages[messages.length - 1].role
                                }
                            ]
                        });
                        const ans = resp.data.choices[0].message.content
                        console.log(id)
                        return new Response(ans);
                    }}

                />
            </Drawer>
        </>
    );
};

export default assist;

