"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="text-white hover:text-gray-300">
            Chat
          </Link>
        </li>
        <li>
          <Link
            href="/meme-generator"
            className="text-white hover:text-gray-300"
          >
            Meme Generator
          </Link>
        </li>
        <li>
          <Link
            href="/shower-thoughts"
            className="text-white hover:text-gray-300"
          >
            Shower Thoughts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
