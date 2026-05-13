interface SectionLabelProps {
  italic: string;
  bold: string;
  className?: string;
}

export default function SectionLabel({ italic, bold, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-8 md:mb-12 ${className}`}>
      <span className="font-display italic text-lg md:text-xl text-gray-400">
        {italic}
      </span>
      <span className="font-grotesque text-xl md:text-2xl font-bold text-arvox-black uppercase tracking-wider">
        {bold}
      </span>
    </div>
  );
}