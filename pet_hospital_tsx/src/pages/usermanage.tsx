import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, WarningOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType, RadioChangeEvent } from 'antd';
import { Button, Card, Input, Space, Table, Form, Modal, Radio, ConfigProvider } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios'
import { Md5 } from 'ts-md5'

type InputRef = GetRef<typeof Input>;

interface DataType {
  key: number;
  name: string;
  role: string;
  phone: string;
  mail: string;
}

type DataIndex = keyof DataType;


const UserManage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [datasource, setDatasource] = useState<DataType[]>([])
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [radioValue1, setRadioValue1] = useState('实习生');
  const [radioValue2, setRadioValue2] = useState('实习生');
  const [rec, setRec] = useState({
    key: 1,
    name: 'John Brown',
    role: '实习生',
    phone: '13112345678',
    mail: '1234567891@qq.com',
  })
  axios.defaults.baseURL = 'http://47.102.142.153:5000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  useEffect(() => {
    axios.get('/getuser').then((res) => {
      setDatasource(res.data.userlist)
    })
      .catch(error => {
        console.log(error);
      });
  }, [])


  const RadioChange1 = (e) => {
    setRadioValue1(e.target.value)
    form1.setFieldsValue({ "role": e.target.value });
  };
  const RadioChange2 = (e) => {
    setRadioValue2(e.target.value)
    form2.setFieldsValue({ "role": e.target.value });
  };


  //关闭弹窗
  const close = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
    setIsModal3Open(false)
  };
  const handleValidator = (rule, value, callback) => {
    if (!value) {
      callback();
    }
    const pwd = form1.getFieldValue('pwd')
    let validateResult = value == pwd;  // 自定义规则
    if (!validateResult) {
      callback('两次密码不一致！');
    }
    callback();
  }
  const handleValidator2 = (rule, value, callback) => {
    if (!value) {
      callback();
    }
    const pwd = form3.getFieldValue('pwd')
    let validateResult = value == pwd;  // 自定义规则
    if (!validateResult) {
      callback('两次密码不一致！');
    }
    callback();
  }


  const AddFormFinish = (value) => {
    if (confirm("确定要添加这个用户吗") === true) {
      const md5 = Md5.hashStr(value.pwd);
      var is_admin = 0;
      if(value.role == '管理员'){
          is_admin = 1;
      }
      axios.post('/register', {
          'account': value.name,
          'is_admin': is_admin,
          'password': md5,
          'phone': value.phone,
          'mail': value.mail
      }).then(res => {
        // res.data.code == 200
        if (res.data.message == "注册成功") {
          alert('添加成功');
          datasource.push(value)
          // console.log(datasource)
          setDatasource([...datasource])
          setIsModal1Open(false)
          form1.resetFields()
        }
      }, error => {
        console.log('错误', error.message)
      })

    }

  }
  const ModifyFormFinish = (value) => {
    if (confirm("确定要将这个用户的信息修改成如下信息吗") === true) {
      axios.post('/update_user_info', {
        'id': rec.key,
        'account': value.name,
        'mail': value.mail,
        'phone': value.phone,
        'role': value.role
      }).then(res => {
        alert(res.data.message);
        if (res.data.code == 200) {
          setDatasource(
            datasource.map(p => p.key === rec.key ? {
              ...p,
              'name': value.name,
              'mail': value.mail,
              'phone': value.phone,
              'role': value.role
            } : p)
          )
          setIsModal2Open(false);
        }
      }, error => {
        console.log('错误', error.message)
      })
    }
  }

  const PwdFormFinish = (value) => {
    if (confirm("确定要修改密码吗") === true) {
      const md5 = Md5.hashStr(value.pwd);
      axios.post('/admin/change_password', {
        'id': rec.key,
        'pwd': md5,
      }).then(res => {
        alert(res.data.message);
        if (res.data.code == 200) {
          setIsModal3Open(false);
          form3.resetFields()
        }
      }, error => {
        console.log('错误', error.message)
      })
    }
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            筛选
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            关闭
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: '用户ID',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
      ...getColumnSearchProps('key'),
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: '角色权限',
      dataIndex: 'role',
      key: 'role',
      width: '15%',
      ...getColumnSearchProps('role'),
    },
    {
      title: '基本信息',
      children: [
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone',
          width: '15%',
          ...getColumnSearchProps('phone'),
        },
        {
          title: '邮箱',
          dataIndex: 'mail',
          key: 'mail',
          width: '20%',
          ...getColumnSearchProps('mail'),
        }
      ],
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => {
            setIsModal2Open(true);
            form2.setFieldsValue({
              'key': record.key,
              'name': record.name,
              'mail': record.mail,
              'phone': record.phone,
              'role': record.role,
            });
            setRec(record);
          }}>编辑用户</Button>
          <Button type="primary" style={{ backgroundColor: 'black' }} icon={<WarningOutlined />} onClick={() => {
            setIsModal3Open(true);
            setRec(record);
          }}>修改密码</Button>
          <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => {
            if (confirm("确定要删除这条用户数据吗")) {
              axios.post('/admin/delete_user', {
                'id': record.key,
              }).then(res => {
                alert(res.data.message);
                if (res.data.code == 200) {
                  // setDatasource(res.data.userlist);
                  
                }
              }, error => {
                console.log('错误', error.message)
              })
            }
          }} icon={<DeleteOutlined />}>删除用户</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal title="添加用户" open={isModal1Open} onCancel={close} footer={[]}>
        <Form
          style={{ marginTop: '30px' }}
          labelCol={{
            md: {
              span: 4,
            },
          }}
          form={form1}
          onFinish={AddFormFinish}
          initialValues={{
            'key': datasource.length + 1,
            'role': '实习生'
          }}
        >
          <Form.Item
            name="key"
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入用户名' }, { pattern: new RegExp('^[a-zA-Z0-9_]{3,20}$', 'g'), message: '用户名长度为3-20位，允许使用字母，数字和下划线' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="pwd"
            rules={[{ required: true, message: '请输入密码' }, { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'), message: '密码必须包含字母和数字，不能使用特殊字符，长度在 6-20 之间' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            name="pwd2"
            rules={[{ required: true, message: '请再次确认密码' }, { validator: (rules, value, callback) => { handleValidator(rules, value, callback) } }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="确认密码"
            />
          </Form.Item>
          <Form.Item
            name="mail"
            rules={[{ required: true, message: '请输入邮箱' }, {
              pattern: new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'g'
              ), message: '请输入正确的邮箱地址'
            }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="邮箱"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号码' }, {
              pattern: new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, 'g'
              ), message: '请输入正确的手机号码'
            }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="tel"
              placeholder="手机号码"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} name="role">
            <Radio.Group defaultValue="实习生" onChange={RadioChange1} value={radioValue1}>
              <Radio.Button value="实习生">实习生</Radio.Button>
              <Radio.Button value="管理员">管理员</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' style={{
              display: 'block',
              margin: '8px auto',
              width: '20vw',
            }}>提交</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="编辑用户" open={isModal2Open} onCancel={close} footer={[]}>
        <Form
          style={{ marginTop: '30px' }}
          labelCol={{
            md: {
              span: 4,
            },
          }}
          form={form2}
          onFinish={ModifyFormFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入用户名' }, { pattern: new RegExp('^[a-zA-Z0-9_]{3,20}$', 'g'), message: '用户名长度为3-20位，允许使用字母，数字和下划线' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="mail"
            rules={[{ required: true, message: '请输入邮箱' }, {
              pattern: new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'g'
              ), message: '请输入正确的邮箱地址'
            }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="邮箱"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号码' }, {
              pattern: new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, 'g'
              ), message: '请输入正确的手机号码'
            }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="tel"
              placeholder="手机号码"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} name="role">
            <Radio.Group onChange={RadioChange2} value={radioValue2}>
              <Radio.Button value="实习生">实习生</Radio.Button>
              <Radio.Button value="管理员">管理员</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' style={{
              display: 'block',
              margin: '8px auto',
              width: '20vw',
            }}>提交</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="修改密码" open={isModal3Open} onCancel={close} footer={[]}>
        <Form
          style={{ marginTop: '30px' }}
          labelCol={{
            md: {
              span: 4,
            },
          }}
          onFinish={PwdFormFinish}
          form={form3}
        >
          <Form.Item
            name="pwd"
            rules={[{ required: true, message: '请输入新密码' }, { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'), message: '密码必须包含字母和数字，不能使用特殊字符，长度在 6-20 之间' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="新密码"
            />
          </Form.Item>
          <Form.Item
            name="pwd2"
            rules={[{ required: true, message: '请再次确认密码' }, { validator: (rules, value, callback) => { handleValidator2(rules, value, callback) } }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="确认密码"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' style={{
              display: 'block',
              margin: '8px auto',
              width: '20vw',
            }}>提交</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Card
        title='用户管理'
        extra={
          <>
            <Button type="primary" style={{ float: 'right' }} icon={<PlusOutlined />} onClick={() => {
              setIsModal1Open(true);
            }}>添加用户</Button>
          </>
        }
      >
        <Table columns={columns} dataSource={datasource} pagination={{ defaultPageSize: 8 }} />
      </Card>
    </div >
  );
};

export default UserManage;