import React, { useEffect } from 'react';
import { getProjectsByAddress } from '../flow/flow';
import { useUserContext } from '../providers/UserProvider';

const MyProjectsPage = () => {
  const { user } = useUserContext();

  useEffect(() => {
    const fetchProjectsByAdress = async () => {
      const data = await getProjectsByAddress(user.addr);
      console.log(data);
    };
    fetchProjectsByAdress();
  }, []);

  return <>Hello</>;
};

export default MyProjectsPage;
