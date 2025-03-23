// components/ChatWindow.tsx
import React, { useState, useEffect } from "react";

interface ChatWindowProps {
  answer: string;
  loading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ answer, loading }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    if (answer) {
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + answer.charAt(index));
        index++;
        if (index >= answer.length) {
          clearInterval(timer);
        }
      }, 50); // adjust speed as needed
      return () => clearInterval(timer);
    }
  }, [answer]);

  return (
    <div className="flex-1 p-4 border  bg-gray-900 text-white border-gray-300 rounded overflow-y-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <p className="whitespace-pre-wrap">{displayedText}</p>
      )}
    </div>
  );
};

export default ChatWindow;
