import { mutate, tx, query } from '@onflow/fcl';
import { GET_NFTS, GET_NFTS_FOR_SALE } from './scripts/nfts.script';
import {
  GET_FUNDERS,
  GET_LISTINGS,
  GET_PROJECTS_BY_ADDRESS,
  GET_REMAINNING_TOKEN_COUNT,
} from './scripts/projects.script';
import { LIST_NFT } from './transactions/nfts.tx';
import { CREATE_PROJECT, FUND_PROJECT, MINT_PROJECT } from './transactions/projects.tx';

export const createProject = async ({ tokenName, ipfsHash, tokenPrice, tokenCount, profitSharePercent }) => {
  let createProjectPromise = await mutate({
    cadence: CREATE_PROJECT,
    limit: 250,
    args: (arg, t) => [
      arg(tokenName, t.String),
      arg(ipfsHash, t.String),
      arg(tokenPrice, t.UFix64),
      arg(tokenCount, t.UInt32),
      arg(profitSharePercent, t.UInt32),
    ],
  });
  return tx(createProjectPromise).onceSealed();
};

export const fundProject = async ({ projectId, funder, tokenCount }) => {
  let fundProjectPromise = await mutate({
    cadence: FUND_PROJECT,
    limit: 250,
    args: (arg, t) => [arg(projectId, t.UInt32), arg(funder, t.Address), arg(tokenCount, t.UInt32)],
  });
  return tx(fundProjectPromise).onceSealed();
};

export const mintProject = async ({ projectId, ipfsHash, price }) => {
  console.log('mintProject', projectId, ipfsHash);
  let mintProjectPromise = await mutate({
    cadence: MINT_PROJECT,
    limit: 250,
    args: (arg, t) => [arg(projectId, t.UInt32), arg(ipfsHash, t.String), arg(price, t.UFix64)],
  });
  return tx(mintProjectPromise).onceSealed();
};

export const getRemainingTokenCount = (projectId) =>
  query({
    cadence: GET_REMAINNING_TOKEN_COUNT,
    args: (arg, t) => [arg(projectId, t.UInt32)],
  });

export const getFunders = (projectId) =>
  query({
    cadence: GET_FUNDERS,
    args: (arg, t) => [arg(projectId, t.UInt32)],
  });

export const getNFTs = (address) =>
  query({
    cadence: GET_NFTS,
    args: (arg, t) => [arg(address, t.Address)],
  });

export const getNFTsForSale = () =>
  query({
    cadence: GET_NFTS_FOR_SALE,
  });

export const getProjectsByAddress = (address) =>
  query({
    cadence: GET_PROJECTS_BY_ADDRESS,
    args: (arg, t) => [arg(address, t.Address)],
  });

export const listNFT = async ({ nftID, price }) => {
  console.log({ nftID, price });
  let mintProjectPromise = await mutate({
    cadence: LIST_NFT,
    limit: 250,
    args: (arg, t) => [arg(nftID, t.UInt64), arg(price, t.UFix64)],
  });
  return tx(mintProjectPromise).onceSealed();
};

export const getListings = () =>
  query({
    cadence: GET_LISTINGS,
  });
