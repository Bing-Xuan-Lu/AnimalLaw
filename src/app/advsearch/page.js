"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Chip,
} from "@material-tailwind/react";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import LawNavbar from "@/components/LawNavbar";

export default function Home() {
  // 圖標切換組件
  const Icon = ({ id, open }) => {
    return open === id ? (
      <ChevronUpIcon className="h-5 w-5 text-blue-gray-500" />
    ) : (
      <ChevronDownIcon className="h-5 w-5 text-blue-gray-500" />
    );
  };

  const accordionData = useMemo(
    () => [
      {
        id: 1,
        title: "寵物食品「適用寵物種類」標示",
        lawtype: "函釋",
        lawcolor: "amber",
        laws: "105年10月7日農牧字第1050728719號",
        content:
          "一、復貴處105年9月22日中市動保字第1050006568號函。二、依「動物保護法」（以下簡稱本法）第2條第1項規定：「本法所稱主管機關：在中央為行政院農業委員會；在直轄市為直轄市政府；在縣（市）為縣（市）政府。」，依本法第34條規定：「本法所定之罰鍰，由直轄市或縣(市) 主管機關處罰之。」，另依行政罰法第29條第1項規定：「違反行政法上義務之行為，由行為地、結果地、行為人之住所、居所或營業所、事務所或公務所所在地之主管機關管轄。」，爰寵物食品違反本法規定應裁處罰鍰者，其行為地、結果地、行為人之住所、居所或營業所、事務所或公務所所在地之直轄市或縣（市)主管機關，均有管轄權；至於因一行為違反同一行政法上義務或違反數個行政法上義務之情形，應依行政罰法第31條第1項至第3項規定決定其管轄權，併予敘明。",
      },
      {
        id: 2,
        title:
          "修正「寵物食品病原微生物與有害健康物質種類及安全容許量標準」 第八條之一",
        lawcolor: "teal",
        lawtype: "法規",
        laws: "106年10月27日農牧字第1060043702F號",
        content:
          "發文日期：中華民國106年10月27日 發文字號：農牧字第1060043702F號 修正「寵物食品病原微生物與有害健康物質種類及安全容許量標準」第八條之一。附修正「寵物食品病原微生物與有害健康物質種類及安全容許量標準」第八條之一",
      },
    ],
    []
  );

  // 獨立處理每個Accordion的打開/關閉狀態
  function AccordionItem({ title, content, lawcolor, lawtype }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
      setOpen((prev) => !prev); // 切換 open 狀態
    };

    return (
      <Accordion open={open} icon={<Icon open={open} />}>
        <AccordionHeader onClick={toggleOpen}>
          <div className="flex gap-2 items-center">
            <Chip color={lawcolor} value={lawtype} size="lg" className="rounded-full text-md" />
            <Typography variant="h4" color="blue-gray">{title}</Typography>
          </div>
        </AccordionHeader>
        <AccordionBody>
        <Typography variant="paragraph" className="font-bold">{content}</Typography></AccordionBody>
      </Accordion>
    );
  }

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
                  <Option>函釋</Option>
                  <Option>法規</Option>
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
          <div className="mb-6 flex flex-col md:flex-row flex-grow justify-between gap-3">
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
          <div className="w-full">
            {accordionData.map((item) => (
              <AccordionItem
                key={item.id}
                title={`${item.title} ${item.laws}`}
                content={item.content}
                lawcolor={item.lawcolor}
                lawtype={item.lawtype}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
