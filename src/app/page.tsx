import { Suspense } from "react";
import Markquee from "./components/Markquee";
import HeroSection from "./components/HeroSection";
import TodayIncresedProducts from "./components/TodayIncresedProducts";
import TodayDecreasedProducts from "./components/TodayDecreasedProducts";
import AllProducts from "./components/AllProducts";

const Loading = ({ text }: { text: string }) => (
  <div className="py-6 text-center text-sm text-gray-500">{text}</div>
);

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading text="বাজার দর লোড হচ্ছে..." />}>
        <Markquee />
      </Suspense>

      <HeroSection />

      <Suspense fallback={<Loading text="লোড হচ্ছে..." />}>
        <TodayIncresedProducts />
        <TodayDecreasedProducts />
        <AllProducts />
      </Suspense>
    </>
  );
}