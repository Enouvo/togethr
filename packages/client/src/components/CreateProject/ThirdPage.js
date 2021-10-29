import React, { useContext, useState } from 'react';
import { Button, Avatar, Form, notification, Upload, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { CreateProjectContext } from '../../pages/create-project';
import { getIpfs, ipfs } from '../../utils/ipfs';
import banner from '../../assets/create_project_thirdpage_banner.svg';
import avatarUpload from '../../assets/avatar_upload.svg';
import { createProject } from '../../flow/flow';
import Loading from '../Loading';

const ThirdPage = () => {
  const { setForm, form } = useContext(CreateProjectContext);
  const [userImage, setUserImage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const submitForm = {
      ...form,
      ...values,
      userImage: userImage,
    };
    setForm(submitForm);
    try {
      const dataObject = await ipfs.add(
        JSON.stringify({
          imageURL: submitForm.projectImage,
          projectDescription: submitForm.projectDescription,
          description: submitForm.description,
          projectCategory: submitForm.projectCategory,
          userImage: submitForm.userImage,
          userName: submitForm.userName,
          projectName: submitForm.projectName,
        })
      );
      await createProject({
        tokenName: submitForm.tokenName,
        ipfsHash: dataObject.path,
        tokenPrice: String(Number(submitForm.pricePerToken).toFixed(2)),
        tokenCount: +submitForm.totalAmountToRaise,
        profitSharePercent: +submitForm.percentageOfProfit,
      });
      notification.success({ message: 'Create project success!' });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (data) => {
    try {
      const image = await ipfs.add(data.file.originFileObj);
      const imageURL = getIpfs(image.path);
      setUserImage(imageURL);
    } catch (error) {
      notification.error(error.message);
    }
  };

  return (
    <>
      <Loading active={loading} />
      <div className="flex flex-col justify-center">
        <img src={banner} />
        <div className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
          <Form onFinish={onSubmit} layout="vertical">
            <div className="text-center">
              <Avatar src={userImage} size={130} />
              <Form.Item name="userImage">
                <Upload showUploadList={false} onChange={uploadImage}>
                  <Avatar src={avatarUpload} size={40} className="avatar-btn" />
                </Upload>
              </Form.Item>
            </div>
            <div className="flex flex-col my-2 flex-1">
              <Form.Item
                name="userName"
                label="NAME"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ]}
              >
                <Input className="form-input" placeholder="Enter your name" />
              </Form.Item>
            </div>
            <div className="flex flex-col my-2">
              <span className="text-gray-700 mb-2">DESCRIPTION</span>
              <Form.Item name="description">
                <textarea
                  className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none bg-transparent font-extrabold resize-none w-full"
                  placeholder="Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are"
                  rows={7}
                />
              </Form.Item>
            </div>
            <div className="flex flex-row justify-between items-center mt-8">
              <Button
                type="primary"
                style={{ height: 46, display: 'flex' }}
                className="flex-row items-center"
                htmlType="submit"
              >
                <span>Finish</span>
                <ArrowRightOutlined />
              </Button>
              <div>
                <span className="text-blue-700 font-bold text-xl">3/</span>
                <span className="font-bold text-xl">3</span>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ThirdPage;
