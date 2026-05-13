import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems, checkout, checkoutLoading, setCheckoutLoading } = useCart();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const url = await checkout();
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] flex flex-col shadow-xl transform transition-transform duration-300 translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold text-arvox-black uppercase tracking-tight">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:text-gray-500 transition-colors"
          >
            <i className="ri-close-line text-xl text-arvox-black" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <i className="ri-shopping-bag-line text-5xl text-gray-200" />
              <p className="font-body text-sm text-gray-400 uppercase tracking-wider">
                Your cart is empty
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 px-6 py-3 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.15em] cursor-pointer hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.cartId} className="flex gap-4">
                  {/* Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex-shrink-0 w-20 h-24 bg-arvox-offwhite overflow-hidden"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="font-body text-sm font-bold text-arvox-black uppercase tracking-wide hover:text-gray-500 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="font-body text-xs text-gray-400 mt-1">
                        {item.color} / {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <i className="ri-subtract-line text-xs text-arvox-black" />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center font-body text-xs font-semibold text-arvox-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <i className="ri-add-line text-xs text-arvox-black" />
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-bold text-arvox-black">
                          ${item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="w-6 h-6 flex items-center justify-center cursor-pointer text-gray-300 hover:text-arvox-black transition-colors"
                        >
                          <i className="ri-close-line text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-gray-500 uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-body text-lg font-bold text-arvox-black">
                ${subtotal}
              </span>
            </div>
            {checkoutError && (
              <p className="font-body text-xs text-red-500">
                {checkoutError}
              </p>
            )}
            <p className="font-body text-[10px] text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full py-4 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? 'Processing...' : 'Checkout'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 border border-gray-200 text-arvox-black font-body text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer hover:border-arvox-black transition-colors whitespace-nowrap"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}