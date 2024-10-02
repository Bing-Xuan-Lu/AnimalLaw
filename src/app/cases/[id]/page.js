"use client";

import React,{ useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 使用 next/navigation
import { useParams } from "next/navigation"; // 獲取 URL 中的參數

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

// export const dynamicParams = false;


// export function generateStaticParams() {
// return [{ id: '1' }, { id: '2' }, { id: '3' }];
// }

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // 從 URL 中取得參數

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
  }, [areItemsExpanded, apiRef]);

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
      itemIds.forEach((id) => {
        apiRef.current.setItemExpansion(event, id, true);
      });
    } else {
      itemIds.reverse().forEach((id) => {
        apiRef.current.setItemExpansion(event, id, false);
      });
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
  CustomTreeItem.displayName = "CustomTreeItem";

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
            <SimpleTreeView
              aria-label="customized"
              apiRef={apiRef}
              defaultExpandedItems={["1"]}
            >
              <CustomTreeItem itemId="1" label="113年" className="root">
                <CustomTreeItem
                  itemId="2"
                  label={
                    <div>
                      <Typography variant="h6">台中</Typography>
                    </div>
                  }
                >
                  <CustomTreeItem itemId="3" label="毒殺">
                    <CustomTreeItem
                      itemId="4"
                      label={
                        <Card className="w-2/3 flex flex-wrap items-start p-0 m-0">
                          <CardBody>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              裁判字號
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                              臺灣臺中地方法院 112 年度易字第 3078 號刑事裁定
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              裁判日期
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                            民國 113 年 07 月 26 日
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              裁判案由
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                            違反動物保護法等
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              犯罪事實
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                            丙○○明知任何人不得騷擾、虐待或傷害動物，竟基於宰殺動物、毀棄損壞之犯意，於民國112年1月4日11時52分許，駕駛車牌號碼：0000-00號自用小客車行經臺中市○○區○○路000巷00號前時，駕駛前開車輛撞擊乙○○○所飼養之犬隻（下稱本案犬隻），致該犬傷重而死亡，因此喪失原有功能而不堪使用，足生損害於乙○○○
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              判決
                            </Typography>
                            <Typography className="mb-4" variant="h6">
                            犯動物保護法第25條第1款之違反同法第12條第1項前段規定之不得任意宰殺動物罪及刑法第354條之毀損他人物品罪。被告以一行為同時觸犯上開罪名，為想像競合犯，均應依刑法第55條之規定，從一重論以不得任意宰殺動物罪。
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              附件
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
                            判決書
                            <Link
                              target="_blank"
                              href={
                                "https://judgment.judicial.gov.tw/FJUD/default.aspx"
                              }
                            >
                              <Typography className="mb-4" variant="h6">
                              https://judgment.judicial.gov.tw/FJUD/default.aspx
                              </Typography>
                            </Link>
                            </Typography>
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
      <div className="flex flex-col items-center mt-10">
        <Button
          className="text-lg bg-green-500 text-white py-3 my-3 font-bold hover:bg-blue-600 rounded-lg"
          onClick={() => router.push("/cases")}
        >
          回上頁
        </Button>
      </div>
    </section>
  );
}
