import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="flex flex-row justify-between border-b-2 px-40 py-5">
      <Link to="/">
        <img src={logo} />
      </Link>
      <div className="flex flex-row">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          className="mr-5"
        />
        <Link to="/create-project">
          <Button type="primary" className="h-full">
            Start a project
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
