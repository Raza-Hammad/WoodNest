const ITEMS = [
  "Solid oak frames",
  "Hand-finished joinery",
  "10-year warranty",
  "Free city delivery",
  "See it in AR",
  "Made-to-order sizes",
  "FSC-certified timber",
];

export function Marquee() {
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink py-4 text-cream">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 text-xs tracking-[0.24em] whitespace-nowrap uppercase"
          >
            {item}
            <span className="size-1.5 rounded-full bg-clay-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
