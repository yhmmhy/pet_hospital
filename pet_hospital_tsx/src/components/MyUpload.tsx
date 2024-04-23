  // @ts-nocheck
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd/lib';
import type { GetProp, UploadFile, UploadProps } from 'antd/lib';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType, p0: (url: any) => void): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
// @ts-ignore
const MyUpload = ({ handleFileData, initialImageList, isShow }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);
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
    if (initialImageList.length > 0) {
      updateFileList(initialImageList);
    }

  }, []);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    console.log('file.url', file.url);
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const validFiles = newFileList.filter(file => {
      return isImage(file);
   });
    const updatedFileList = validFiles.map((file) => {
      if (!file.url) {
        // 如果文件没有url，则解析并添加url字段
        getBase64(file.originFileObj as FileType).then((url) => {
          file.url = url;// 更新状态
        }).catch((error) => {
          console.error('Error while getting base64:', error);
        });
      }
      return file;
    });
    setFileList(updatedFileList);
    console.log(updatedFileList);
    handleFileData(updatedFileList);
  };
  const isImage = (file: File) => {
    // 根据文件类型判断是否为图片文件
    return file.status === 'done' || file.type.startsWith('image/');
  };

  // 添加beforeUpload函数，以便上传文件之前的钩子
  const beforeUpload: UploadProps['beforeUpload'] = async (file, fileList) => {
    const isImageFile = isImage(file as File);
    if (!isImageFile) {
      message.error('请上传图片文件');
    }
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
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload} // 添加 beforeUpload 函数
        showUploadList={{ showRemoveIcon: !isShow }}
      >
        {(fileList.length >= 8 || isShow === true) ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MyUpload;