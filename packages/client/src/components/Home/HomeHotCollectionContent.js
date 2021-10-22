import React from "react";
import featuring from "../../assets/featuring.png";

const HomeHotCollectionContent = () => {
  const listContent = [
    {
      mainPicture: featuring,
      subPictures: [featuring, featuring, featuring],
      name: "Crypto Legend - Profess",
      label: "Indiegogo Team Favorites",
      items: 28,
    },
    {
      mainPicture: featuring,
      subPictures: [featuring, featuring, featuring],
      name: "Crypto Legend - Profess",
      label: "Indiegogo Team Favorites",
      items: 28,
    },
    {
      mainPicture: featuring,
      subPictures: [featuring, featuring, featuring],
      name: "Crypto Legend - Profess",
      label: "Indiegogo Team Favorites",
      items: 28,
    },
  ];

  return (
    <div className="p-40">
      <h1 className="text-center font-bold text-4xl mb-8">Hot Collections</h1>
      <div className="flex flex-row justify-center px-40">
        {listContent.map(({ mainPicture, subPictures, name, label, items }) => {
          return (
            <div className="flex flex-col mr-8">
              <img src={mainPicture} className="h-64 object-cover rounded-lg" />
              <div className="flex flex-row justify-between w-full mt-2">
                {subPictures.map((image, index) => {
                  return (
                    <img
                      src={image}
                      className={`h-20 object-cover rounded-lg flex-1 ${
                        index === 1 && "mx-2"
                      }`}
                    />
                  );
                })}
              </div>
              <div>
                <h1 className="font-bold text-3xl break-all">{name}</h1>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-xl">{label}</h2>
                  <span className="border-2 p-1">{`${items} ITEMS`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeHotCollectionContent;
