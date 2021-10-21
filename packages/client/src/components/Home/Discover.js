import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Typography, Button, Row, Col } from "antd";
import DiscoverItem from "./DiscoverItem";
import feature from "../../assets/featuring.png";

const listItem = [
  {
    type: "Art",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Film",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Game",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Game",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Art",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Film",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Tech",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
  {
    type: "Film",
    image: feature,
    name: "Amazing digital art",
    price: "1000 FUSD",
    progress: 50,
    daysRemaining: "60",
  },
];

const Discover = ({ items }) => {
  const categories = [...new Set(items?.map((item) => item?.type))];
  const [type, setType] = useState("All items");

  return (
    <div className="p-40">
      <div className="flex flex-row justify-between mb-10">
        <Typography className="text-4xl font-extrabold">Discover</Typography>
        <div className="flex items-center">
          <Button
            type={type === "All items" && "primary"}
            className="mx-2"
            onClick={() => setType("All items")}
          >
            All items
          </Button>
          {categories.map((item) => {
            return (
              <Button
                type={type === item && "primary"}
                className="mx-2"
                onClick={() => setType(item)}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>

      <Row gutter={[100, 100]}>
        {listItem.map((item) => {
          if (item.type === type || type === "All items") {
            return (
              <Col span={6}>
                <DiscoverItem items={item} />
              </Col>
            );
          }
        })}
      </Row>
    </div>
  );
};

Discover.propTypes = {
  items: PropTypes.array,
};

Discover.defaultProps = {
  items: listItem,
};

export default Discover;
