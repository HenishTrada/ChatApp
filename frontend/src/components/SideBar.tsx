// components/SideBar.tsx
import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import SideBarContent from "./SideBarContent";


interface SideBarProps {
  activeUsers: { roomId: string; username: string }[];  
}

const SideBar: React.FC<SideBarProps> = ({ activeUsers }) => {
  return (
    <>
      {/* Large screens: show active user list inline */}
      <div className="hidden lg:block">
        <SideBarContent activeUsers={activeUsers} />
      </div>

      {/* Small screens: show a "View Users" button that opens a left-side drawer */}
      <div className="block lg:hidden">
        <Sheet>
        <SheetTrigger asChild>
            <div
              className="flex items-center gap-2 text-sm px-3 py-1.5 text-white font-medium rounded-lg bg-[#202020] hover:bg-[#151515] cursor-pointer"
            >
              View Users
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 max-w-sm p-4 bg-[#202020]">
            <SideBarContent activeUsers={activeUsers} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SideBar;
