import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <h1>Profile</h1>
      {user && <p>hello {user.first_name}</p>}
    </>
  );
}

export default Profile;
