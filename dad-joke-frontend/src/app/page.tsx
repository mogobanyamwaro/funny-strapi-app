"use client";
import ChatWindow from "@/app/components/ChatWindow";
import Sidebar from "@/app/components/Sidebar";
import axiosInstance from "@/app/hooks/axiosInstance";
import { ChatMessage } from "@/app/types";
import { useEffect, useState } from "react";

export default function Home() {
  // The messages array mocks the backend data
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate sending a message and receiving an answer
  const handleSend = async () => {
    if (!currentQuestion.trim() && !currentImage) return;

    // Clear input fields
    setCurrentQuestion("");
    setCurrentImage(null);
    setCurrentAnswer("");
    setLoading(true);
    const response = await axiosInstance.post("/dadi-jokes", {
      data: {
        text: currentQuestion,
      },
    });
    const text = response?.data?.data?.text;
    setMessages([
      {
        id: Date.now(),
        text: text,
        answer: text,
      },
      ...messages,
    ]);
    setLoading(false);
    // Simulate API delay and answer generation
    // setLoading(true);
    const simulatedAnswer = text;
    setTimeout(() => {
      // newMessage.answer = simulatedAnswer;
      // // Update the messages array with the answer
      // setMessages((prev) =>
      //   prev.map((msg) => (msg.id === newMessage.id ? newMessage : msg))
      // );

      // Set the answer for typewriter animation
      setCurrentAnswer(simulatedAnswer);
    }, 1000);
  };
  const fetchAllDadJokes = async () => {
    const res = await axiosInstance.get("/dadi-jokes");
    console.log(res?.data?.data);
    setMessages(res.data?.data);
  };
  useEffect(() => {
    setLoading(true);
    fetchAllDadJokes();
    setLoading(false);
  }, []);
  return (
    <div className="flex h-screen  bg-gray-900 text-white">
      {/* Sidebar with previous questions */}
      <Sidebar messages={messages} />

      {/* Main Chat area */}
      <div className="flex-1 flex flex-col p-4">
        {/* Chat window with typewriter effect */}
        <ChatWindow answer={currentAnswer} loading={loading} />

        {/* Input area */}
        <div className="mt-4  bg-gray-900 text-white">
          <textarea
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Type your type of dad joke you want..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />

          <button
            onClick={handleSend}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
