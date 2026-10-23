import React from 'react';

interface BazardorItem {
    id: number;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    change: {dir: "up" | "down"; pct: number};
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
}

const TodayDecreasedProducts = async() => {
    const ref = await fetch("https://api.api-store.workers.dev/api/bazardor/products", { cache: "no-store" })
    const data = await ref.json()
    const all: BazardorItem[] = data.data || data
    
    const topSix = all
            .filter((item) => item.change?.dir === "down")
            .sort((a,b) => b.change.pct - a.change.pct)
            .slice(0, 6);
    return (
        <section className="bg-[#f0f5f0] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          <span className='text-green-500'>▼</span> আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {topSix.map((item) => {
            const isUrl = item.image?.startsWith("http");
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-[#fafcfa] p-5 border-white transition-all duration-300 hover:border-[2px] hover:border-green-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                    {isUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.nameBn}
                        className="h-10 w-10 object-cover"
                      />
                    ) : (
                      <span>{item.image || item.categoryIcon}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.nameBn}
                    </h3>
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
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold text-green-600">
                    ▼ {toBn(item.change.pct)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    );
};

export default TodayDecreasedProducts;