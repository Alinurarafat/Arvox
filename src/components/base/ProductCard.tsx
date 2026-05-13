import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white transition-all duration-300 block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white border border-gray-100 transition-all duration-200 cursor-pointer z-10"
        >
          <i
            className={`${
              isWishlisted ? 'ri-heart-fill text-arvox-black' : 'ri-heart-line text-arvox-black'
            } text-lg`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-arvox-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-arvox-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              Bestseller
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 px-1">
        <h3 className="font-body text-sm md:text-base font-bold text-arvox-black tracking-wide uppercase">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-body text-base font-bold text-arvox-black">
            ${product.price}
          </span>
          <span className="font-body text-xs text-gray-400 line-through">
            ${product.originalPrice}
          </span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {product.colors.map((color, idx) => (
            <span
              key={idx}
              className="w-3 h-3 border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}