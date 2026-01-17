"use client";

import { Bell, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-[60px] w-full items-center justify-between border-b bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
          T
        </div>
        <span className="text-lg font-bold text-[#F15A24]">T.R.E.M</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">
            M
          </div>

          <div className="flex flex-col text-sm leading-tight">
            <span className="font-medium text-gray-800">Matheus Coutinho</span>
            <span className="text-gray-500">Produtor</span>
          </div>
        </div>

        <button className="text-gray-600 hover:text-gray-800">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
