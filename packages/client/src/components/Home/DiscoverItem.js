import React from "react";
import { Progress } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const DiscoverItem = ({ items: { image, name, price, daysRemaining } }) => {
  const [money, currency] = price.split(" ");
  return (
    <div className="justify-center">
      <img src={image} className="m-0 object-cover" />
      <h2 className="text-xl font-bold">{name}</h2>
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

export default DiscoverItem;
