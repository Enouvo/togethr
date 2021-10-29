import React from "react";
import { Progress } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const DiscoverItem = ({ project }) => {
  console.log("discorver item ", project);
  return (
    <div className="justify-center">
      <div className="relative discover-image">
        <img
          src={project?.imageURL}
          className="m-0 object-cover w-full h-64 rounded-lg"
          style={{ height: "20rem" }}
        />
        <span className="discover-category-span border-gray-700 border-1 px-2 py-1 text-white bg-purple-1000 font-bold rounded-md">
          {project?.projectCategory}
        </span>
      </div>
      <h2 className="text-xl font-bold">{project?.projectName}</h2>
      <div>
        <span className="text-lg font-bold">{20 + " "}</span>
        <span className="text-lg text-gray-600">FLOW</span>
      </div>
      <Progress percent={50} strokeColor="#00C48C" showInfo={false} />
    </div>
  );
};

export default DiscoverItem;
