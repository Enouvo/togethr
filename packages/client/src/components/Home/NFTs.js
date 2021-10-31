import React, { useEffect } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { getNFTs, getNFTsForSale, getListings } from '../../flow/flow';
import { getIpfs } from '../../utils/ipfs';
import axios from 'axios';
import { Row, Button, Col } from 'antd';

const NFTs = () => {
  const [nfts, setNfts] = React.useState([]);
  useEffect(() => {
    const fetchNFTs = async () => {
      const ipfsHashes = await getNFTsForSale();
      const ipfsNftRes = await Promise.all(Object.values(ipfsHashes).map((ipfs) => axios.get(getIpfs(ipfs))));
      const data = await getListings();
      setNfts(ipfsNftRes.map((ipfs) => ipfs.data));
    };
    fetchNFTs();
  }, []);
  return (
    <div className="px-48 my-10 xs:px-6 sm:px-12 md:px-24">
      <div className="flex sm:flex-col md:flex-col lg:flex-row justify-between mb-10">
        <Typography className="text-3xl font-extrabold sm:mt-2 md:mt-2">Explore our Marketplace</Typography>
      </div>
      <Row gutter={[60, 80]}>
        {nfts?.map((item) => {
          return (
            <Col xm={24} md={12} lg={12} xl={6} key={item.imageURL} flex={1}>
              <div className="justify-center">
                <div className="relative discover-image">
                  <img
                    src={item?.imageURL}
                    className="m-0 object-cover w-full h-64 rounded-lg"
                    style={{ height: '20rem' }}
                  />
                </div>
                <h2 className="text-base font-bold mt-1">{`${item?.projectName} (${item?.name})`}</h2>
                <div className="flex justify-between">
                  <p>
                    <span className="text-lg font-bold">{Number(item?.price ?? 0).toFixed(2) + ' '} </span>
                    <span className="text-lg text-gray-600">FLOW</span>
                  </p>
                  <Button> Buy </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default NFTs;
