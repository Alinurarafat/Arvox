export interface Collection {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export const collections: Collection[] = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: 'https://readdy.ai/api/search-image?query=Dark%20maroon%20oversized%20hoodie%20styled%20on%20invisible%20mannequin%2C%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%2C%20front%20view%20showing%20full%20design&width=600&height=600&seq=201&orientation=squarish',
    productCount: 12,
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    image: 'https://readdy.ai/api/search-image?query=Premium%20black%20cotton%20t-shirt%20styled%20on%20invisible%20mannequin%2C%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%2C%20front%20view%20showing%20full%20design&width=600&height=600&seq=202&orientation=squarish',
    productCount: 18,
  },
  {
    id: 'pants',
    name: 'Pants',
    image: 'https://readdy.ai/api/search-image?query=Black%20cargo%20pants%20styled%20on%20invisible%20mannequin%2C%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%2C%20front%20view%20showing%20full%20design&width=600&height=600&seq=203&orientation=squarish',
    productCount: 8,
  },
  {
    id: 'caps',
    name: 'Caps',
    image: 'https://readdy.ai/api/search-image?query=Black%20structured%20baseball%20cap%20with%20minimal%20design%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20accessory%20photography%2C%20front%20view%20showing%20full%20design&width=600&height=600&seq=204&orientation=squarish',
    productCount: 6,
  },
];