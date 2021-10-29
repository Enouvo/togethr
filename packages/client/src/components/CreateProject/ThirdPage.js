import React, { useContext } from 'react';
import { Button, Avatar, Form } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CreateProjectContext } from '../../pages/create-project';
import banner from '../../assets/create_project_thirdpage_banner.svg';
import avatar from '../../assets/dappstarter.png';
import avatarUpload from '../../assets/avatar_upload.svg';

const ThirdPage = () => {
  const { setForm, form } = useContext(CreateProjectContext);

  const onSubmit = (values) => {
    const submitForm = {
      ...form,
      ...values,
    };
    setForm(submitForm);
    console.log(submitForm);
  };

  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <div className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
        <Form onFinish={onSubmit}>
          <div className="text-center">
            <Avatar src={avatar} size={130} />
            <Avatar src={avatarUpload} size={40} className="avatar-btn" onClick={() => alert('clicked')} />
          </div>
          <div className="flex flex-col my-2 flex-1">
            <span className="text-gray-700 mb-2">NAME</span>
            <Form.Item name="userName">
              <input
                className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold w-full"
                placeholder="Enter your name"
              />
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
            {/* <Link to="/"> */}
            <Button
              type="primary"
              style={{ height: 46, display: 'flex' }}
              className="flex-row items-center"
              htmlType="submit"
            >
              <span>Finish</span>
              <ArrowRightOutlined />
            </Button>
            {/* </Link> */}
            <div>
              <span className="text-blue-700 font-bold text-xl">3/</span>
              <span className="font-bold text-xl">3</span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ThirdPage;
