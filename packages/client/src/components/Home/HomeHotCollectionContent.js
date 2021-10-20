import React from "react";
import { Button } from "antd";
import featuring from "../../assets/featuring.png";

const HomeHotCollectionContent = () => {
  return (
    <>
      <h1 className="text-center font-bold text-4xl">Hot Collections</h1>
      <div className="flex flex-row justify-center px-40 py-32">
        <div className="flex flex-col mr-8">
          <img
            src={featuring}
            width={352}
            className="h-64 object-cover rounded-lg"
          />
          <div className="flex flex-row mt-2">
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover rounded-lg"
            />
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover mx-2 rounded-lg"
            />
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="font-bold text-3xl">Crypto Legend - Profess</h1>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-xl">Indiegogo Team Favorites</h2>
              <span className="border-2 p-1">28 ITEMS</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-8">
          <img
            src={featuring}
            width={352}
            className="h-64 object-cover rounded-lg"
          />
          <div className="flex flex-row mt-2">
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover rounded-lg"
            />
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover mx-2 rounded-lg"
            />
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="font-bold text-3xl">Crypto Legend - Profess</h1>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-xl">Indiegogo Team Favorites</h2>
              <span className="border-2 p-1">28 ITEMS</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-8">
          <img
            src={featuring}
            width={352}
            className="h-64 object-cover rounded-lg"
          />
          <div className="flex flex-row mt-2">
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover rounded-lg"
            />
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover mx-2 rounded-lg"
            />
            <img
              src={featuring}
              width={112}
              className="h-20 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="font-bold text-3xl">Crypto Legend - Profess</h1>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-xl">Indiegogo Team Favorites</h2>
              <span className="border-2 p-1">28 ITEMS</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHotCollectionContent;
