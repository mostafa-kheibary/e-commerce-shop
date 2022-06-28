import React from 'react';
import { useUserContext } from '../../context/User/UserContext';

const Profile: React.FC = () => {
  const {
    state: { user },
  } = useUserContext();
  console.log(user);
  return (
    <div>
      <h2>Profile page</h2>
      <h3>{user.phoneNumber}</h3>
    </div>
  );
};

export default Profile;
