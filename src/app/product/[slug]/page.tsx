import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change?: { dir?: string; pct?: number };
  markets: Market[];
}

const toBn = (value: number | string | undefined) =>
  String(value ?? "").replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

// 63.5 -> ৬৩.৫০, 62 -> ৬২
const fmt = (n: number) => toBn(Number.isInteger(n) ? n : n.toFixed(2));

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  hali: "হালি",
};

const ProductContent = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );
  if (!res.ok) notFound();

  const json = await res.json();
  const p: Product = json.data || json;
  if (!p?.nameBn) notFound();

  const unit = unitBn[p.unit] ?? p.unit;
  const markets = p.markets ?? [];
  const lowest = markets.length ? Math.min(...markets.map((m) => m.min)) : p.today;
  const highest = markets.length ? Math.max(...markets.map((m) => m.max)) : p.today;

  const dir = p.change?.dir;
  const isUp = dir === "up";
  const isDown = dir === "down";
  const diff = Math.abs(p.today - p.yesterday);
  const color = isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-500";
  const word = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত";

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      {/* breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link href="/" className="hover:text-[#05893e]">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:text-[#05893e]">
          {p.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900">{p.nameBn}</span>
      </nav>

      {/* header card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-[#fafcfa] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-5xl">
            {p.image?.startsWith("http") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.nameBn} className="h-14 w-14 object-cover" />
            ) : (
              <span>{p.image || p.categoryIcon}</span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{p.nameBn}</h1>
            <p className="text-sm text-gray-600">
              প্রতি {unit} · {p.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              গতকালের তুলনায় আজ দাম <b className={color}>{word}</b>
              {diff > 0 && <> · {fmt(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-100 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">আজকের দাম</p>
          <p className="text-4xl font-bold text-gray-900">{fmt(p.today)}</p>
          <p className="text-sm text-gray-600">টাকা / {unit}</p>
          <p className={`mt-1 text-sm font-bold ${color}`}>
            {isUp ? "▲" : isDown ? "▼" : "—"} {toBn(p.change?.pct ?? 0)}%
          </p>
        </div>
      </div>

      {/* summary + table */}
      <div className="rounded-2xl border border-gray-200 bg-[#fafcfa] p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-600">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600">
              {fmt(lowest)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-gray-600">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-600">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600">
              {fmt(highest)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-gray-600">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-600">গড় দাম</p>
            <p className="text-2xl font-bold text-green-600">
              {fmt(p.today)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-gray-600">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 font-semibold text-gray-900">{m.market}</td>
                  <td className="px-4 py-3 text-gray-700">{m.division}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{fmt(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right text-gray-700">{fmt(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {fmt((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ params }: { params: Promise<{ slug: string }> }) => (
  <section className="bg-[#f0f5f0] px-4 py-6">
    <Suspense fallback={<div className="py-10 text-center text-gray-500">লোড হচ্ছে...</div>}>
      <ProductContent params={params} />
    </Suspense>
  </section>
);

export default ProductPage;