"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import LawNavbar from "@/components/LawNavbar";
import {
  Button,
  Card,
  Typography,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";

import { RichTreeView } from "@mui/x-tree-view";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useSpring, animated } from "@react-spring/web";

import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import {
  TreeItem2Content,
  TreeItem2,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";

export default function Home() {
  function handleSearch(e) {
    e.preventDefault();
    console.log("Search triggered");
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // 確保動畫只會在客戶端運行
    setMounted(true);
  }, []);

  function TransitionComponent(props) {
    const style = useSpring({
      to: mounted
        ? {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
          }
        : { opacity: 1, transform: "translate3d(0px, 0, 0)" }
    });

    // 根據 mounted 來決定返回內容
    return mounted ? (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    ) : (
      <Collapse {...props} />
    );
  }

  const CustomTreeItem = styled(TreeItem2)(({ theme }) => ({
    color: theme.palette.grey[800], // 修改文字顏色
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(1, 1.5), // 增加 padding
      margin: theme.spacing(0.5, 0), // 增加 margin
      [`& .${treeItemClasses.label}`]: {
        fontSize: "1rem", // 字體調大
        fontWeight: 600, // 字體加粗
        //textAlign: 'center', // 置中
      },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(0, 1.2),
      ...theme.applyStyles("light", {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
      }),
      ...theme.applyStyles("dark", {
        color: theme.palette.primary.contrastText,
      }),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`, // 修改為實線並淡化
    },
    [`& .${treeItemClasses.label}`]: {
      whiteSpace: "pre-wrap", // 保留換行
    },
    ...theme.applyStyles("light", {
      color: theme.palette.grey[800],
    }),
  }));

  const MUI_X_PRODUCTS = [
    {
      id: "grid",
      label: "第一章 總則",
      children: [
        {
          id: "grid-community",
          label:
            "第一條 \r\n1. 為尊重動物生命、及保護動物、增進動物福利，特制定本法 \r\n2.動物之保護，依本法之規定。但其他法律有特別之規定者，適用其他法律之規定。",
          children: [
            { id: "grid-advanced-feature1", label: "函釋", children: [{
              id: "grid-advanced-feature2", label: "發文單位"
            }] },
          ],
        },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-white-100">
      <div className="bg-white dark:bg-gray-800">
        <LawNavbar />
        <div className="flex flex-col items-center mt-10">
          {/* 搜尋框區域 */}
          <form
            onSubmit={handleSearch}
            className="flex md:w-3/4 gap-4 md:flex-row flex-col justify-center"
          >
            <div className="flex items-center space-x-3 w-full max-w-screen-lg border border-gray-300 rounded-md shadow-md">
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
          </form>
        </div>
        {/* 將 RichTreeView 直接放在這裡，不用額外的 flex 佈局 */}
        <div className="mt-4 ms-28">
          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <RichTreeView
              defaultExpandedItems={["grid"]}
              slots={{ item: CustomTreeItem }}
              slotProps={{
                item: { slots: { groupTransition: TransitionComponent } },
              }}
              items={MUI_X_PRODUCTS}
            />
          </Box>
        </div>
      </div>
    </section>
  );
}
