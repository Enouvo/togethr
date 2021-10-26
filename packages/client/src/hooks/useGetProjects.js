import { query } from '@onflow/fcl';
import { useState } from 'react';

export default function useGetProjects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    setProjects([]);
  };

  return {
    projects,
  };
}
