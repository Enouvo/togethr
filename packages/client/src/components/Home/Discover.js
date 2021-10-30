import { Button, Col, Row, Typography } from "antd";
import React, { useState } from "react";
import useProjects from "../../hooks/useProjects";
import { categories } from "../../utils/tootls";
import DiscoverItem from "./DiscoverItem";

const Discover = ({ items }) => {
  const { projects } = useProjects();
  const [type, setType] = useState("All items");

  return (
    <div className="px-48 py-24 xs:p-6 sm:p-12 md:p-24">
      <div className="flex sm:flex-col md:flex-col lg:flex-row justify-between mb-10">
        <Typography className="text-4xl font-extrabold sm:mt-2 md:mt-2">
          Discover
        </Typography>
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
                type={type === item.value && "primary"}
                className="mx-2"
                onClick={() => setType(item.value)}
              >
                {item.value}
              </Button>
            );
          })}
        </div>
      </div>

      <Row gutter={[60, 80]}>
        {projects?.map((item) => {
          if (item?.projectCategory === type || type === "All items") {
            return (
              <Col xm={24} md={12} lg={12} xl={6} key={item.projectId} flex={1}>
                <DiscoverItem project={item} />
              </Col>
            );
          }
        })}
      </Row>
    </div>
  );
};

export default Discover;
