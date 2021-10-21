import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import PopularProjectItem from "./PopularProjectItem";
import feature from "../../assets/featuring.png";

const listItem = [
  {
    type: "Art",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
    description:
      "16 monsters for use with Old School Essentials. Lots of lore +  ",
  },
  {
    type: "Film",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
    description:
      "16 monsters for use with Old School Essentials. Lots of lore +  ",
  },
  {
    type: "Game",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
    description:
      "16 monsters for use with Old School Essentials. Lots of lore +  ",
  },
  {
    type: "Game",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
    description:
      "16 monsters for use with Old School Essentials. Lots of lore +  ",
  },
];

const PopularProjects = () => {
  return (
    <>
      <div className="px-64 pb-64 pt-24 flex flex-col bg-gray-200 items-center justify-start">
        <h1 className="text-4xl font-bold mb-8">Popular Projects</h1>
        <div className="flex flex-row items-center">
          <Button
            className="flex items-center content-center border-none mr-4"
            style={{ border: "none" }}
            icon={<ArrowLeftOutlined style={{ color: "#A8B0C5" }} />}
            shape="circle"
          />
          <div className="flex flex-row justify-evenly mx-12">
            {listItem.map((item, index) => {
              return <PopularProjectItem {...item} key={index} />;
            })}
          </div>
          <Button
            className="flex items-center content-center"
            icon={<ArrowRightOutlined style={{ color: "#A8B0C5" }} />}
            shape="circle"
          />
        </div>
      </div>
    </>
  );
};

export default PopularProjects;
