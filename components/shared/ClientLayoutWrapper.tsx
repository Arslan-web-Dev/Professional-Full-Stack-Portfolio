"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main 
        className={`transition-all duration-300 min-h-screen ${
          isOpen ? "md:pl-[16rem] pl-[4.5rem]" : "pl-[4.5rem]"
        }`}
      >
        {children}
      </main>
    </>
  );
}
