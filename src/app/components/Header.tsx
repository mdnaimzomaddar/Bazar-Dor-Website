"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface Category {
  id: string;
  nameBn: string;
  icon?: string;
  slug?: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );

    const loadCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );
        const data = await res.json();
        setCategories(data.data || data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-4">
        {/* Left/Logo Section */}
        <Link href="/">
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
              <p className="text-sm text-gray-600">
                {currentTime || "লোড হচ্ছে..."}
              </p>
            </div>
          </div>
        </Link>

        {/* Auth Buttons / Userinfo Section */}
        <div className="flex items-center gap-2">
          {isPending ? null : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-sm font-medium text-black hover:text-[#05893e]"
              >
                {session.user.name}
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost text-black"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-ghost text-black hover:text-white"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-active btn-success bg-[#05893e] text-white"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-t border-gray-100 overflow-x-auto">
        {loading ? (
          <p className="text-sm text-gray-500 py-1">ক্যাটাগরি লোড হচ্ছে...</p>
        ) : (
          <div className="flex items-center gap-3 whitespace-nowrap py-1">
            {categories.map((category) => {
              const slug = category.slug ?? category.id;
              const href = `/category/${slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={slug || category.nameBn}
                  href={href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-700 hover:text-[#05893e] active:bg-green-700 active:text-white"
                  }`}
                >
                  {category.icon && <span>{category.icon}</span>}
                  <span
                    className={`font-medium ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {category.nameBn}
                  </span>
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