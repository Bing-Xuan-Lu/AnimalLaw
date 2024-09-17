"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
// day picker
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

// @heroicons/react
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import LawNavbar from "@/components/LawNavbar";

export default function Home() {
  const [date, setDate] = useState();
  return (
    <section className="w-full min-h-screen bg-white dark:bg-white-100">
      <LawNavbar />
      <div className="mx-4 md:mx-20 my-10">
        <Typography variant="h2" color="blue-gray">
          進階搜尋
        </Typography>
        <div className="mt-8">
          {/* 年度 & 類型 */}
          <div className="mb-6 flex flex-wrap md:flex-nowrap gap-4">
            {/* 年度 */}
            <div className="w-full md:w-1/2 flex items-center gap-4">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-medium w-1/4 text-center"
              >
                年度
              </Typography>
              <div className="md:w-full">
                <Select
                  size="lg"
                  className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                >
                  <Option>2024</Option>
                  <Option>2023</Option>
                </Select>
              </div>
            </div>

            {/* 類型 */}
            <div className="w-full md:w-1/2 flex items-center gap-4">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-medium w-1/4 text-center"
              >
                類型
              </Typography>
              <div className="md:w-full">
                <Select
                  size="lg"
                  className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                >
                  <Option>法律</Option>
                  <Option>政策</Option>
                </Select>
              </div>
            </div>
          </div>

          {/* 縣市 & 鄉鎮 */}
          <div className="mb-6 flex flex-wrap md:flex-nowrap gap-4">
            {/* 縣市 */}
            <div className="w-full md:w-1/2 flex items-center gap-4">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-medium w-1/4 text-center"
              >
                縣市
              </Typography>
              <div className="md:w-full">
                <Select
                  size="lg"
                  className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                >
                  <Option>台北市</Option>
                  <Option>桃園市</Option>
                </Select>
              </div>
            </div>

            {/* 鄉鎮 */}
            <div className="w-full md:w-1/2 flex items-center gap-4">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-medium w-1/4 text-center"
              >
                鄉鎮
              </Typography>
              <div className="md:w-full">
                <Select
                  size="lg"
                  className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                >
                  <Option>士林區</Option>
                  <Option>大同區</Option>
                </Select>
              </div>
            </div>
          </div>
          {/* 關鍵字 */}
          <div className="mb-6 flex flex-col md:flex-row flex-grow justify-between gap-4 md:ml-6">
            <Input
              size="lg"
              label="關鍵字"
              className="w-full text-lg p-4 placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
            <div className="flex flex-col w-full md:flex-row gap-3">
              <Button className="w-full md:w-1/4 text-lg bg-teal-600 text-white font-bold hover:bg-teal-900 rounded-lg">
                搜尋
              </Button>
              <Button className="w-full md:w-1/4 text-lg bg-gray-600 text-white font-bold hover:bg-gray-900 rounded-lg">
                清除
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
