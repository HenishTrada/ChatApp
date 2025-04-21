import { useEffect, useRef, useState } from "react";

interface Message {
  msg: string;
  sender: string;
  roomId : string
}

interface ChatBoxProps {
  messages: { msg: string; sender: string }[];
  username: string;
  roomId: string; // Added roomId property
}
const ChatBox: React.FC<ChatBoxProps> = ({ messages, username}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever messages update
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto lg:rounded-tr-lg hide-scrollbar space-y-2 bg-cover bg-center border-t-2 border-r-2 border-[#5f5e5e]">

      <div
        className="fixed inset-0 bg-accent-foreground bg-center opacity-15 "
        style={{ backgroundImage: "url('/image.png')" }}
      ></div>

      <div className="relative flex flex-col">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-2 mx-4 my-2 max-w-xs ${message.sender === username ? "bg-[#005c4b] self-end" : "bg-[#363636] self-start"
            } text-white rounded-lg`}
        >
          {message.msg}  {/* Fix: Extract msg */}
        </div>
      ))}

      <div ref={messagesEndRef} />
      </div>
    </div>


  );
};

export default ChatBox;
