import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import Card from "../card";
import { AiOutlineUser } from "react-icons/ai";

function Profile() {
  useEffect(()=>{
    document.title = "Admin - Profile"
      },[])

  const user = useSelector((state) => state.user);
  return (
    <Card title="Profile" icon={AiOutlineUser}>
      {user && <p>hello {user.first_name}</p>}
    </Card>
  );
}

export default Profile;
