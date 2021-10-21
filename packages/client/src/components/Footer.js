import React from "react";
import logo from "../assets/logo_footer.svg";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Input, Divider } from "antd";

const Footer = () => {
  return (
    <div className="bg-gray-800 h-auto flex flex-col p-8">
      <div className="flex flex-row justify-around">
        <div>
          <img src={logo} />
          <button className="text-gray-300 text-lg font-bold">
            The New Creative Economy.
          </button>
        </div>
        <div className="mb-5">
          <h2 className="text-gray-300 text-lg font-bold">Candies Crypto</h2>
          <div className="flex flex-col items-start">
            <button className="text-gray-300 focus:outline-none mb-3">
              Discover
            </button>
            <button className="text-gray-300 focus:outline-none mb-3">
              Connect wallet
            </button>
            <button className="text-gray-300 focus:outline-none mb-3">
              Create item
            </button>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="text-gray-300 text-lg font-bold">Info</h2>
          <div className="flex flex-col items-start">
            <button className="text-gray-300 focus:outline-none mb-3">
              Download
            </button>
            <button className="text-gray-300 focus:outline-none mb-3">
              Demos
            </button>
            <button className="text-gray-300 focus:outline-none mb-3">
              Support
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-gray-300 text-lg font-bold">Join Newsletter</h2>
          <button className="text-gray-300 mb-2">
            Subscribe our newsletter to get more free design course and resource
          </button>
          <Input
            className="footer-input"
            placeholder="Enter your email"
            suffix={
              <button className="rounded-full bg-blue-700 w-8 h-8 flex items-center justify-center">
                <ArrowRightOutlined style={{ color: "#FCFCFD" }} />
              </button>
            }
          />
        </div>
      </div>
      <Divider className="bg-gray-700" />
      <div className="flex flex-row justify-between">
        <span className="text-gray-500 text-sm">
          Copyright &copy; . All rights reserved
        </span>
        <div className="flex flex-row">
          <span className="text-white text-sm">
            We use cookie for better service.
          </span>
          <button className="text-blue text-blue-500 font-bold ml-5 focus:outline-none">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
export default Footer;
