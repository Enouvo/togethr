import React, { useContext } from "react";
import { Button, Form, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { CreateProjectContext } from "../../pages/create-project";
import banner from "../../assets/create_project_banner.svg";

const SecondPage = () => {
  const { setCurrentPage, setForm } = useContext(CreateProjectContext);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const onSubmit = (values) => {
    setForm((prev) => {
      return {
        ...prev,
        secondPage: values,
      };
    });
    setCurrentPage(3);
  };

  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <div className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
        <Form onFinish={onSubmit}>
          <div className="flex flex-row">
            <div className="flex flex-col my-2 flex-1 mr-3">
              <span className="text-gray-700 mb-2">TOTAL AMOUNT TO RAISE</span>
              <Form.Item name="totalAmountToRaise">
                <input
                  className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold"
                  placeholder="Enter total amount to raise"
                />
              </Form.Item>
            </div>
            <div className="flex flex-col my-2 flex-1 mx-3">
              <span className="text-gray-700 mb-2">FUNGIBLE TOKEN</span>
              <Form.Item name="fungibleToken">
                <Select options={options} />
              </Form.Item>
            </div>
            <div className="flex flex-col my-2 flex-1 ml-3">
              <span className="text-gray-700 mb-2">PRICE PER TOKEN</span>
              <Form.Item name="pricePerToken">
                <input
                  className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold"
                  placeholder="Enter price per token"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col my-2 flex-1">
            <span className="text-gray-700 mb-2">
              PERCENTAGE OF PROFIT CREATOR WILL SHARE WITH THE SUPPORTS
            </span>
            <Form.Item name="percentageOfProfit">
              <input className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold w-full" />
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between items-center mt-8">
            <Button
              type="primary"
              style={{ height: 46, display: "flex" }}
              className="flex-row items-center"
              // onClick={() => setCurrentPage(3)}
              htmlType="submit"
            >
              <span>Next</span>
              <ArrowRightOutlined />
            </Button>
            <div>
              <span className="text-blue-700 font-bold text-xl">2/</span>
              <span className="font-bold text-xl">3</span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SecondPage;
