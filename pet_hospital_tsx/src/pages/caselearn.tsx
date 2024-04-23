import  { useState } from 'react';
import { Card, Button, Space ,Tabs} from 'antd';
import { useNavigate} from 'react-router-dom';
const { TabPane } = Tabs;

const caseData = [
    {
      category: '传染病',
      cases: [
        '犬瘟热',
        '犬细小病毒',
        '犬传染性肝炎',
        '犬冠状病毒',
        '猫泛白细胞减少症',
        '猫病毒性病气管炎',
        '皮肤真菌感染',
      ],
    },
    {
      category: '寄生虫病',
      cases: [
        '蛔虫病',
        '钩虫病',
        '绦虫病',
        '球虫病',
        '疥螨虫病',
        '蚤病',
      ],
    },
    {
      category: '内科',
      cases: [
        '口炎',
        '肠炎',
        '肠便秘',
        '胰腺炎',
        '肝炎',
        '腹膜炎',
        '肛门腺炎',
        '感冒',
        '鼻炎',
        '气管支气管炎',
        '肺炎',
        '心力衰竭',
        '尿道感染',
        '尿结石',
        '膀胱炎',
        '肾炎',
        '佝偻病',
        '有机磷中毒',
        '糖尿病',
        '耳血肿',
        '中耳炎',
        '眼睑内翻',
        '结膜炎',
        '角膜炎',
      ],
    },
    {
      category: '外产科疾病',
      cases: [
        '外伤',
        '外科感染',
        '骨折',
        '关节脱位',
        '湿疹',
        '皮炎',
        '脓皮病',
        '脱毛症',
        '趾间囊肿',
        '疝',
        '阴道炎',
        '阴道脱出',
        '子宫蓄脓',
        '难产',
        '乳房炎',
      ],
    },
  ];

const CaseLearn = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('0');
  const navigate = useNavigate();
  // @ts-ignore
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  // @ts-ignore
  const handleButtonClick = (caseItem) => {
    // console.log(caseItem);
    navigate(`/fore/caselearn/caselist?caseItem=${caseItem}`); // Return Navigate component
  };
  return (
    <Card style={{ width: '100%' }} title="病例学习">
      <Tabs activeKey={activeTabKey} onChange={onTabChange}>
        {caseData.map((item, index) => (
          <TabPane tab={item.category} key={index.toString()} >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {item.cases.map((caseItem, caseIndex) => (
                  <Button
                    key={caseIndex.toString()}
                    type="default"
                    size="large"
                    style={{ minWidth: '280px', margin: '5px' }}
                    onClick={() => handleButtonClick(caseItem)}
                  >
                    {caseItem}
                  </Button>
                ))}
              </div>
            </Space>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default CaseLearn;