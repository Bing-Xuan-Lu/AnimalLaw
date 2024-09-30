"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import LawNavbar from "@/components/LawNavbar";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { BiSolidDetail } from "react-icons/bi";

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

  const TABLE_HEAD = ["序號", "年度", "地區", "案由", "判決", "詳細資料"];

  const TABLE_ROWS = [
    {
      id: "一",
      year: "107年",
      region: "臺南",
      case: "被告將摻入農藥的魚肉毒餌，放在農地，引誘犬隻食用，致三隻流浪犬誤食而中毒死亡。",
      verdict: "處拘役30天，併科罰 金10萬",
    },
    {
      id: "二",
      year: "106年",
      region: "花蓮",
      case: "被告不滿鄰居飼養的寵物，到她家廚餘桶翻找撿食，將家中弄亂並隨地便溺，在一年內，接續在家中廚餘桶內添加農藥「加保扶」（臺語俗稱：好年冬），致犬隻9 隻及貓1 隻，分別因吃到廚餘桶內含農藥的食物中毒死亡。",
      verdict: "處有期徒刑2月得易科罰金",
    },
  ];

  function TableWithHoverState() {
    return (
      <Card className="h-full w-full overflow-auto px-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10 text-center">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ id, year, region, case: caseDesc, verdict }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "py-4 text-center"
                  : "py-4 text-center border-b border-gray-300";

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className={classes + " w-5"}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes + " w-5"}>
                      <Typography
                        variant="small"
                        className="font-bold text-gray-600"
                      >
                        {year}
                      </Typography>
                    </td>
                    <td className={classes + " w-10"}>
                      <Typography
                        variant="small"
                        className="font-bold text-gray-600"
                      >
                        {region}
                      </Typography>
                    </td>
                    <td className={classes + " w-36 px-5"}>
                      <Typography
                        variant="small"
                        className="font-bold text-gray-600 text-wrap leading-relaxed"
                      >
                        {caseDesc}
                      </Typography>
                    </td>
                    <td className={classes + " w-10"}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {verdict}
                      </Typography>
                    </td>
                    <td
                      className={
                        classes + " w-10 mx-3"
                      }
                    >
                      <Typography
                        color="blue-gray"
                        className="flex justify-center"
                      >
                        <BiSolidDetail className="text-3xl font-bold" />
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    );
  }

  function renderContent() {
    switch (index) {
      case 1:
        return <TableWithHoverState />;
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

          <form
            onSubmit={handleSearch}
            className="flex md:w-3/4 gap-4 md:flex-row flex-col justify-center"
          >
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
              <Tooltip
                content="一般查詢"
                placement="bottom-end"
                className="ml-3"
              >
                <button type="submit" className="flex items-center p-5">
                  <FiSearch className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </Tooltip>
            </div>
            <Link href="../advsearch">
              <Button className="w-full text-lg bg-teal-600 text-white py-6 px-12 font-bold hover:bg-blue-500 rounded-lg">
                進階查詢
              </Button>
            </Link>
          </form>

          {/* 按鈕區域 */}
          <div className="grid grid-cols-3 gap-3 mt-10 w-full max-w-screen-lg">
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center text-black">毒殺</p>
              <Button
                onClick={() => toggleOpen(1)}
                color="red"
                className="px-7"
              >
                2
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center text-black">營養不良</p>
              <Button
                onClick={() => toggleOpen(2)}
                color="orange"
                className="px-7"
              >
                2
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center text-black">虐待</p>
              <Button
                onClick={() => toggleOpen(3)}
                color="green"
                className="px-7"
              >
                1
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
