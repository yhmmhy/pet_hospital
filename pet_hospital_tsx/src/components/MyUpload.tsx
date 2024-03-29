import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
 // @ts-ignore
const MyUpload = ({ handleFileData,initialImageList}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const urlToFile = (url: string): UploadFile => ({
    uid: url,
    name: url.substring(url.lastIndexOf('/') + 1),
    status: 'done',
    url: url,
  });

  // 更新文件列表状态
  const updateFileList = (urls: string[]) => {
    const newFileList = urls.map(urlToFile);
    setFileList(newFileList);
    handleFileData(newFileList);
  };
  useEffect(() => {
    // 在组件加载时，将初始图片URL转换为fileList格式
    updateFileList(initialImageList);
  }, []);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // console.log(newFileList);
    handleFileData(newFileList);
  };
  // 添加beforeUpload函数，以便上传文件之前的钩子
  const beforeUpload: UploadProps['beforeUpload'] = (file, fileList) => {
    // 可以对文件进行处理，例如校验文件类型、大小等
    return false; // 返回 true 开始上传，返回 false 停止上传
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        name='file'
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        action="http://localhost:3007/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload} // 添加 beforeUpload 函数
        // data={data} // 添加 data 属性
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MyUpload;