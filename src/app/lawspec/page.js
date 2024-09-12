import Image from "next/image";
import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <section className="min-h-screen bg-white dark:bg-white-100">
      <div className="bg-white dark:bg-gray-800">
        <Navbar />
        <div className="flex flex-row mt-4">
          <p></p>
        </div>
      </div>
    </section>
  );
}
