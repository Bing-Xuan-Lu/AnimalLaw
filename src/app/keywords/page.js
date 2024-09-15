"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import LawNavbar from "@/components/LawNavbar";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null);

  const toggleOpen = (newIndex) => {
    if (index === newIndex) {
      setOpen(!open); // 切換展開狀態
    } else {
      setIndex(newIndex);
      setOpen(true); // 展開內容
    }
  };

  function renderContent() {
    switch (index) {
      case 1:
        return (
          <div>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                <Typography variant="h5">
                  法規一
                  <br />
                  動物保護法第六條「任何人不得惡意或無故騷擾、虐待或傷害動物。」
                </Typography>
              </CardBody>
            </Card>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                <Typography variant="h5">
                  法規二
                  <br />
                  動物保護法第七條「飼主應防止其所飼養動物無故侵害他人之生命、身體、自由或財產。」
                </Typography>
              </CardBody>
            </Card>
          </div>
        );
      case 2:
        return (
          <div>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                <Typography variant="h5">
                  標題：台南農藥毒殺乙案
                  <br />
                  案號：臺南地方法院 107 年簡字第 1779 號刑事判決
                  <br />
                  事由：被告將摻入農藥的魚肉毒餌，放在農地，引誘犬隻食用，致三隻流浪犬誤食而中毒死亡。
                  <br />
                  判決：法官審酌被告因避免流浪犬破壞農地作物才毒殺，且在審理時坦承犯行，有悔意，認為被告『因一時失慮』
                  才觸犯動保法『宰殺犬之罪』，相信沒有再犯疑慮，處拘役30天，併科罰
                  金10萬，且宣告緩刑2年
                </Typography>
              </CardBody>
            </Card>
          </div>
        );
      case 3:
        return (
          <div>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                <Typography variant="h5">
                  課程一 動物保護法概論與刑案偵查技巧
                </Typography>
              </CardBody>
            </Card>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                <Typography variant="h5">
                  課程二 動物福利基礎概念與案件的危機處理
                </Typography>
              </CardBody>
            </Card>
          </div>
        );

      default:
        return <Typography variant="h6">未選擇法規</Typography>;
    }
  }
  function handleSearch(e) {
    e.preventDefault();
    console.log("Search triggered");
  }
  return (
    <section className="min-h-screen bg-white dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800">
        <LawNavbar />

        <div className="flex flex-col items-center mt-10">
          {/* 搜尋框區域 */}

          <form onSubmit={handleSearch} className="flex w-3/4 gap-4">
            <div
              className="flex items-center space-x-3 w-full max-w-screen-lg border border-gray-300
         rounded-md shadow-md"
            >
              <input
                type="text"
                className="w-full py-3 pl-4 pr-10 text-lg"
                placeholder="法規關鍵字搜尋"
                aria-label="Search"
              />
              <button type="submit" className="flex items-center p-5">
                <FiSearch className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <Button
              className="w-1/4 text-lg bg-teal-600 text-white py-3 font-bold hover:bg-blue-500 rounded-lg"
            >
              進階查詢
            </Button>
          </form>

          {/* 按鈕區域 */}
          <div className="grid grid-cols-3 gap-3 mt-10 w-full max-w-screen-lg">
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center">法規範</p>
              <Button
                onClick={() => toggleOpen(1)}
                color="red"
                className="px-7"
              >
                2
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center">案例</p>
              <Button
                onClick={() => toggleOpen(2)}
                color="orange"
                className="px-7"
              >
                1
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center">課程</p>
              <Button
                onClick={() => toggleOpen(3)}
                color="green"
                className="px-7"
              >
                2
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center max-w-screen-lg mx-auto mt-10">
          <Collapse open={open}>{renderContent()}</Collapse>
        </div>
      </div>
    </section>
  );
}
