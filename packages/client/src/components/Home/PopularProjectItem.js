import React from "react";
import { Progress } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const PopularProjectItem = ({
  image,
  name,
  description,
  price,
  daysRemaining,
}) => {
  const [money, currency] = price.split(" ");

  return (
    <div className="p-4 shadow-2xl mx-4 rounded-lg">
      <img src={image} className="mb-2" />
      <span className="font-bold text-lg">{name}</span>
      <p className="text-gray-700">{description}</p>
      <div>
        <span className="text-lg font-bold">{`${money} `}</span>
        <span className="text-lg text-gray-600">{currency}</span>
      </div>
      <Progress percent={50} strokeColor="#00C48C" showInfo={false} />

      <div className="flex flex-row items-center">
        <ClockCircleOutlined style={{ color: "#5C5C8B" }} />
        <span className="ml-2 text-gray-600">{`${daysRemaining} days remaining`}</span>
      </div>
    </div>
  );
};

export default PopularProjectItem;
