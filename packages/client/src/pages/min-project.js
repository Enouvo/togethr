import React, { createContext, useEffect, useState } from 'react';
import FirstPage from '../components/CreateProject/FirstPage';
import { useParams } from 'react-router-dom';
import useProject from '../hooks/useProject';
import { Form, Input, Upload, Button, Row, Col, notification, Spin, Image } from 'antd';
import upload from '../assets/upload.svg';
import { getIpfs, ipfs } from '../utils/ipfs';
import Loading from '../components/Loading';
import { mintProject } from '../flow/flow';
import { showError } from '../utils/tootls';

const MintProject = () => {
  const { id: projectId } = useParams();
  const { project, loading } = useProject(Number(projectId));
  const [mintLoading, setMintLoading] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [form] = Form.useForm();

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

  useEffect(() => {
    form?.setFieldsValue({
      name: project.name,
      description: project.projectDescription,
    });
  }, [project]);

  const onSubmit = async (values) => {
    setMintLoading(true);
    try {
      const dataObject = await ipfs.add(
        JSON.stringify({
          projectName: project.projectName,
          name: values.name,
          imageURL: values.projectImage,
          externalLink: values.externalLink,
          imageURL: imagePath,
          price: values.price,
          description: values.description,
        })
      );
      await mintProject({
        projectId: Number(project.projectId),
        ipfsHash: dataObject.path,
      });
      notification.success({ message: 'Mint project success!' });
    } catch (error) {
      console.error(error);
      showError(error);
    } finally {
      setMintLoading(false);
    }
  };
  return (
    <>
      <Loading active={mintLoading} />
      <div className="flex flex-col justify-center items-center">
        <div className="w-4/5 my-8">
          <Form onFinish={onSubmit} layout="vertical" form={form}>
            <Row gutter={[30, 30]}>
              <Col xs={12}>
                <Form.Item
                  name="name"
                  label="NAME"
                  rules={[{ required: true, message: 'Please input your token name' }]}
                >
                  <Input className="form-input" placeholder="(e.g. ENOUVO)" />
                </Form.Item>
                <Form.Item
                  name="externalLink"
                  label="EXTERNAL LINK"
                  rules={[{ required: true, message: 'Please input your external link' }]}
                >
                  <Input className="form-input" placeholder="(e.g. https://enouvo.com/)" />
                </Form.Item>
                <Form.Item name="description" label="DESCRIPTION">
                  <textarea
                    className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none bg-transparent font-extrabold resize-none w-full"
                    placeholder="Enter your project name"
                    rows={8}
                  />
                </Form.Item>
                <Button type="primary" block size="large" className="mt-20" htmlType="submit">
                  Submit
                </Button>
              </Col>
              <Col xs={12}>
                <Form.Item
                  name="price"
                  label="PRICE"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your price',
                    },
                    {
                      pattern: /[.]{1}/,
                      message: 'Please enter with the right format',
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="form-input"
                    step="any"
                    placeholder="(e.g. 10.00)"
                    suffix="FLOW"
                    style={{ fontWeight: 'bold' }}
                    min={0}
                  />
                </Form.Item>
                {(() => {
                  if (imageLoading) return <Spin />;
                  return (
                    <Form.Item
                      name="image"
                      label="UPLOAD FILE"
                      rules={[
                        {
                          required: true,
                          message: 'Please upload your project picture',
                        },
                      ]}
                    >
                      <div
                        className={`flex flex-col ${
                          !imagePath && 'p-40'
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
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MintProject;
