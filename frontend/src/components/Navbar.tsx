import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import SideBar from './SideBar';

interface NavbarProps {
  username: string;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  activeUsers: { roomId: string; username: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ username, setUsername, setRoomId, activeUsers }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<RoomActionData>();

  // Handle room join/create – only update state here
  interface RoomActionData {
    username: string;
    roomId: string;
  }

  const handleRoomAction = (data: RoomActionData) => {
    const { username, roomId } = data;
    setUsername(username);
    setRoomId(roomId);
    setOpen(false);
    // Note: Do not send the join message here!
  };

  // Generate a new Room ID
  const createNewRoom = () => {
    const newRoomId = uuidv4();
    setValue("roomId", newRoomId);
  };

  return (
    <div className="border-b border-[#222222]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-white font-medium text-sm">
          Logged in as: <span className="text-green-400">{username}</span>
        </div>
        {/* Sidebar toggle for smaller screens */}
        <div className="block lg:hidden">
          <SideBar activeUsers={activeUsers} />
        </div>
      </div>
      <div className='flex items-center justify-between text-base w-full mb-2'>
        <h4 className="text-lg font-medium text-white">Chats</h4>
        {/* Open Dialog */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 text-white font-medium rounded-lg bg-[#202020] hover:bg-[#151515]"
        >
          <IoIosAddCircle className="text-base" />
          <span className="hidden sm:inline">Join Room</span>
        </button>

        {/* Room Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='bg-[#1c1c1c] border-none'>
            <DialogHeader>
              <DialogTitle className='bg-gradient-to-r from-green-400 via-slack-200 to-green-500 text-transparent bg-clip-text'>Create or Join a Room</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleRoomAction)} className="flex flex-col space-y-4">
              <input
                {...register("username", { required: true })}
                placeholder="Enter your username"
                className="p-2 w-full text-white bg-[#3d3d3d] rounded focus:outline-none focus:ring-1 focus:ring-green-700"
              />

              <div className="flex">
                <input
                  {...register("roomId", { required: true })}
                  placeholder="Enter Room ID"
                  className="p-2 flex-grow text-white bg-[#3d3d3d] rounded focus:outline-none focus:ring-1 focus:ring-green-700"
                />
                <button type="button" onClick={createNewRoom} className="ml-2 bg-green-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-300">
                  New
                </button>
              </div>
              <DialogFooter>
                <button type="submit" className="bg-gradient-to-r from-green-700 via-slack-400 to-green-700 text-white px-4 py-2 rounded w-full">
                  Enter
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
