import { useState, useEffect, useCallback } from 'react';

const garmentTabs = [
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'tshirts', label: 'T-Shirts' },
  { key: 'pants', label: 'Pants' },
  { key: 'caps', label: 'Caps' },
] as const;

type GarmentKey = (typeof garmentTabs)[number]['key'];

const sizeTables: Record<GarmentKey, { headers: string[]; rows: string[][]; note: string }> = {
  hoodies: {
    headers: ['Size', 'Chest', 'Length', 'Sleeve'],
    rows: [
      ['S', '112 cm / 44"', '68 cm / 26.8"', '58 cm / 22.8"'],
      ['M', '118 cm / 46.5"', '70 cm / 27.6"', '60 cm / 23.6"'],
      ['L', '124 cm / 48.8"', '72 cm / 28.3"', '62 cm / 24.4"'],
      ['XL', '130 cm / 51.2"', '74 cm / 29.1"', '64 cm / 25.2"'],
    ],
    note: 'Oversized fit. Size down for a closer silhouette.',
  },
  tshirts: {
    headers: ['Size', 'Chest', 'Length', 'Shoulder'],
    rows: [
      ['S', '106 cm / 41.7"', '67 cm / 26.4"', '48 cm / 18.9"'],
      ['M', '112 cm / 44.1"', '69 cm / 27.2"', '50 cm / 19.7"'],
      ['L', '118 cm / 46.5"', '71 cm / 28.0"', '52 cm / 20.5"'],
      ['XL', '124 cm / 48.8"', '73 cm / 28.7"', '54 cm / 21.3"'],
    ],
    note: 'Boxy fit with dropped shoulders. Pre-shrunk fabric.',
  },
  pants: {
    headers: ['Size', 'Waist', 'Length', 'Thigh'],
    rows: [
      ['S', '78 cm / 30.7"', '100 cm / 39.4"', '58 cm / 22.8"'],
      ['M', '84 cm / 33.1"', '102 cm / 40.2"', '60 cm / 23.6"'],
      ['L', '90 cm / 35.4"', '104 cm / 40.9"', '62 cm / 24.4"'],
      ['XL', '96 cm / 37.8"', '106 cm / 41.7"', '64 cm / 25.2"'],
    ],
    note: 'Tapered fit with adjustable cuff straps.',
  },
  caps: {
    headers: ['Size', 'Head Circumference', 'Depth', 'Brim'],
    rows: [
      ['One Size', '56–62 cm / 22–24.4"', '11 cm / 4.3"', '7 cm / 2.8"'],
    ],
    note: 'Adjustable leather strap. Fits most head sizes.',
  },
};

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<GarmentKey>('hoodies');

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  const table = sizeTables[activeTab];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white shadow-2xl animate-modal-in">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 md:px-10 py-6 md:py-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-[1px] bg-gray-300" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gray-400">
                Arvox Space
              </span>
            </div>
            <h2 className="font-grotesque text-lg md:text-xl font-bold text-arvox-black uppercase tracking-[0.1em]">
              Size Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 text-arvox-black hover:border-arvox-black hover:bg-arvox-black hover:text-white transition-all duration-300 cursor-pointer flex-shrink-0"
            aria-label="Close size guide"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 md:px-10 pt-6 flex flex-wrap items-center gap-x-5 md:gap-x-6 gap-y-2">
          {garmentTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative font-body text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 cursor-pointer whitespace-nowrap pb-1 ${
                  isActive ? 'text-arvox-black' : 'text-gray-400 hover:text-arvox-black'
                }`}
              >
                {tab.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-arvox-black transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="px-6 md:px-10 py-6 md:py-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  {table.headers.map((h) => (
                    <th
                      key={h}
                      className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-left py-3 pr-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`font-body text-xs md:text-sm py-3.5 pr-4 whitespace-nowrap ${
                          cIdx === 0
                            ? 'font-bold text-arvox-black'
                            : 'text-gray-600'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <span className="w-1 h-1 bg-arvox-black mt-2 flex-shrink-0" />
              <p className="font-body text-xs text-gray-500 leading-relaxed">
                {table.note} Measurements are taken flat. For circumference, multiply by two. All
                garments are pre-shrunk and retain shape after washing.
              </p>
            </div>
          </div>

          {/* Measurement Guide */}
          <div className="mt-8 md:mt-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-sm italic text-gray-500 tracking-wide">How to</span>
              <span className="font-grotesque text-sm font-bold text-arvox-black uppercase tracking-[0.15em] ml-1">
                Measure
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Chest', desc: 'Measure under arms across the fullest part of the chest.' },
                { label: 'Length', desc: 'Measure from the highest shoulder point to the bottom hem.' },
                { label: 'Sleeve', desc: 'Measure from shoulder seam to the end of the cuff.' },
                { label: 'Waist', desc: 'Measure around the narrowest part of your natural waistline.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-gray-100 p-4"
                >
                  <span className="font-grotesque text-xs font-bold text-arvox-black uppercase tracking-[0.1em]">
                    {item.label}
                  </span>
                  <p className="font-body text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modal-in {
          animation: modalIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}