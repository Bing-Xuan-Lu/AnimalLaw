"use client"; // 這是必要的，因為我們將使用客戶端 Hook

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 如果當前路由是首頁，則不顯示 Navbar
  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="bg-green-900 p-4">
    <ul className="flex justify-center space-x-8">
      <li>
        <Link href="/" className="text-white font-bold hover:text-gray-300">
          首頁
        </Link>
      </li>
      <li>
        <Link href="/lawspec" className="text-white font-bold hover:text-gray-300">
          法規範
        </Link>
      </li>
      <li>
        <Link href="/cases" className="text-white font-bold hover:text-gray-300">
          案例
        </Link>
      </li>
      <li>
        <Link href="/courses" className="text-white font-bold hover:text-gray-300">
          課程
        </Link>
      </li>
      {/* 相關連結 Dropdown */}
      <li
        className="relative group"
        onMouseEnter={() => setDropdownOpen(true)}
      >
        <button className="text-white font-bold hover:text-gray-300 focus:outline-none">
          相關連結
        </button>
        {/* Dropdown Menu */}
        <ul onMouseOut={() => setDropdownOpen(false)}
          className={`absolute mt-2 bg-white text-black py-2 rounded shadow-lg w-48 transition-opacity duration-300 ${
            dropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } group-hover:opacity-100 group-hover:pointer-events-auto`}
        >
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-200"
              href="https://animal.moa.gov.tw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              動物保護資訊網
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-200"
              href="https://www.pet.gov.tw/AnimalApp/AnnounceMent_Announce.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              全國動物收容管理系統
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  );
};

export default Navbar;
