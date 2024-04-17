import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, ZoomInOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, message } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { Navigate, useNavigate ,useLocation} from 'react-router-dom';
import { loadDataByNameAPI, loadDataByTypeAPI } from '../services/caseManage';
type InputRef = GetRef<typeof Input>;

interface DataType {
    id: number;
    name: string;
    admission: string;
    examination: string;
    diagnosis: string;
    treatment_plan: string;
  }


type DataIndex = keyof DataType;



const CaseList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data,setData] =useState([]);
  const searchInput = useRef<InputRef>(null);
  const navigate= useNavigate();
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const caseItem = searchParams.get('caseItem');
    console.log('get caseItem',caseItem);
    // Filter the data based on the caseItem
    if(caseItem!==null){
      loadDataByTypeAPI(caseItem).then((res) => {
        console.log(res);
        if (res.message === '读取病例记录成功') {
          setData(res.cases);
          message.success('查询成功');
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    }
  }, [location.search]);
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
          placeholder={`Search ${dataIndex}`}
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
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
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
      title: '',
      dataIndex: 'id', 
      key: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
    },
    {
      title: '名称',
      dataIndex: 'name', 
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'admission',
      dataIndex: 'admission', 
      key: 'admission',
      width: '10%',
      ...getColumnSearchProps('admission'),
    },
    {
      title: 'examination',
      dataIndex: 'examination', 
      key: 'examination',
      width: '15%',
      ...getColumnSearchProps('examination'),
    },
    {
      title: 'diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
      width: '15%',
      ...getColumnSearchProps('diagnosis'),
    },
    {
      title: 'treatment_plan',
      dataIndex: 'treatment_plan', 
      key: 'treatment_plan',
      width: '20%',
      ...getColumnSearchProps('treatment_plan'),
    //   sorter: (a, b) => a.name.length - b.name.length,
    //   sortDirections: ['descend', 'ascend'],
    },{
        title:'查看详情',
        align:'center',
        width:100,
        render(v,r:any){
            return <Space>
                <Button type='primary' icon={<ZoomInOutlined />} onClick={()=>{
                   console.log(r.key)
                  navigate(`/fore/caselearn/caseshow?caseId=${r.id}`)
                }}/>

                
                
            </Space>
        }
    }
  ];

  return <Table columns={columns} dataSource={data} rowKey='id'/>;
};

export default CaseList;                              