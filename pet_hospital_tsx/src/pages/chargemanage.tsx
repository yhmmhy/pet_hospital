import React, { useRef, useState } from 'react';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  WarningOutlined,
  FileTextOutlined,
  AlignLeftOutlined,
  FileOutlined,
  FileImageOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType, RadioChangeEvent } from 'antd';
import { Button, Card, Input, Space, Table, Form, Modal, Radio, ConfigProvider, Select, Image } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useForm } from 'antd/es/form/Form';
import Upload2 from '../components/Upload2';
type InputRef = GetRef<typeof Input>;

interface DataType {
  key: number;
  name: string;
  type: string;
  description: string;
  img: Array<string>; //url
  price: number;

}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: 1,
    name: '药品1',
    type: '疫苗',
    description: '文字描述\n第二条',
    img: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'], //url
    price: 11.1
  },
  {
    key: 2,
    name: '药品1',
    type: '药品',
    description: '文字描述',
    img: ['https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'], //url
    price: 11.1
  },
];

const ChargeManage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [datasource, setDatasource] = useState(data)
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [uploadValue, setUploadValue] = useState<string>()
  const [rec, setRec] = useState({
    key: 6,
    name: '药品1',
    type: '药品',
    description: '文字描述',
    img: ['url1'], //url
    price: 11.1
  })


  const close = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
  };
  const AddFormFinish = (value) => {
    if (confirm("确定要添加这个用户吗") === true) {
      datasource.push(value)
      console.log(datasource)
      setDatasource([...datasource])
      setIsModal1Open(false)
      form1.resetFields()
    }

  }
  const ModifyFormFinish = (value) => {
    // if (confirm("确定要将这个用户的信息修改成如下信息吗") === true) {
    //   setDatasource(
    //     datasource.map(p => p.key === rec.key ? {
    //       ...p,
    //       'name': value.name,
    //       'pwd': value.pwd === '' ? rec.pwd : value.pwd,
    //       'mail': value.mail,
    //       'phone': value.phone,
    //       'role': value.role
    //     } : p)
    //   )
    //   setIsModal2Open(false);
    // }
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
      title: '项目ID',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
      ...getColumnSearchProps('key'),
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '项目名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: '项目类型',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      ...getColumnSearchProps('type'),
    },
    {
      title: '项目信息',
      children: [
        {
          title: '简述',
          dataIndex: 'description',
          key: 'description',
          width: '45%',

          ...getColumnSearchProps('description'),
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          width: '10%',
          ...getColumnSearchProps('price'),
        }
      ],
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<SearchOutlined />} onClick={() => {
            setIsModal2Open(true);
          }}>查看图片</Button>
          <Button type="primary" icon={<EditOutlined />} onClick={() => {
            setIsModal2Open(true);
            form2.setFieldsValue({
              'key': record.key,
              'name': record.name,
              'type': record.type,
              'description': record.description,
              'img': record.img,
              'price': record.price,
            });
            setRec(record);
          }}>编辑项目</Button>
          <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => {
            if (confirm("确定要删除这条用户数据吗")) {
              // console.log("删除");
              datasource.forEach(function (item, index) {
                if (item.key === record.key) {
                  datasource.splice(index, 1)
                }
              })
              // console.log(datasource)
              setDatasource([...datasource])
            }
          }} icon={<DeleteOutlined />}>删除项目</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal title="添加项目" open={isModal1Open} onCancel={close} footer={[]}>
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
            rules={[{ required: true, message: '请输入项目名' }]}
          >
            <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="项目名" />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: '请输入项目类型' }]}
          >
            <Select
              style={{ width: 472 }}
              // onChange={handleChange}
              options={[
                { value: '药品', label: '药品' },
                { value: '化验项目', label: '化验项目' },
                { value: '疫苗', label: '疫苗' },
              ]}
              placeholder='项目类型'
              menuItemSelectedIcon={<AlignLeftOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: '请输入简述' }]}
          >
            <Input
              prefix={<FileTextOutlined className="site-form-item-icon" />}
              placeholder="简述"
            />
          </Form.Item>
          <Form.Item
            name="img"
            rules={[{ required: true, message: '请输入图片url' }]}
          >
            <Input
              prefix={<FileImageOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="图片"
            />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: '请输入项目价格' }]}
          >
            <Input
              prefix={<PayCircleOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="价格"
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
      <Modal title="编辑项目" open={isModal2Open} onCancel={close} footer={[]}>
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
            name="key"
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入项目名' }]}
          >
            <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="项目名" />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: '请输入项目类型' }]}
          >
            <Select
              style={{ width: 472 }}
              // onChange={handleChange}
              options={[
                { value: '药品', label: '药品' },
                { value: '化验项目', label: '化验项目' },
                { value: '疫苗', label: '疫苗' },
              ]}
              placeholder='项目类型'
              menuItemSelectedIcon={<AlignLeftOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: '请输入简述' }]}
          >
            <Input
              prefix={<FileTextOutlined className="site-form-item-icon" />}
              placeholder="简述"
            />
          </Form.Item>
          <Form.Item
            name="img"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <Upload2/>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: '请输入项目价格' }]}
          >
            <Input
              prefix={<PayCircleOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="价格"
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
        title='收费管理'
        extra={
          <>
            <Button type="primary" style={{ float: 'right' }} icon={<PlusOutlined />} onClick={() => {
              setIsModal1Open(true);
            }}>添加项目</Button>
          </>
        }
      >
        <Table columns={columns} dataSource={datasource} pagination={{ defaultPageSize: 8 }} />
      </Card>
    </div >
  );
};

export default ChargeManage;