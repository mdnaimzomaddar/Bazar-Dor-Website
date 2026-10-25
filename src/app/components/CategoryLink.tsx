"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  icon?: string;
  name: string;
}

const CategoryLink = ({ href, icon, name }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-green-700 text-white"
          : "text-gray-700 hover:text-[#05893e] active:bg-green-700 active:text-white"
      }`}
    >
      {icon && <span>{icon}</span>}
      <span className={`font-medium ${isActive ? "text-white" : "text-black"}`}>
        {name}
      </span>
    </Link>
  );
};

export default CategoryLink;