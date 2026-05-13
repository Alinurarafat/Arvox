export default function MarqueeTicker() {
  const text = 'ARVOX SPACE • NEW DROP • WEAR THE CULTURE • LIMITED EDITION • FREE SHIPPING • ';

  return (
    <div className="bg-arvox-black overflow-hidden py-3 md:py-4">
      <div className="flex animate-marquee-fast whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="font-grotesque text-sm md:text-base font-bold text-white uppercase tracking-[0.25em] mx-3 md:mx-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}