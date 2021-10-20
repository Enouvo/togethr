import React from "react";
import brands from "../../assets/brands.png";
import brand2 from "../../assets/brand2.png";
import brand3 from "../../assets/brand3.png";
import brand4 from "../../assets/brand4.png";

const ProjectDetailsMainContent = () => {
  return (
    <div className="p-40">
      <img src={brands} />
      <p className="max-w-md text-lg text-gray-700">
        If green energy is your thing, SuperBase Pro 2000 can handle solar
        arrays of any size up to 1,800W. Our patented PVMax tech means your
        solar setup can charge SuperBase Pro 2000 with the same superfast
        performance you'd get from conventional charging. That's one hour for an
        80% charge, and two hours for a full charge.
      </p>
      <img src={brand2} />
      <p className="max-w-md text-lg text-gray-700">
        If green energy is your thing, SuperBase Pro 2000 can handle solar
        arrays of any size up to 1,800W. Our patented PVMax tech means your
        solar setup can charge SuperBase Pro 2000 with the same superfast
        performance you'd get from conventional charging. That's one hour for an
        80% charge, and two hours for a full charge.
      </p>
      <img src={brand3} />
      <p className="max-w-md text-lg text-gray-700">
        If green energy is your thing, SuperBase Pro 2000 can handle solar
        arrays of any size up to 1,800W. Our patented PVMax tech means your
        solar setup can charge SuperBase Pro 2000 with the same superfast
        performance you'd get from conventional charging. That's one hour for an
        80% charge, and two hours for a full charge.
      </p>
      <img src={brand4} />
    </div>
  );
};

export default ProjectDetailsMainContent;
