import { query } from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { GET_PROJECT, GET_PROJECTS } from '../flow/scripts/projects.script';
import { getIpfs } from '../utils/ipfs';
import axios from 'axios';

export default function useProjects(projectId) {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        let response = await query({
          cadence: GET_PROJECT,
          args: (arg, t) => [arg(projectId, t.UInt32)],
        });
        const res = await Promise.all(Object.values(response).map((project) => axios.get(getIpfs(project?.ipfsHash))));
        const projects = Object.keys(response).map((key, index) => ({
          projectId: key,
          ...response[key],
          ...res[index]?.data,
        }));
        setProjects(projects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { projects, loading };
}
