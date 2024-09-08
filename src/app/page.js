import Image from "next/image";
import NewsTable from "../components/NewsTable";
import React, { useMemo } from "react";

export default function Home() {
  const columns = useMemo(
    () => [
      { Header: "標題", accessor: "title" },
      { Header: "內容", accessor: "content" },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        title: "動保法規網上線公告",
        content: "請使用上方查詢功能查詢相關動保法規",
      },
      {
        title: "動保法規網上線公告2",
        content: "請使用上方查詢功能查詢相關動保法規",
      },
    ],
    []
  );

  return (
    <section>
      <div className="bg-white">
        <div className="mt-3">
          <h1 className="text-center text-2xl font-bold">
            動物保護法及相關規定函釋資料庫線上查詢系統
          </h1>
          <div className="flex flex-row mt-4">
            <div id="marquee" className="marquee bg-white border-0 w-full">
              <div className="marquee-content">
                <a
                  className="mr-6 text-lg"
                  href="https://udn.com/news/story/7470/8149945"
                >
                  家貓登記 動保、獸醫意見分歧
                </a>
                <a
                  className="mr-6"
                  href="https://udn.com/news/story/7470/8148909"
                >
                  動保團體要求全面禁山豬吊 林保署：迫使金屬套索地下化不利保育
                </a>
                <a
                  className="mr-6"
                  href="https://udn.com/news/story/7470/8149945"
                >
                  家貓登記 動保、獸醫意見分歧
                </a>
                <a
                  className="mr-6"
                  href="https://udn.com/news/story/7470/8148909"
                >
                  動保團體要求全面禁山豬吊 林保署：迫使金屬套索地下化不利保育
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex-shrink-0 w-full md:w-1/4 ">
              <button
                type="button"
                className="w-full text-lg bg-blue-500 text-white py-3 font-bold hover:bg-blue-600 rounded-lg"
                // onClick={() => (location.href = "Keywords/index.html")}
              >
                關鍵字查詢
              </button>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/4 ">
              <button
                type="button"
                className="w-full text-lg bg-green-500 text-white py-3 font-bold hover:bg-green-600 rounded-lg"
              >
                案例查詢
              </button>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/4 ">
              <button
                type="button"
                className="w-full text-lg bg-teal-600 text-white py-3 font-bold hover:bg-blue-500 rounded-lg"
              >
                課程查詢
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-4">最新消息</h1>
          <NewsTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
}
