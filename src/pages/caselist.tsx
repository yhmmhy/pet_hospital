import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, ZoomInOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { Navigate, useNavigate ,useLocation} from 'react-router-dom';
type InputRef = GetRef<typeof Input>;

interface DataType {
    key: string;
    编号: string;
    名称: string;
    接诊: string;
    病例检查: string;
    诊断结果: string;
    治疗方案: string;
  }


type DataIndex = keyof DataType;

const data: DataType[] = [];

for (let i = 1; i <= 50; i++) {
  data.push({
    key: `${i}`,
    编号: `编号 ${i}`,
    名称: `名称 ${i}`,
    接诊: `接诊 ${i}`,
    病例检查: `病例检查 ${i}`,
    诊断结果: `诊断结果 ${i}`,
    治疗方案: `治疗方案 ${i}`,
  });
}

const CaseList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const navigate= useNavigate();
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const caseItem = searchParams.get('caseItem');
    console.log('get caseItem',caseItem);
    // Filter the data based on the caseItem
    
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
      title: '编号',
      dataIndex: '编号', 
      key: '编号',
      width: '10%',
      ...getColumnSearchProps('编号'),
    },
    {
      title: '名称',
      dataIndex: '名称', 
      key: '名称',
      width: '10%',
      ...getColumnSearchProps('名称'),
    },
    {
      title: '接诊',
      dataIndex: '接诊', 
      key: '接诊',
      width: '10%',
      ...getColumnSearchProps('接诊'),
    },
    {
      title: '病例检查',
      dataIndex: '病例检查', 
      key: '病例检查',
      width: '15%',
      ...getColumnSearchProps('病例检查'),
    },
    {
      title: '诊断结果',
      dataIndex: '诊断结果',
      key: '诊断结果',
      width: '15%',
      ...getColumnSearchProps('诊断结果'),
    },
    {
      title: '治疗方案',
      dataIndex: '治疗方案', 
      key: '治疗方案',
      width: '20%',
      ...getColumnSearchProps('治疗方案'),
    //   sorter: (a, b) => a.名称.length - b.名称.length,
    //   sortDirections: ['descend', 'ascend'],
    },{
        title:'查看详情',
        align:'center',
        width:100,
        render(v,r:any){
            return <Space>
                <Button type='primary' icon={<ZoomInOutlined />} onClick={()=>{
                   console.log(r.key)
                  navigate(`/fore/caselearn/caseshow?caseId=${r.key}`)
                }}/>

                
                
            </Space>
        }
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default CaseList;                              