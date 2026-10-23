import SortSelect from "@/app/components/SortSelect";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

interface BazardorItem {
  id: number;
  category: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change?: { dir?: string; pct?: number };
}

const toBn = (value: number | string | undefined) =>
  String(value ?? "").replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  hali: "হালি",
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

const CategoryContent = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { sort = "default" } = await searchParams;

  const ref = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );
  const data = await ref.json();
  const all: BazardorItem[] = data.data || data;

  const products = all.filter((p) => p.category === slug);
  if (products.length === 0) notFound();

  const sorted = [...products];
  if (sort === "price-asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "price-desc") sorted.sort((a, b) => b.today - a.today);
  if (sort === "change-desc")
    sorted.sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0));

  const first = products[0];

  return (
    <div className="max-w-7xl mx-auto">
      {/* header */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-[#fafcfa] p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {first.categoryIcon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{first.categoryNameBn}</h1>
          <p className="text-sm text-gray-600">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* sort bar */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-[#fafcfa] px-5 py-3">
        <SortSelect current={sort} />
      </div>

      <p className="mt-4 mb-3 text-sm text-gray-600">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item) => {
          const dir = item.change?.dir;
          const isUp = dir === "up";
          const isDown = dir === "down";
          const isUrl = item.image?.startsWith("http");

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-[#fafcfa] p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                  {isUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.nameBn} className="h-10 w-10 object-cover" />
                  ) : (
                    <span>{item.image || item.categoryIcon}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{item.nameBn}</h3>
                  <p className="text-sm text-gray-600">
                    প্রতি {unitBn[item.unit] ?? item.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-700">আজকের দাম</p>
                  <p className="text-xl font-bold text-gray-900">
                    {toBn(item.today)}{" "}
                    <span className="text-base font-medium">টাকা</span>
                  </p>
                </div>
                <span
                  className={`rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold ${
                    isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"} {toBn(item.change?.pct ?? 0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategoryPage = ({ params, searchParams }: Props) => (
  <section className="bg-[#f0f5f0] px-4 py-6">
    <Suspense
      fallback={<div className="py-10 text-center text-gray-500">লোড হচ্ছে...</div>}
    >
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  </section>
);

export default CategoryPage;