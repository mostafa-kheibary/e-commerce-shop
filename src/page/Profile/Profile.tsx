import React from 'react';
import { useUserContext } from '../../context/User/UserContext';

const Profile: React.FC = () => {
  const { state } = useUserContext();
  console.log(state);
  return <div>{state.user.name}</div>;
};

export default Profile;
