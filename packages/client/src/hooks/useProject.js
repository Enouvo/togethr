import { query } from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { GET_PROJECT, GET_PROJECTS } from '../flow/scripts/projects.script';
import { getIpfs } from '../utils/ipfs';
import axios from 'axios';

export default function useProject(projectId) {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await query({
          cadence: GET_PROJECT,
          args: (arg, t) => [arg(projectId, t.UInt32)],
        });
        const res = await axios.get(getIpfs(response?.ipfsHash));
        setProject({
          projectId: projectId,
          ...response,
          ...res?.data,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  return { project, loading };
}
