import React from 'react';
import ReactPlayer from 'react-player';
import { Card } from 'antd';

const Show = () => {
  const fakeData = {
    名称: '病例名称示例',
    接诊: '接诊信息示例',
    病例检查: '病例检查信息示例',
    诊断结果: '诊断结果示例',
    治疗方案: '治疗方案示例',
    接诊照片: ['http://localhost:3007/da.png', 'http://localhost:3007/12.png'], // Example array of image URLs
    病理检查照片: ['http://localhost:3007/12.png'], // Example array of image URLs
    治疗方案视频: ['http://localhost:3007/1.mp4', 'http://localhost:3007/1.mp4'], // Example array of video URLs
  };

  return (
    <Card title="病例信息">
      <p><strong>名称：</strong> {fakeData.名称}</p>
      <p><strong>接诊：</strong> {fakeData.接诊}</p>
      <p><strong>病例检查：</strong> {fakeData.病例检查}</p>
      <p><strong>诊断结果：</strong> {fakeData.诊断结果}</p>
      <p><strong>治疗方案：</strong> {fakeData.治疗方案}</p>
      
      {/* Render multiple images if available */}
      {fakeData.接诊照片 && (
        <div>
          <strong>接诊照片：</strong>
          {fakeData.接诊照片.map((url, index) => (
            <img key={index} src={url} alt={`接诊照片${index + 1}`} style={{ maxWidth: '100%', marginTop: '10px' }} />
          ))}
        </div>
      )}
      
      {/* Render multiple images if available */}
      {fakeData.病理检查照片 && (
        <div>
          <strong>病理检查照片：</strong>
          {fakeData.病理检查照片.map((url, index) => (
            <img key={index} src={url} alt={`病理检查照片${index + 1}`} style={{ maxWidth: '100%', marginTop: '10px' }} />
          ))}
        </div>
      )}

      {/* Render multiple videos if available */}
      {fakeData.治疗方案视频 && (
        <div>
          <strong>治疗方案视频：</strong>
          {fakeData.治疗方案视频.map((url, index) => (
            <ReactPlayer key={index} url={url} controls={true} style={{ marginTop: '10px' }} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Show;
