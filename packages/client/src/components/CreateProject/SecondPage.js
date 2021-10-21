import React, { useContext } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { CreateProjectContext } from "../../pages/create-project";
import banner from "../../assets/create_project_banner.svg";

const SecondPage = () => {
  const { setCurrentPage } = useContext(CreateProjectContext);
  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <form className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
        <div className="flex flex-row">
          <div className="flex flex-col my-2 flex-1 mr-3">
            <span className="text-gray-700 mb-2">TOTAL AMOUNT TO RAISE</span>
            <input
              className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold"
              placeholder="Enter your project name"
            />
          </div>
          <div className="flex flex-col my-2 flex-1 mx-3">
            <span className="text-gray-700 mb-2">FUNGIBLE TOKEN</span>
            <select
              className="border-2 border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none bg-transparent font-extrabold"
              placeholder="Choose type of your project"
            >
              <option value="test1">Test1</option>
              <option value="test2">Test2</option>
              <option value="test3">Test3</option>
              <option value="test4">Test4</option>
            </select>
          </div>
          <div className="flex flex-col my-2 flex-1 ml-3">
            <span className="text-gray-700 mb-2">PRICE PER TOKEN</span>
            <input
              className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold"
              placeholder="Enter your project name"
            />
          </div>
        </div>
        <div className="flex flex-col my-2 flex-1">
          <span className="text-gray-700 mb-2">
            PERCENTAGE OF PROFIT CREATOR WILL SHARE WITH THE SUPPORTS
          </span>
          <input className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold" />
        </div>
        <div className="flex flex-row justify-between items-center mt-8">
          <Button
            type="primary"
            style={{ height: 46, display: "flex" }}
            className="flex-row items-center"
            onClick={() => setCurrentPage(3)}
          >
            <span>Next</span>
            <ArrowRightOutlined />
          </Button>
          <div>
            <span className="text-blue-700 font-bold text-xl">2/</span>
            <span className="font-bold text-xl">3</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecondPage;
