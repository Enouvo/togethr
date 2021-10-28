import { mutate, tx } from '@onflow/fcl';
import { CREATE_PROJECT } from './transactions/projects.tx';

export const createProject = async ({ projectName, ipfsHash, tokenPrice, tokenCount, profitSharePercent }) => {
  try {
    let projectPromise = await mutate({
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
    await tx(projectPromise).onceSealed();
  } catch (err) {
    console.error(err);
  }
};
