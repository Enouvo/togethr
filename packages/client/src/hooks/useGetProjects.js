import { query } from '@onflow/fcl';
import { useState } from 'react';
import { LIST_DAPPIES_IN_PACK } from '../../../dapplib/interactions/scripts/togethrprojects/get_projects.cdc';

export default function useGetProjects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    let res = await query({
      cadence: LIST_DAPPIES_IN_PACK,
      args: (arg, t) => [arg(packID, t.UInt32)],
    });
    return res;
  };

  return {
    fetchProjects,
  };
}
