import React from "react";
import { Avatar, Progress, Button } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import banner from "../../assets/home_content_banner.svg";
import featuring from "../../assets/featuring.png";
import creator from "../../assets/dappstarter.png";

const HomeFeaturingContent = () => {
  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <div className="flex flex-row justify-around p-32">
        <img src={featuring} className="object-fit rounded-lg w-2/5" />
        <div className="flex flex-col max-w-md">
          <h1 className="font-extrabold text-5xl">Marco Art</h1>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row align-center items-center mr-12">
              <Avatar src={creator} size={40} />
              <div className="ml-5 flex flex-col">
                <span className="text-lg text-gray-600">Creator</span>
                <span className="text-base">Enrico Cole</span>
              </div>
            </div>
            <div className="flex flex-row align-center items-center">
              <Avatar src={creator} size={40} />
              <div className="ml-5 flex flex-col">
                <span className="text-lg text-gray-600">Instant price</span>
                <span className="text-base">3.5 ETH</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border-gray-500 border-2 p-8 mt-8 flex-wrap max-w-md">
            <p className="text-xl mb-0">
              <span className="font-bold mr-2">1000</span> 
              <span className="text-gray-1000">FUSD</span>
            </p>
            <Progress percent={50} strokeColor="#00C48C" showInfo={false} />
            <p className="text-gray-1000 text-base">
              The National Endowment for the Arts is committed to diversity,
              equity, inclusion, and fostering mutual respect for the diverse
              beliefs and values of all individuals and groups.The Arts
              Endowment encourages projects ...
            </p>
          </div>
          <div className="flex flex-row justify-between content-center mt-8">
            <div className="flex justify-start flex-col items-center w-24">
              <h1 className="font-extrabold text-2xl mb-0">19</h1>
              <span className="text-xl text-center text-gray-700">
                Days left
              </span>
            </div>
            <div className="flex justify-start flex-col items-center w-24">
              <h1 className="font-extrabold text-2xl mb-0">24</h1>
              <span className="text-xl text-center text-gray-700">Backer</span>
            </div>
            <div className="flex justify-start flex-col items-center w-24">
              <h1 className="font-extrabold text-2xl mb-0">10%</h1>
              <span className="text-xl text-center text-gray-700">
                Profit of supporter
              </span>
            </div>
          </div>
          <div className="flex flex-col my-10">
            <Button className="my-4" type="primary" style={{ height: "46px" }}>
              Back it
            </Button>
            <Button className="mb-4" style={{ height: "46px" }}>
              Remind me
            </Button>
          </div>
          <div>
            <Button
              className="flex items-center content-center border-none mr-4"
              style={{ border: "none" }}
              icon={<ArrowLeftOutlined style={{ color: "#A8B0C5" }} />}
              shape="circle"
            />
            <Button
              className="flex items-center content-center"
              icon={<ArrowRightOutlined style={{ color: "#A8B0C5" }} />}
              shape="circle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeaturingContent;
