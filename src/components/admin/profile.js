import React from "react";
import useAuthContext from "../../contexts/authContext";

function Profile() {
  const { user } = useAuthContext();

  return <h1>{user && user.first_name}</h1>;
}

export default Profile;
