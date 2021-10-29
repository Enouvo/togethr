import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="loading-container">
      <Spin className="loading-icon" size="large" />
    </div>
  );
};

export default Loading;
