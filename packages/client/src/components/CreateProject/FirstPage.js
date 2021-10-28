import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, notification, Form, Select, Upload, Image, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import banner from "../../assets/create_project_banner.svg";
import upload from "../../assets/upload.svg";
import { createProject } from "../../flow/flow";
import { CreateProjectContext } from "../../pages/create-project";
import { getIpfs, ipfs } from "../../utils/ipfs";

const FirstPage = () => {
  const { setCurrentPage, setForm } = useContext(CreateProjectContext);
  const [imagePath, setImagePath] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const options = [
    { value: "chocolate" },
    { value: "strawberry" },
    { value: "vanilla" },
  ];

  const uploadImage = async (data) => {
    try {
      setImageLoading(true);
      const image = await ipfs.add(data.file.originFileObj);
      const imageURL = getIpfs(image.path);
      setImagePath(imageURL);
      // const dataObject = await ipfs.add(
      //   JSON.stringify({
      //     imageURL: imageURL,
      //     description: "test",
      //   })
      // );
      // await createProject({
      //   projectName: "asd",
      //   ipfsHash: dataObject.path,
      //   tokenPrice: "10.00000000",
      //   tokenCount: 1,
      //   profitSharePercent: 1,
      // });
      // notification.success({ message: "Create project success!" });
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
        firstPage: {
          ...values,
          image: imagePath,
        },
      };
    });
    setCurrentPage(2);
  };
  console.log(imagePath);
  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <div className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
        <Form onFinish={onSubmit}>
          <div className="flex flex-col my-2">
            <span className="text-gray-700 mb-2">PROJECT NAME</span>
            <Form.Item name="projectName">
              <input
                className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold w-full"
                placeholder="Enter your project name"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-gray-700 mb-1">PROJECT CATEGORY</span>
            <Form.Item name="projectCategory">
              <Select options={options} />
            </Form.Item>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-gray-700 mb-2">DESCRIPTION</span>
            <Form.Item name="description">
              <textarea
                className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none bg-transparent font-extrabold resize-none w-full"
                placeholder="Enter your project name"
                rows={7}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-gray-700 mb-1">UPLOAD FILE</span>
            <span className="text-gray-700 mb-2">
              Drag or choose your file to upload
            </span>

            {(() => {
              if (imageLoading) return <Spin />;

              if (imagePath)
                return (
                  <Image
                    src={imagePath}
                    className="mb-2 w-full h-auto"
                    preview={false}
                  />
                );

              return (
                <div className="flex flex-col p-40 justify-center text-center items-center bg-gray-100 rounded-lg mt-4">
                  <Form.Item name="image">
                    <Upload showUploadList={false} onChange={uploadImage}>
                      <div className="text-center flex flex-col">
                        <img src={upload} className="mb-2 w-8 m-auto" />
                        <span className="text-gray-700 font-semibold text-lg">
                          PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                        </span>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
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
