import React from 'react';
import { Spin } from 'antd';

const Loading = ({ active }) => {
  if (active) {
    return (
      <div className="loading-container">
        <Spin className="loading-icon" size="large" />
      </div>
    );
  }
  return <div />;
};

export default Loading;
