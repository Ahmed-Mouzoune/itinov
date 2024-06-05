import React from "react";
import { MdOutlineSearch, MdOutlineAccountCircle } from "react-icons/md";

export default function Header() {
  return (
    <header className="bg-white w-screen p-4">
      <div className="flex justify-between items-center mx-auto max-w-screen-md">
        <div className="rounded-full h-min w-min p-2 bg-gray-200">
          <MdOutlineSearch className="cursor-default" />
        </div>
        <div className="flex flex-col text-center tracking-wider">
          <h1 className="font-semibold text-lg">Checking Account</h1>
          <span className="font-light text-sm">ITINOV BANK APP</span>
        </div>
        <div className="rounded-full h-min w-min p-2 bg-gray-200">
          <MdOutlineAccountCircle className="cursor-default" />
        </div>
      </div>
    </header>
  );
}
