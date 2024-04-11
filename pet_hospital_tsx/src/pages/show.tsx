import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';
import { loadDataByIdAPI } from '../services/caseManage';

const Show = () => {
  const location = useLocation();
  const [caseData,setCaseData] = useState({});
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const caseId = searchParams.get('caseId');
    console.log('get caseId', caseId);
    if(caseId!==null){
      loadDataByIdAPI(caseId).then((res) => {
        console.log('当前病例get', res); // 输出模拟的数据
        setCaseData(res.case);
      })
        .catch((error) => {
          console.error("Error:", error);
        })
    }
    
    // Filter the data based on the caseItem
  }, [location.search]);
  // useEffect(() => {
  //   loadDataByIdAPI(id).then((res) => {
  //     console.log('当前病例get', res); // 输出模拟的数据
  //     setCaseData(res.case);
  //   })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     })
  // },[])

  return (
    <Card title="病例信息">
      <p><strong>名称：</strong> {caseData.name}</p>
      <p><strong>接诊：</strong> {caseData.admission}</p>
      <p><strong>病例检查：</strong> {caseData.examination}</p>
      <p><strong>诊断结果：</strong> {caseData.diagnosis}</p>
      <p><strong>治疗方案：</strong> {caseData.treatment_plan}</p>


      {caseData.photo_0&&caseData.photo_0.length > 0 && (
        <div>
          <strong>接诊照片：</strong>
          {caseData.photo_0.map((url, index) => (
            <img key={index} src={url} alt={`接诊照片${index + 1}`} style={{ maxWidth: '100%', marginTop: '10px' }} />
          ))}
        </div>
      )}

      {caseData.photo_1&&caseData.photo_1.length > 0 && (
        <div>
          <strong>病理检查照片：</strong>
          {caseData.photo_1.map((url, index) => (
            <img key={index} src={url} alt={`病理检查照片${index + 1}`} style={{ maxWidth: '100%', marginTop: '10px' }} />
          ))}
        </div>
      )}

      {caseData.video&&caseData.video.length > 0 && (
        <div>
          <strong>治疗方案视频：</strong>
          {caseData.video.map((url, index) => (
            <ReactPlayer key={index} url={url} controls={true} style={{ marginTop: '10px' }} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Show;
