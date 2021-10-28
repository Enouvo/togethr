import { mutate, tx } from '@onflow/fcl';
import { CREATE_PROJECT, FUND_PROJECT } from './transactions/projects.tx';

export const createProject = async ({ projectName, ipfsHash, tokenPrice, tokenCount, profitSharePercent }) => {
  try {
    let createProjectPromise = await mutate({
      cadence: CREATE_PROJECT,
      limit: 55,
      args: (arg, t) => [
        arg(projectName, t.String),
        arg(ipfsHash, t.String),
        arg(tokenPrice, t.UFix64),
        arg(tokenCount, t.UInt32),
        arg(profitSharePercent, t.UInt32),
      ],
    });
    await tx(createProjectPromise).onceSealed();
  } catch (err) {
    console.error(err);
  }
};

export const fundProject = async ({ projectId, funder, tokenCount }) => {
  try {
    let fundProjectPromise = await mutate({
      cadence: FUND_PROJECT,
      limit: 55,
      args: (arg, t) => [arg(projectId, t.UInt32), arg(funder, t.Address), arg(tokenCount, t.UInt32)],
    });
    await tx(fundProjectPromise).onceSealed();
  } catch (err) {
    console.error(err);
  }
};
