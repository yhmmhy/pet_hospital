import React, { useRef, useState, useEffect } from 'react';
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
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import axios from 'axios'


type InputRef = GetRef<typeof Input>;

interface DataType {
  key: number;
  name: string;
  type: string;
  description: string;
  img: string; //url
  price: number;

}

type DataIndex = keyof DataType;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const data: DataType[] = [
  
];


const ChargeManage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [datasource, setDatasource] = useState<DataType[]>(data)
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [rec, setRec] = useState({
    key: 6,
    name: '药品1',
    type: '药品',
    description: '文字描述',
    img: 'url1', //url
    price: 11.1
  })
  const [imageUrl, setImageUrl] = useState<string>();
  axios.defaults.baseURL = 'http://47.102.142.153:5000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';


  useEffect(() => {
    axios.get('/fee/get').then((res) => {
      setDatasource(res.data.projectlist)
    })
      .catch(error => {
        console.log(error);
      });
  }, [])

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>项目图片</div>
    </button>
  );
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    if (isJpgOrPng && isLt2M) {
      getBase64(file as FileType, (url) => {
        setImageUrl(url);
        form1.setFieldValue('img', url);
      });
    }
    return false;
  };
  const beforeUpload2 = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    if (isJpgOrPng && isLt2M) {
      getBase64(file as FileType, (url) => {
        setImageUrl(url);
        form2.setFieldValue('img', url)
      });
    }
    return false;
  };

  const close = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
  };
  const AddFormFinish = (value) => {
    if (confirm("确定要添加这个收费项目吗") === true) {
      axios.post('/admin/fee/add', {
        'key':value.key,
        'name': value.name,
        'type': value.type,
        'description': value.description,
        'img': value.img,
        'price': value.price
      }).then(res => {
        console.log(res.data)
        alert(res.data.message)
        if (res.data.code == 200) {
          datasource.push(value)
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
    if (confirm("确定要将这个项目的信息修改成如下信息吗") === true) {
      axios.post('/admin/fee/edit/'+value.key,{
          'name': value.name,
          'type': value.type,
          'description': value.description,
          'img': value.img,
          'price': value.price
      }).then(res => {
        alert(res.data.message)
        if (res.data.code ==200) {
          setDatasource(
            datasource.map(p => p.key === rec.key ? {
              ...p,
              'name': value.name,
              'type': value.type,
              'description': value.description,
              'img': value.img,
              'price': value.price
            } : p)
          )
          setIsModal2Open(false)
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
          width: '30%',
          ellipsis: false,
          ...getColumnSearchProps('description'),
        },
        {
          title: '图片',
          dataIndex: 'img',
          key: 'img',
          width: '15%',
          render: (_, record) => {
            return <Image
              src={record.img}
              style={{ maxWidth: '100%' }}
            />
          }
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          width: '10%',
          ...getColumnSearchProps('price'),
          sorter: (a, b) => a.price - b.price,
          sortDirections: ['descend', 'ascend'],
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
              'type': record.type,
              'description': record.description,
              'img': record.img,
              'price': record.price,
            });
            setImageUrl(record.img)
            setRec(record);
          }}>编辑项目</Button>
          <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => {
            if (confirm("确定要删除这条用户数据吗")) {
              axios.post('/admin/fee/delete/'+record.key).then(res => {
                alert(res.data.message);
                if (res.data.message == '删除成功') {
                  setDatasource(res.data.feelist);
                }
              }, error => {
                console.log('错误', error.message)
              })
              // console.log("删除");
              
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
            <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="项目名" showCount maxLength={20} />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: '请选择项目类型' }]}
          >
            <Select
              style={{ width: 472 }}
              // onChange={handleChange}
              options={[
                { value: '药品', label: '药品' },
                { value: '化验项目', label: '化验项目' },
                { value: '疫苗', label: '疫苗' },
                { value: '收费项目', label: '收费项目' },
              ]}
              placeholder='项目类型'
              menuItemSelectedIcon={<AlignLeftOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: '请输入简述' }]}
          >
            <Input.TextArea
              showCount
              placeholder="简述"
              maxLength={100}
            />
          </Form.Item>
          <Form.Item
            name="img"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <Upload
              name="img"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: '请输入项目价格' }]}
          >
            <Input
              prefix={<PayCircleOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="价格"
              maxLength={10}
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
            <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="项目名" showCount maxLength={20} />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: '请选择项目类型' }]}
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
            <Input.TextArea
              placeholder="简述"
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Form.Item
            name="img"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <Upload
              name="img"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload2}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: '请输入项目价格' }]}
          >
            <Input
              prefix={<PayCircleOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="价格"
              maxLength={10}
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
              setImageUrl('')
              setIsModal1Open(true);
            }}>添加项目</Button>
          </>
        }
        style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
      >
        <Table columns={columns} dataSource={datasource} pagination={{ defaultPageSize: 8 }} />
      </Card>
    </div >
  );
};

export default ChargeManage;