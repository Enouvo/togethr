import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  notification,
  Form,
  Select,
  Upload,
  Image,
  Spin,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import banner from "../../assets/create_project_banner.svg";
import upload from "../../assets/upload.svg";
import { createProject } from "../../flow/flow";
import { CreateProjectContext } from "../../pages/create-project";
import { getIpfs, ipfs } from "../../utils/ipfs";
import { categories } from "../../utils/tootls";

const FirstPage = () => {
  const { setCurrentPage, setForm } = useContext(CreateProjectContext);
  const [imagePath, setImagePath] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const uploadImage = async (data) => {
    try {
      setImageLoading(true);
      const image = await ipfs.add(data.file.originFileObj);
      const imageURL = getIpfs(image.path);
      setImagePath(imageURL);
    } catch (error) {
      notification.error(error.message);
    } finally {
      setImageLoading(false);
    }
  };
  const onSubmit = async (values) => {
    setForm((prev) => {
      return {
        ...prev,
        ...values,
        projectImage: imagePath,
      };
    });
    setCurrentPage(2);
  };
  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <div className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
        <Form onFinish={onSubmit} layout="vertical">
          <div className="flex flex-col my-2">
            <Form.Item
              name="projectName"
              label="PROJECT NAME"
              rules={[
                { required: true, message: "Please input your project name" },
              ]}
            >
              <Input
                className="form-input"
                placeholder="Enter your project name"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col my-2">
            <Form.Item
              name="projectCategory"
              label="PROJECT CATEGORY"
              rules={[
                {
                  required: true,
                  message: "Please input your project category",
                },
              ]}
            >
              <Select options={categories} />
            </Form.Item>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-gray-700 mb-2">DESCRIPTION</span>
            <Form.Item name="projectDescription">
              <textarea
                className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none bg-transparent font-extrabold resize-none w-full"
                placeholder="Enter your project name"
                rows={7}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col my-2">
            {(() => {
              if (imageLoading) return <Spin />;
              return (
                <Form.Item
                  name="image"
                  label="UPLOAD FILE"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your project picture",
                    },
                  ]}
                >
                  <div
                    className={`flex flex-col ${
                      !imagePath && "p-40"
                    } justify-center text-center items-center bg-gray-100 rounded-lg mt-4`}
                  >
                    <Upload showUploadList={false} onChange={uploadImage}>
                      {imagePath ? (
                        <Image src={imagePath} preview={false} />
                      ) : (
                        <div className="text-center flex flex-col">
                          <img src={upload} className="mb-2 w-8 m-auto" />
                          <span className="text-gray-700 font-semibold text-lg">
                            PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                          </span>
                        </div>
                      )}
                    </Upload>
                  </div>
                </Form.Item>
              );
            })()}
          </div>
          <div className="flex flex-row justify-between items-center">
            <Button
              type="primary"
              style={{ height: 46, display: "flex" }}
              className="flex-row items-center"
              htmlType="submit"
            >
              <span>Next</span>
              <ArrowRightOutlined />
            </Button>
            <div>
              <span className="text-blue-700 font-bold text-lg">1</span>
              <span className="font-bold text-lg">/3</span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FirstPage;
