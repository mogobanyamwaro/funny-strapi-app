/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

export default function MemeGenerator() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const memeRef = useRef<HTMLDivElement | null>(null);

  // Handle image upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Generate meme
  const generateMeme = async () => {
    if (!preview || !memeRef.current) return;

    const canvas = await html2canvas(memeRef.current);
    const memeImage = canvas.toDataURL("image/png");

    // Convert Data URL to Blob
    const blob = await (await fetch(memeImage)).blob();

    // Upload Meme to Strapi
    const formData = new FormData();
    formData.append("files", blob, "meme.png");

    try {
      const uploadRes = await axios.post(
        "http://localhost:1337/api/upload",
        formData
      );
      const uploadedFile = uploadRes.data[0];

      // Save Meme Data
      await axios.post("http://localhost:1337/api/memes", {
        data: {
          image: uploadedFile.url,
          topText,
          bottomText,
        },
      });

      alert("Meme saved successfully!");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Meme Generator</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 text-white"
      />

      {preview && (
        <div
          ref={memeRef}
          className="relative w-80 h-80 border-2 border-gray-600 bg-gray-800"
        >
          <img
            src={preview}
            alt="Meme"
            className="w-full h-full object-cover"
          />
          <p className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 text-lg font-bold">
            {topText}
          </p>
          <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 text-lg font-bold">
            {bottomText}
          </p>
        </div>
      )}

      <input
        type="text"
        placeholder="Top Text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        className="mt-4 p-2 border border-gray-600 bg-gray-800 text-white w-64"
      />
      <input
        type="text"
        placeholder="Bottom Text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        className="mt-2 p-2 border border-gray-600 bg-gray-800 text-white w-64"
      />

      <button
        onClick={generateMeme}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Generate Meme
      </button>
    </div>
  );
}
