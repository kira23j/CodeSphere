"use client";

import React from "react";
import ActionButtons from "./_components/action-buttons";
import Logo from "./_components/logo";
import { Menu } from "./_components/menu";

const Navbar = () => {
  const navbarClasses = `
    flex items-center justify-between px-6 py-3
    bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
    text-white shadow-md sticky top-0 z-50
    border-b border-gray-700
  `;

  return (
    <div className={navbarClasses}>
      <div className="flex items-center gap-8">
        <Logo />
        <Menu />
      </div>
      <ActionButtons />
    </div>
  );
};

export default Navbar;
