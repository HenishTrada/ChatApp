// components/SideBarContent.tsx
import React from "react";

interface ActiveUser {
  roomId: string;
  username: string;
}

interface SideBarContentProps {
  activeUsers: ActiveUser[];
}


const SideBarContent: React.FC<SideBarContentProps> = ({ activeUsers }) => {

  return (
    <div className=" w-full flex flex-col mt-2">
      <h2 className="text-white text-lg font-medium mb-2">Active Users</h2>
      
      <ul>
        {activeUsers.map((user, index) => (
          <li
            key={`${user.roomId}-${index}`} // Combine ID and index for uniqueness
            className="text-white p-2 bg-[#3d3d3d] rounded-lg mb-2 text-base"
          >
           <div className="flex flex-col text-base">
           <span>{user.username}</span>
           <p>Room Id :<span className="text-sm text-green-400"> {user.roomId}</span></p>
           </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarContent;
