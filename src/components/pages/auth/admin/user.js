import React, { useEffect } from "react";
import useAuthContext from "../../../../contexts/authContext";

function User() {
  const { user } = useAuthContext();

  return <h1>{user && user.name}</h1>;
}

export default User;
