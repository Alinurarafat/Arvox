import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types/product';
import { fetchShopifyProducts } from '@/lib/shopify';

interface ShopifyContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const ShopifyContext = createContext<ShopifyContextType>({
  products: [],
  loading: true,
  error: null,
  refresh: () => {},
});

export function ShopifyProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShopifyProducts(50);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ShopifyContext.Provider value={{ products, loading, error, refresh: load }}>
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopifyProducts() {
  const ctx = useContext(ShopifyContext);
  if (!ctx) {
    throw new Error('useShopifyProducts must be used within ShopifyProvider');
  }
  return ctx;
}