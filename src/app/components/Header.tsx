"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// import Userinfo from "./Userinfo";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  const categori = async() =>{
    const ref = await fetch('https://openapi.programming-hero.com/api/bazardor/categories')
    const data = await ref.json()
    console.log(data)
  }

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-4">
        {/* Left/Logo Section */}
        <div className="logo flex justify-center items-center gap-3">
          <Image
            className="w-12 h-12 bg-green-800 rounded p-[8px]"
            src={"/logo-icon.png"}
            alt="Logo"
            height={50}
            width={50}
          />
          <div>
            <h2 className="text-[20px] text-black font-bold leading-tight">
              বাজার দর
            </h2>
            <p className="text-sm text-gray-600">{currentTime || "লোড হচ্ছে..."}</p>
          </div>
        </div>

        {/* Auth Buttons / Userinfo Section */}
        {/* <Userinfo /> */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost text-black hover:text-white">সাইন ইন</button>
          <button className="btn btn-active btn-success bg-[#05893e] text-white">সাইন আপ</button>
        </div>
      </div>

      <div>
        
      </div>
    </header>
  );
};

export default Header;