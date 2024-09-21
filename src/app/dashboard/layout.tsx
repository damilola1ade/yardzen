import NavBar from "@/components/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <NavBar />
      {children}
    </div>
  );
}
