import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ProductCard from '@/components/base/ProductCard';
import { getProductById } from '@/mocks/products';
import { useCart } from '@/context/CartContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fetchShopifyProduct } from '@/lib/shopify';
import { useShopifyProducts } from '@/context/ShopifyContext';
import type { Product } from '@/types/product';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products: allProducts } = useShopifyProducts();
  const relatedRef = useScrollReveal<HTMLElement>({ staggerDelay: 80 });

  const [product, setProduct] = useState<Product | undefined>();
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('main');
  const [showError, setShowError] = useState(false);

  const isShopifyId = /^\d{10,}$/.test(id || '');

  useEffect(() => {
    if (!id) return;
    if (isShopifyId) {
      setProductLoading(true);
      setProductError(null);
      fetchShopifyProduct(id)
        .then((p) => {
          setProduct(p || undefined);
        })
        .catch((e) => setProductError(e.message))
        .finally(() => setProductLoading(false));
    } else {
      setProduct(getProductById(id));
    }
  }, [id, isShopifyId]);

  const selectedColor = product?.colorNames?.[selectedColorIdx] || product?.colors[selectedColorIdx] || '';

  const findVariant = useCallback((size: string, color: string) => {
    if (!product?.variants) return undefined;
    return product.variants.find((v) => {
      const sizeMatch = v.selectedOptions.some(
        (opt) => opt.name.toLowerCase().includes('size') && opt.value === size
      );
      const colorMatch = v.selectedOptions.some(
        (opt) => opt.name.toLowerCase().includes('color') && opt.value === color
      );
      return sizeMatch && colorMatch;
    });
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize && product.sizes.length > 1 && product.sizes[0] !== 'One Size') {
      setShowError(true);
      return;
    }
    const sizeToUse = selectedSize || product.sizes[0] || 'One Size';
    setShowError(false);
    const variant = findVariant(sizeToUse, selectedColor);
    addItem(product, sizeToUse, selectedColor, quantity, variant?.id);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const hasDiscount = product ? product.originalPrice > product.price : false;

  const images = product
    ? [
        { key: 'main', src: product.image, label: 'Front' },
        ...(product.hoverImage ? [{ key: 'hover', src: product.hoverImage, label: 'Detail' }] : []),
        ...(product.images.slice(2).map((img, i) => ({ key: `img-${i}`, src: img, label: `View ${i + 2}` }))),
      ]
    : [];

  const relatedProducts = product
    ? allProducts.filter((p) => p.id !== product.id && p.productType === product.productType).slice(0, 4)
    : [];

  if (productLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16 md:pt-20">
          <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-14">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-16 animate-pulse">
                <div className="w-full lg:w-[55%] aspect-[3/4] bg-gray-200" />
                <div className="w-full lg:w-[45%] space-y-4">
                  <div className="h-4 bg-gray-200 w-1/4 rounded" />
                  <div className="h-8 bg-gray-200 w-3/4 rounded" />
                  <div className="h-6 bg-gray-200 w-1/3 rounded" />
                  <div className="h-px bg-gray-200" />
                  <div className="h-20 bg-gray-200 rounded" />
                  <div className="h-20 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20 md:pt-24 px-4 md:px-8 lg:px-12 py-24">
          <div className="max-w-7xl mx-auto text-center sr-reveal" data-sr-delay="0">
            <h1 className="font-display text-3xl md:text-5xl font-black text-arvox-black uppercase tracking-tight mb-4">
              {productError ? 'Something Went Wrong' : 'Product Not Found'}
            </h1>
            <p className="font-body text-sm text-gray-500 mb-8">
              {productError || 'The product you are looking for does not exist.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {productError && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.15em] cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Retry
                </button>
              )}
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-3 border border-arvox-black text-arvox-black font-body text-xs font-semibold uppercase tracking-[0.15em] cursor-pointer hover:bg-arvox-black hover:text-white transition-colors whitespace-nowrap"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="w-full px-4 md:px-8 lg:px-12 py-3 md:py-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-hidden">
            <Link to="/" className="font-body text-xs text-gray-400 hover:text-arvox-black transition-colors whitespace-nowrap flex-shrink-0">
              Home
            </Link>
            <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
              <i className="ri-arrow-right-s-line text-xs text-gray-300" />
            </div>
            <Link to="/shop" className="font-body text-xs text-gray-400 hover:text-arvox-black transition-colors whitespace-nowrap flex-shrink-0">
              Shop
            </Link>
            <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
              <i className="ri-arrow-right-s-line text-xs text-gray-300" />
            </div>
            <span className="font-body text-xs text-arvox-black uppercase tracking-wide truncate">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Detail */}
        <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-16">
              {/* Images */}
              <div className="w-full lg:w-[55%] flex flex-col gap-3 md:gap-4">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-arvox-offwhite overflow-hidden">
                  <img
                    src={images.find((img) => img.key === activeImage)?.src || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1">
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
                {/* Thumbnails */}
                <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {images.map((img) => (
                    <button
                      key={img.key}
                      onClick={() => setActiveImage(img.key)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 bg-arvox-offwhite overflow-hidden cursor-pointer border-2 transition-colors ${
                        activeImage === img.key ? 'border-arvox-black' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="w-full lg:w-[45%] flex flex-col">
                {/* Category */}
                <span className="font-body text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2 md:mb-3">
                  {product.category}
                </span>

                {/* Name */}
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-arvox-black uppercase tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 md:mt-4 mb-6 md:mb-8">
                  <span className="font-body text-xl md:text-2xl font-bold text-arvox-black">
                    ${product.price}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="font-body text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-arvox-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 mb-5 md:mb-6" />

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mb-5 md:mb-6">
                    <span className="font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] block mb-3">
                      Color: <span className="text-gray-400 font-normal">{selectedColor}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColorIdx(idx)}
                          className={`w-10 h-10 sm:w-8 sm:h-8 border-2 cursor-pointer transition-all ${
                            selectedColorIdx === idx
                              ? 'border-arvox-black scale-110'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Select ${product.colorNames?.[idx] || color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes.length > 0 && product.sizes[0] !== 'Default Title' && (
                  <div className="mb-5 md:mb-6">
                    <span className="font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] block mb-3">
                      Size{selectedSize && <span className="text-gray-400 font-normal">: {selectedSize}</span>}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                            setShowError(false);
                          }}
                          className={`min-w-[44px] sm:min-w-[48px] h-10 sm:h-11 px-3 font-body text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all border whitespace-nowrap ${
                            selectedSize === size
                              ? 'bg-arvox-black text-white border-arvox-black'
                              : 'bg-white text-arvox-black border-gray-200 hover:border-arvox-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {showError && (
                      <p className="font-body text-xs text-red-500 mt-2">
                        Please select a size before adding to cart.
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity + Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
                  <div className="flex items-center border border-gray-200 h-12">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-12 h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-subtract-line text-sm text-arvox-black" />
                      </div>
                    </button>
                    <span className="w-12 h-full flex items-center justify-center font-body text-sm font-bold text-arvox-black">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-12 h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-add-line text-sm text-arvox-black" />
                      </div>
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-sm" />
                    </div>
                    Add to Cart
                  </button>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 mb-5 md:mb-6" />

                {/* Description */}
                <div className="mb-5 md:mb-6">
                  <h3 className="font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] mb-3">
                    Description
                  </h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Details */}
                {product.details.length > 0 && (
                  <div>
                    <h3 className="font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] mb-3">
                      Product Details
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-gray-400 mt-2 flex-shrink-0" />
                          <span className="font-body text-sm text-gray-500">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div ref={relatedRef} className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-arvox-offwhite">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 md:mb-10 sr-reveal" data-sr-delay="0">
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-arvox-black uppercase tracking-tight">
                  You May Also Like
                </h2>
                <Link
                  to="/shop"
                  className="font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] hover:text-gray-500 transition-colors whitespace-nowrap"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="sr-reveal" data-sr-stagger="true" data-sr-delay="100">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}