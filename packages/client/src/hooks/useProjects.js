import { query } from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { GET_PROJECTS } from '../flow/scripts/projects.script';

export default function useProjects() {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        let response = await query({
          cadence: GET_PROJECTS,
        });
        setProjects(response);
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
