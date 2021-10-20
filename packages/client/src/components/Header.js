import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="flex flex-row justify-between border-b-2 px-40 py-5">
      <img src={logo} />
      <div className="flex flex-row">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          className="mr-5"
        />
        <Button type="primary" className="h-full">
          Start a project
        </Button>
      </div>
    </div>
  );
};

export default Header;
