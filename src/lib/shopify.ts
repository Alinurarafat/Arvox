import { supabase } from './supabase';
import type { Product } from '@/types/product';

export async function fetchShopifyProducts(limit = 50): Promise<Product[]> {
  const { data, error } = await supabase.functions.invoke('shopify-products', {
    body: { limit },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data?.products || [];
}

export async function fetchShopifyProduct(productId: string): Promise<Product | null> {
  const { data, error } = await supabase.functions.invoke('shopify-products', {
    body: { productId },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data?.product || null;
}

export async function createShopifyCheckout(
  items: { variantId: string; quantity: number }[]
): Promise<string> {
  const { data, error } = await supabase.functions.invoke('shopify-checkout', {
    body: { items },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  // Ensure checkout URL always points to myshopify.com, not the custom domain
  let url = data?.checkoutUrl || '';
  url = url.replace('https://arvox.space', 'https://arvox-space.myshopify.com');
  return url;
}