import Content from "@/components/Content";
import EditProfile from "@/components/EditProfile";
import React from "react";

function Profile() {
  return (
    <div className="max-w-7xl mx-auto flex">
      <div className="w-[400px] ">
        <EditProfile />
      </div>
      <div className="w-full">
        <Content />
      </div>
    </div>
  );
}

export default Profile;
