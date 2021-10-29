import { mutate, tx, query } from '@onflow/fcl';
import { GET_FUNDERS, GET_REMAINNING_TOKEN_COUNT } from './scripts/projects.script';
import { CREATE_PROJECT, FUND_PROJECT } from './transactions/projects.tx';

export const createProject = async ({ tokenName, ipfsHash, tokenPrice, tokenCount, profitSharePercent }) => {
  let createProjectPromise = await mutate({
    cadence: CREATE_PROJECT,
    limit: 100,
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
    limit: 55,
    args: (arg, t) => [arg(projectId, t.UInt32), arg(funder, t.Address), arg(tokenCount, t.UInt32)],
  });
  return tx(fundProjectPromise).onceSealed();
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
