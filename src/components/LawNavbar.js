"use client";

import { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  ListItem,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

function LawNavbar() {
  const [openNav, setOpenNav] = useState(false);

  function NavList() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
      <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6 justify-center">
        <li>
          <Link href="/lawspec" passHref>
            <Typography className="text-white font-bold text-lg hover:text-gray-300 cursor-pointer">
              法規範
            </Typography>
          </Link>
        </li>
        <li>
          <Link href="/cases" passHref>
            <Typography className="text-white font-bold text-lg hover:text-gray-300 cursor-pointer">
              案例
            </Typography>
          </Link>
        </li>
        <li>
          <Link href="/courses" passHref>
            <Typography className="text-white font-bold text-lg hover:text-gray-300 cursor-pointer">
              課程
            </Typography>
          </Link>
        </li>
        {/* 相關連結 Dropdown */}
        <li>
          <Menu
            open={isMenuOpen}
            handler={setIsMenuOpen}
            placement="bottom"
            allowHover
          >
            <MenuHandler className="flex items-center cursor-pointer">
              <ListItem
                className="flex flex-grow items-center py-2"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                <Typography className="text-white font-bold text-lg cursor-pointer pr-2">
                  相關連結
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </MenuHandler>
            <MenuList className="bg-white text-black py-2 mt-2 rounded shadow-lg w-64">
              <MenuItem>
                <Link
                  href="https://animal.moa.gov.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  動物保護資訊網
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="https://www.pet.gov.tw/AnimalApp/AnnounceMent_Announce.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  全國動物收容管理系統
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    );
  }

  return (
    <Navbar className="bg-green-900 sticky top-0 z-10 h-max max-w-full border-none rounded-none m-0 px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-white">
        {/* 左側 - 首頁連結 */}
        <Typography
          as={Link}
          href="/"
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-2xl"
        >
          動物保護法及相關規定函釋資料庫線上查詢系統
        </Typography>

        {/* 中間的導航連結 */}
        <div className="hidden lg:block">
          <NavList />
        </div>

        {/* 手機版的導航開關按鈕 */}
        <IconButton
          variant="text"
          color="white"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
          aria-label="Toggle navigation"
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* 手機版的折疊導航 */}
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default LawNavbar;
