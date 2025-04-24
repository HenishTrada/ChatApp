// components/SideBarContent.tsx
import React, {useState, useMemo} from "react";
import { HiOutlineSearch } from "react-icons/hi";



interface SideBarContentProps {
  activeUsers: { roomId: string; username: string }[];
}


const SideBarContent: React.FC<SideBarContentProps> = ({ activeUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return activeUsers;
    return activeUsers.filter((user) => {
      const nameMatch = user.username.toLowerCase().includes(query);
      const roomMatch = user.roomId
        ? user.roomId.toLowerCase().includes(query)
        : false;
      return nameMatch || roomMatch;
    });
  }, [searchQuery, activeUsers]);

  return (
    <div className=" w-full flex flex-col mt-2">
      <div className="relative my-2 text-sm">
        <input
          type="text"
          placeholder="Search User"
          className="bg-[#3d3d3d] p-2 pl-8 rounded-lg w-full text-white focus:outline-none focus:bg-[#202020] border-b border-[#1daa61]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <HiOutlineSearch className="absolute left-3 top-3 text-white" />
      </div>
      <h2 className="text-white text-lg font-medium mb-2">Active Users</h2>

      {filteredUsers.length === 0 ? (
        <p className="text-red-400 p-2 bg-[#3d3d3d] rounded-lg mb-2 text-base">No users found.</p>
      ) : (
        <ul className="overflow-y-auto hide-scrollbar max-h-[530px]">
          {filteredUsers.map((user, index) => (
            <li
              key={`${user.roomId}-${index}`} // Combine ID and index for uniqueness
              className="text-white p-2 bg-[#3d3d3d] rounded-lg mb-2 text-base"
            >
              <div className="flex flex-col text-base">
                <span>{user.username}</span>
                <p>
                  Room Id :
                  <span className="text-sm text-green-400">
                    {user.roomId ?? "Unknown"}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideBarContent;
