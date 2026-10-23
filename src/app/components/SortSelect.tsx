"use client";
import { useRouter, usePathname } from "next/navigation";

const SortSelect = ({ current }: { current: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="text-sm text-gray-600">সাজান</span>
      <select
        value={current}
        onChange={(e) => {
          const v = e.target.value;
          router.push(v === "default" ? pathname : `${pathname}?sort=${v}`);
        }}
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
        <option value="change-desc">সবচেয়ে বেশি পরিবর্তন</option>
      </select>
    </div>
  );
};

export default SortSelect;