"use client";

import React from "react";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query; // 從URL中取得參數

  return (
    <div>
      <h1>Detail Page for Item {id}</h1>
      <button onClick={() => router.push("/cases")}>返回</button>
    </div>
  );
}
