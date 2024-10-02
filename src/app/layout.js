import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "動物保護法及相關規定函釋資料庫線上查詢系統",
  description: "next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-tw">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <noscript>
          您的瀏覽器不支援JavaScript功能，若網頁功能無法正常使用時，請開啟瀏覽器JavaScript狀態
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex-grow min-h-screen">
          {children}
        </main>
        <footer className="bg-black bg-opacity-50 bottom-0 sticky w-full mt-4">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col">
              <div className="flex justify-center mb-2">
                <p className="text-white text-center">
                  隱私權保護政策 ｜ 網站安全政策 ｜ 網站資料開放宣告
                </p>
              </div>
              <div className="flex justify-center mb-2">
                <p className="text-white text-center">
                  版權所有： ｜ 地址 : ｜ 機關電話:
                </p>
              </div>
              <div className="flex justify-center">
                <p className="text-white text-center">
                  更新日期：2024/10/03 ｜ 總瀏覽人數：9999
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
