"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import LawNavbar from "@/components/LawNavbar";
import {
  Button,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";

import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useSpring, animated } from "@react-spring/web";

import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";

export default function Home() {
  function handleSearch(e) {
    e.preventDefault();
    console.log("Search triggered");
  }

  const [areItemsExpanded, setAreItemsExpanded] = useState(false);
  const apiRef = useTreeViewApiRef();

  useEffect(() => {
    if (areItemsExpanded) {
      setTimeout(() => {
        const itemIds = ["1", "2", "3", "4"];
        itemIds.forEach((id) => {
          apiRef.current.setItemExpansion(null, id, areItemsExpanded);
        });
      }, 100);
    }
  }, [areItemsExpanded]);

  const handleExpandClick = (event) => {
    const itemIds = ["1", "2", "3", "4"];
    // 設置新狀態
    const newState = !areItemsExpanded;
    // 更新全局狀態
    setAreItemsExpanded(newState);
    // 使用 setTimeout 確保在狀態更新後再設置展開狀態
    setTimeout(() => {
      itemIds.forEach((id) => {
        apiRef.current.setItemExpansion(event, id, newState);
      });
    }, 100);

    if (newState) {
      apiRef.current.setItemExpansion(event, "1", true);
      apiRef.current.setItemExpansion(event, "2", true);
      apiRef.current.setItemExpansion(event, "3", true);
      apiRef.current.setItemExpansion(event, "4", true);
    } else {
      apiRef.current.setItemExpansion(event, "4", false);
      apiRef.current.setItemExpansion(event, "3", false);
      apiRef.current.setItemExpansion(event, "2", false);
      apiRef.current.setItemExpansion(event, "1", false);
    }
  };

  function TransitionComponent(props) {
    const { in: open } = props; // `props.in` 來自 MUI 用於控制展開/收縮
    const style = useSpring({
      opacity: open ? 1 : 0,
      transform: open ? `translate3d(0,0,0)` : `translate3d(20px, 0, 0)`,
      config: { tension: 300, friction: 20 },
    });

    return (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    );
  }

  const CustomTreeItem = React.forwardRef((props, ref) => (
    <StyledTreeItem
      {...props}
      slots={{ groupTransition: TransitionComponent, ...props.slots }}
      ref={ref}
    />
  ));

  const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.grey[800],
    position: "relative",
    outline: "none", // 取消默認的 focus 樣式
    "&:focus > .MuiTreeItem-content": {
      outline: `2px solid ${theme.palette.primary.main}`, // 為 focus 狀態提供可視化樣式
    },
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(1, 1.5),
      margin: theme.spacing(0.5, 0),
      "&:focus": {
        outline: `2px solid ${theme.palette.primary.main}`, // 焦點樣式
      },
      [`& .${treeItemClasses.label}`]: {
        fontSize: "1rem",
        fontWeight: 600,
        whiteSpace: "pre-wrap", // 保留換行
        color: theme.palette.text.primary, // 確保文本顏色有足夠的對比度
      },
      // 這裡添加水平線
      "&:before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "-20px",
        width: "20px",
        height: "1px",
        backgroundColor: alpha(theme.palette.text.primary, 0.4),
        transition: "background-color 0.3s ease", // 為背景顏色添加過渡動畫
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
      transition: "background-color 0.3s ease", // 為 iconContainer 添加過渡動畫
    },
    [`& .${treeItemClasses.groupTransition}`]: {
      position: "relative",
      marginLeft: 0,
      paddingLeft: 20,
      transition: "padding-left 0.3s ease", // 為 padding-left 添加過渡動畫
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "1px",
        height: "50%",
        backgroundColor: alpha(theme.palette.text.primary, 0.4),
        transition: "background-color 0.3s ease", // 為背景顏色添加過渡動畫
      },
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "1px",
        height: "50%",
        backgroundColor: "transparent", // 隱藏下方的線
      },
    },
    // 隱藏第一個項目的水平線
    "&.root:first-of-type > .MuiTreeItem-content:before": {
      display: "none",
    },
  }));

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
          <div>
            <Button
              className="text-lg bg-blue-500 text-white py-3 my-3 font-bold hover:bg-blue-600 rounded-lg"
              onClick={handleExpandClick}
            >
              {areItemsExpanded ? "收合全部" : "展開全部"}
            </Button>
          </div>
          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <SimpleTreeView aria-label="customized" apiRef={apiRef} defaultExpandedItems={["1"]} >
              <CustomTreeItem itemId="1" label="第一章 總則" className="root">
                <CustomTreeItem
                  itemId="2"
                  label={
                    <div>
                      <Typography variant="h6">第一條</Typography>
                      <Typography variant="h6">
                        1.為尊重動物生命、及保護動物、增進動物福利，特制定本法
                      </Typography>
                      <Typography variant="h6">
                        2.動物之保護，依本法之規定。但其他法律有特別之規定者，適用其他法律之規定。
                      </Typography>
                    </div>
                  }
                >
                  <CustomTreeItem itemId="3" label="函釋">
                    <CustomTreeItem
                      itemId="4"
                      label={
                        <Card className="w-full flex flex-wrap items-start p-0 m-0">
                          <CardBody>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              發文單位
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              法務部
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              發文字號
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              法律字第10403516600號
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              發文日期
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              民國104年12月30日
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              相關法條
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              行政罰法第4、5條
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              主旨
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              關於違反動物保護法第5條第3項規定，裁處行政罰相關疑義乙案，復如說明二、三。
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              內容摘要
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              來函所述104年1月27日補獲之犬隻，飼主經合法通知限期領回仍不領回，似可認其棄養行為於104年1月27日即成立，而非限期領回期滿時；如經認定係飼主於
                              104年2月4日動保法修正施行前棄養，未致有破壞生態之虞，主管機關尚未裁處而動保法修正。
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              辦理原則
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              因修正前之規定有利於受處罰者，揆諸前開說明，自應適用修正前之處罰規定。
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              連結或附件
                            </Typography>
                            <Link
                              target="_blank"
                              href={
                                "https://mojlaw.moj.gov.tw/LawContentExShow.aspx?type=e&id=FE282074"
                              }
                            >
                              <Typography className="mb-4" variant="h6">
                                https://mojlaw.moj.gov.tw/LawContentExShow.aspx?type=e&id=FE282074
                              </Typography>
                            </Link>
                          </CardBody>
                        </Card>
                      }
                    />
                  </CustomTreeItem>
                </CustomTreeItem>
              </CustomTreeItem>
            </SimpleTreeView>
          </Box>
        </div>
      </div>
    </section>
  );
}
