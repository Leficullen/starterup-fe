import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed bg-background/20 py-[1.3%] z-99 top-0 w-full px-[3%] backdrop-blur-sm border-b shadow-drop shadow-md flex justify-between items-center">
      <div>
        <Link href="/" className="font-bold text-2xl text-background">
          Shrimp Linkers
        </Link>
      </div>
      <div>
        <Link href="/login">
        <Button className="font-semibold text-lg"> Login </Button>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;
