"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Markquee from "./Markquee";

interface Category {
  id: string;
  nameBn: string;
  icon?: string;
  slug?: string;
}

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );

    const Categories = async () => {
      try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
        const data = await res.json();
        setCategories(data.data || data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    Categories();
  }, []);

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
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost text-black hover:text-white">সাইন ইন</button>
          <button className="btn btn-active btn-success bg-[#05893e] text-white">সাইন আপ</button>
        </div>
      </div>

      {/* Category bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-t border-gray-100 overflow-x-auto">
        {loading ? (
          <p className="text-sm text-gray-500 py-1">ক্যাটাগরি লোড হচ্ছে...</p>
        ) : (
          <div className="flex items-center gap-6 whitespace-nowrap py-1">
            {categories.map((category) => {
              const slug = category.slug ?? category.id;
              return (
                <Link
                  key={slug || category.nameBn}
                  href={`/category/${slug}`}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#05893e] transition-colors"
                >
                  {category.icon && <span>{category.icon}</span>}
                  <span className="font-medium text-black">{category.nameBn}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;