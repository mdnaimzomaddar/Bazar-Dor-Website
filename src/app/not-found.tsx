import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "পেজ পাওয়া যায়নি | বাজারের দাম",
  description: "আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f7f8f5] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 sm:px-12 sm:py-14">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          {/* Illustration: empty basket */}
          <div className="shrink-0" aria-hidden="true">
            <svg
              width="190"
              height="170"
              viewBox="0 0 190 170"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* handle */}
              <path
                d="M45 78C45 30 145 30 145 78"
                stroke="#b45309"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* basket body */}
              <path
                d="M22 78H168L152 148C150.5 155 145 158 139 158H51C45 158 39.5 155 38 148L22 78Z"
                fill="#c2742b"
              />
              <path
                d="M22 78H168L164 94H26L22 78Z"
                fill="#a85f1c"
              />
              {/* weave lines */}
              <path d="M62 94L68 158" stroke="#a85f1c" strokeWidth="4" />
              <path d="M95 94V158" stroke="#a85f1c" strokeWidth="4" />
              <path d="M128 94L122 158" stroke="#a85f1c" strokeWidth="4" />
              <path d="M30 118H160" stroke="#a85f1c" strokeWidth="4" />
              {/* question mark floating above basket */}
              <circle cx="95" cy="52" r="24" fill="#dcfce7" />
              <path
                d="M86 46C86 40.5 90 37 95.5 37C101 37 105 40.5 105 45.5C105 52 97 52.5 97 59"
                stroke="#15803d"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="97" cy="67" r="3.2" fill="#15803d" />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-green-700">
              ত্রুটি ৪০৪
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-snug text-gray-900 sm:text-4xl">
              এই পেজটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="mt-3 max-w-md text-base leading-relaxed text-gray-600">
              লিংকটি ভুল হতে পারে, অথবা পেজটি সরিয়ে ফেলা হয়েছে। হোম পেজে গিয়ে
              আজকের বাজারের দাম দেখুন।
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                হোম পেজে ফিরে যান
              </Link>
              <Link
                href="/#all-products"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                সব পণ্যের দাম দেখুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
