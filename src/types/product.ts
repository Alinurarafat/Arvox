export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

export interface Product {
  id: string;
  shopifyId?: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  hoverImage?: string;
  images: string[];
  colors: string[];
  colorNames?: string[];
  sizes: string[];
  description: string;
  details: string[];
  isNew: boolean;
  isBestseller: boolean;
  isUnder50: boolean;
  variants: ProductVariant[];
  tags: string[];
  productType: string;
  descriptionHtml?: string;
}