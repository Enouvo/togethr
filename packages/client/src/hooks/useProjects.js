import { query, mutate } from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { GET_PROJECTS } from '../flow/projects.script';
import { CREATE_PROJECT } from '../flow/projects.tx';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const createProject = async () => {
    try {
      let response = await mutate({
        cadence: CREATE_PROJECT,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        let response = await query({
          cadence: GET_PROJECTS,
        });
        setProjects(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { createProject, projects };
}
