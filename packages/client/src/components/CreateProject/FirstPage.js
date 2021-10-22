import React, { useContext } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Selector from "../Selector";
import { CreateProjectContext } from "../../pages/create-project";
import banner from "../../assets/create_project_banner.svg";
import upload from "../../assets/upload.svg";

const FirstPage = () => {
  const { setCurrentPage } = useContext(CreateProjectContext);

  const options = [
    { value: "chocolate" },
    { value: "strawberry" },
    { value: "vanilla" },
  ];

  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <form className="w-2/5 mt-4 mb-10 justify-center flex flex-col m-auto">
        <div className="flex flex-col my-2">
          <span className="text-gray-700 mb-2">PROJECT NAME</span>
          <input
            className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none font-extrabold"
            placeholder="Enter your project name"
          />
        </div>
        <div className="flex flex-col my-2">
          <span className="text-gray-700 mb-1">PROJECT CATEGORY</span>
          <Selector options={options} />
        </div>
        <div className="flex flex-col my-2">
          <span className="text-gray-700 mb-2">DESCRIPTION</span>
          <textarea
            className="border-2 border-gray-300 rounded-lg py-2 px-3 focus:outline-none bg-transparent font-extrabold resize-none"
            placeholder="Enter your project name"
            rows={7}
          />
        </div>
        <div className="flex flex-col my-2">
          <span className="text-gray-700 mb-1">UPLOAD FILE</span>
          <span className="text-gray-700 mb-2">
            Drag or choose your file to upload
          </span>
          <div className="flex flex-col p-40 justify-center text-center items-center bg-gray-100 rounded-lg mt-4">
            <img src={upload} className="mb-2" />
            <span className="text-gray-700 font-semibold text-lg">
              PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <Button
            type="primary"
            style={{ height: 46, display: "flex" }}
            className="flex-row items-center"
            onClick={() => setCurrentPage(2)}
          >
            <span>Next</span>
            <ArrowRightOutlined />
          </Button>
          <div>
            <span className="text-blue-700 font-bold text-lg">1</span>
            <span className="font-bold text-lg">/3</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FirstPage;
