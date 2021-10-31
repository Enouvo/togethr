import React, { useEffect } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { getNFTs } from '../../flow/flow';

const NFTs = () => {
  useEffect(() => {
    const fetchNFTs = async () => {
      const data = await getNFTs();
      console.log('nfts', data);
    };
    fetchNFTs();
  }, []);
  return (
    <div className="px-48 pt-24 xs:px-6 sm:px-12 md:px-24">
      <div className="flex sm:flex-col md:flex-col lg:flex-row justify-between mb-10">
        <Typography className="text-3xl font-extrabold sm:mt-2 md:mt-2">Explore our Marketplace</Typography>
      </div>
    </div>
  );
};

export default NFTs;
