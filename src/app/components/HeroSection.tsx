"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  return (
    <section className="bg-[#f0f5f0] px-4 py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 rounded-3xl border border-gray-200 bg-[#fafcfa] px-4 py-4 md:py-0 md:min-h-[305px]">
        {/* left side */}
        <div className="flex flex-col items-start gap-4">
          <p className="w-fit rounded-full bg-green-100 px-3 py-1 text-[14px] font-medium text-green-700">
            {currentTime || "লোড হচ্ছে..."}
          </p>

          <h2 className="text-[46px] font-semibold leading-tight text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="max-w-xl text-[16px] leading-7 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* right side */}
        <div className="flex justify-center md:justify-end md:pr-16">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={260}
            height={230}
            className="h-auto w-[220px] md:w-[260px] object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;