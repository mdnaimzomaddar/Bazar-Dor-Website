import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface PriceChange {
  dir: "up" | "down";
  pct: number;
}

interface BazardorItem {
  id?: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: PriceChange;
}

const toBn = (value: number | string | undefined) =>
  String(value ?? "").replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const Markquee = async () => {
  const ref = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );
  const data = await ref.json();
  const bazardormarquee: BazardorItem[] = data.data || data;

  return (
    <div className="bg-white">
      <div className="flex mx-auto">
        <MarqueeText direction="right" duration={10} pauseOnHover={true}>
          {bazardormarquee.map((item, index) => (
            <span key={item.id ?? index}>
              <span>{item.categoryIcon}</span>
              <span> </span>
              <span className="text-black text-[14px]">{item.nameBn}</span>
              <span> </span>
              <span className="text-black text-[14px] font-weight-400">{toBn(item.today)}</span>
              <span> </span>
              <span className="text-black text-[14px]"> টাকা/কেজি</span>
              <span> </span>
              {item.change?.dir === "up" ? (
                <span className="text-red-600 text-[14px]">▲ {toBn(item.change.pct)}%</span>
              ) : (
                <span className="text-green-600 text-[14px]">▼ {toBn(item.change?.pct)}%</span>
              )}
              <span className="inline-block w-8" />
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Markquee;