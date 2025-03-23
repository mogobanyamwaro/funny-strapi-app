// components/Sidebar.tsx
import React from "react";
import { ChatMessage } from "../types";

interface SidebarProps {
  messages: ChatMessage[];
}

const Sidebar: React.FC<SidebarProps> = ({ messages }) => {
  return (
    <div className="w-64 border-r  bg-gray-900 text-white border-gray-300 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Previous Dad Jokes</h2>
      {messages.map((message) => (
        <div
          key={message.id}
          className="mb-2 p-2 border border-gray-200 rounded"
        >
          <p className="text-sm">{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
