import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType, p0: (url: any) => void): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
 // @ts-ignore
const VideoUpload = ({ handleFileData,initialImageList}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileUrl,setFileUrl] = useState('');
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
    if(initialImageList.length > 0){
      updateFileList(initialImageList);
    }

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
    const validFiles = newFileList.filter(file => {
        return file.status === 'done' || file.type.startsWith('video/');
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
    // setFileList(validFiles);
    // console.log(validFiles);
    // handleFileData(validFiles);
  };
  const isVideo = (file: File) => {
    return file.status === 'done' || file.type.startsWith('video/');
  };

  // beforeUpload函数仅允许视频文件
  const beforeUpload: UploadProps['beforeUpload'] = (file: FileType) => {
    const isVideoFile = isVideo(file as File);
    if (!isVideoFile) {

      console.log('请仅上传视频文件。');
    }
    return false;
  };
  // 添加beforeUpload函数，以便上传文件之前的钩子

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传视频</div>
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
        // data={data} // 添加 data 属性
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <video style={{ width: '100%' }} controls>
          <source src={previewImage} type="video/mp4" />
          您的浏览器不支持视频标签。
        </video>
      </Modal>
    </>
  );
};

export default VideoUpload;