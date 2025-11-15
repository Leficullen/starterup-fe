import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed bg-background/20 py-[1.3%] top-0 w-full px-[3%] backdrop-blur-sm border-b shadow-drop shadow-md flex justify-between items-center z-100 h-[70px]">
      <div className="hidden md:block">
        <Link
          href="/"
          className="font-bold text-2xl text-background bg-linear-to-r from-primary to-accent px-3 py-1 rounded-full text-shadow-2xl"
        >
          Shrimp Linkers
        </Link>
      </div>
      <div className="flex md:hidden">
        <Link href="/">
          <Home width="30px" height="30px" className="text-primary"/>
        </Link>
      </div>
      <div className="">
        <Link href="/login">
          <Button className="font-semibold text-sm md:text-lg"> Login </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
