import type { Product } from '@/types/product';

function createMockProduct(
  base: Omit<Product, 'variants' | 'images' | 'tags' | 'productType' | 'descriptionHtml' | 'shopifyId'> & {
    colors: string[];
    colorNames?: string[];
    sizes: string[];
  }
): Product {
  const firstColor = base.colorNames?.[0] || base.colors[0] || 'Default';
  return {
    ...base,
    shopifyId: undefined,
    productType: base.category,
    images: [base.image, ...(base.hoverImage ? [base.hoverImage] : [])],
    tags: [
      ...(base.isNew ? ['new'] : []),
      ...(base.isBestseller ? ['bestseller'] : []),
      ...(base.isUnder50 ? ['under50'] : []),
    ],
    descriptionHtml: `<p>${base.description}</p>`,
    variants: base.sizes.map((size) => ({
      id: `mock-${base.id}-${size}`,
      title: `${size} / ${firstColor}`,
      price: base.price,
      compareAtPrice: base.originalPrice,
      availableForSale: true,
      selectedOptions: [
        { name: 'Size', value: size },
        { name: 'Color', value: firstColor },
      ],
    })),
  };
}

export const products: Product[] = [
  createMockProduct({
    id: '1',
    name: 'Arvox Core Tee — Black',
    price: 42,
    originalPrice: 58,
    category: 'T-Shirts',
    image: 'https://readdy.ai/api/search-image?query=Premium%20black%20cotton%20t-shirt%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20no%20model%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=600&height=750&seq=101&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Premium%20black%20cotton%20t-shirt%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture&width=600&height=750&seq=102&orientation=squarish',
    colors: ['#0D0D0D', '#F5F5F5'],
    colorNames: ['Black', 'Off White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Arvox Core Tee is built for everyday wear. Cut from heavyweight 240gsm organic cotton with a boxy, dropped-shoulder silhouette. The fabric has a dense, structured hand-feel that holds its shape wash after wash. Minimal branding. Maximum quality.',
    details: ['240gsm organic cotton', 'Boxy fit with dropped shoulders', 'Reinforced collar', 'Pre-shrunk', 'Made in Portugal'],
    isNew: false,
    isBestseller: true,
    isUnder50: true,
  }),
  createMockProduct({
    id: '2',
    name: 'Arvox Oversized Hoodie',
    price: 78,
    originalPrice: 95,
    category: 'Hoodies',
    image: 'https://readdy.ai/api/search-image?query=Dark%20oversized%20hoodie%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=600&height=750&seq=103&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Dark%20oversized%20hoodie%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography&width=600&height=750&seq=104&orientation=squarish',
    colors: ['#0D0D0D', '#F5F5F5'],
    colorNames: ['Black', 'Off White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Oversized Hoodie is our signature silhouette. Crafted from a premium 450gsm cotton-fleece blend with a brushed interior for unmatched comfort. Features a double-layer hood, kangaroo pocket, and ribbed cuffs that do not stretch out.',
    details: ['450gsm cotton-fleece blend', 'Brushed interior', 'Double-layer hood', 'Kangaroo pocket', 'Oversized fit', 'Made in Portugal'],
    isNew: true,
    isBestseller: false,
    isUnder50: false,
  }),
  createMockProduct({
    id: '3',
    name: 'Arvox Logo Cap — Black',
    price: 35,
    originalPrice: 45,
    category: 'Caps',
    image: 'https://readdy.ai/api/search-image?query=Black%20structured%20baseball%20cap%20with%20minimal%20embroidery%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20accessory%20photography&width=600&height=750&seq=105&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Black%20structured%20baseball%20cap%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20accessory%20photography&width=600&height=750&seq=106&orientation=squarish',
    colors: ['#0D0D0D', '#F5F5F5'],
    colorNames: ['Black', 'Off White'],
    sizes: ['One Size'],
    description: 'A six-panel structured cap with a curved brim and embroidered Arvox wordmark. Made from premium cotton twill with an adjustable leather strap closure. Clean, minimal, built to last.',
    details: ['Premium cotton twill', 'Six-panel structured build', 'Embroidered wordmark', 'Adjustable leather strap', 'Curved brim'],
    isNew: false,
    isBestseller: true,
    isUnder50: true,
  }),
  createMockProduct({
    id: '4',
    name: 'Arvox Essential Tee — White',
    price: 38,
    originalPrice: 52,
    category: 'T-Shirts',
    image: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=600&height=750&seq=107&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography&width=600&height=750&seq=108&orientation=squarish',
    colors: ['#F5F5F5', '#0D0D0D'],
    colorNames: ['Off White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Essential Tee is our everyday staple. A classic crew neck in mid-weight 200gsm cotton with a regular fit that sits clean on the body. Subtle tonal stitching and a garment-washed finish for instant softness.',
    details: ['200gsm garment-washed cotton', 'Regular fit', 'Tonal stitching', 'Pre-shrunk', 'Made in Portugal'],
    isNew: true,
    isBestseller: false,
    isUnder50: true,
  }),
  createMockProduct({
    id: '5',
    name: 'Arvox Cargo Pant — Black',
    price: 68,
    originalPrice: 85,
    category: 'Pants',
    image: 'https://readdy.ai/api/search-image?query=Black%20cargo%20pants%20with%20multiple%20pockets%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20fabric%20texture%20visible&width=600&height=750&seq=109&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Black%20cargo%20pants%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography&width=600&height=750&seq=110&orientation=squarish',
    colors: ['#0D0D0D', '#F5F5F5'],
    colorNames: ['Black', 'Off White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Technical cargo pants built for movement. Constructed from a durable cotton-nylon blend with articulated knees and six utility pockets. Tapered leg with adjustable cuff straps. Water-resistant finish.',
    details: ['Cotton-nylon blend', 'Six utility pockets', 'Articulated knees', 'Adjustable cuff straps', 'Water-resistant finish', 'Tapered fit'],
    isNew: false,
    isBestseller: true,
    isUnder50: false,
  }),
  createMockProduct({
    id: '6',
    name: 'Arvox Zip Hoodie — Off White',
    price: 82,
    originalPrice: 110,
    category: 'Hoodies',
    image: 'https://readdy.ai/api/search-image?query=Off-white%20zip-up%20hoodie%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=600&height=750&seq=111&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Off-white%20zip-up%20hoodie%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography&width=600&height=750&seq=112&orientation=squarish',
    colors: ['#F5F5F5', '#0D0D0D'],
    colorNames: ['Off White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A full-zip hoodie with a clean, minimal aesthetic. Heavyweight 450gsm fleece with a brushed interior. Features YKK hardware, ribbed hem and cuffs, and a streamlined silhouette that layers effortlessly.',
    details: ['450gsm cotton-fleece blend', 'Brushed interior', 'YKK zipper', 'Ribbed hem and cuffs', 'Regular fit', 'Made in Portugal'],
    isNew: true,
    isBestseller: true,
    isUnder50: false,
  }),
  createMockProduct({
    id: '7',
    name: 'Arvox Heavyweight Tee',
    price: 45,
    originalPrice: 60,
    category: 'T-Shirts',
    image: 'https://readdy.ai/api/search-image?query=Dark%20cotton%20t-shirt%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=600&height=750&seq=113&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Dark%20cotton%20t-shirt%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography&width=600&height=750&seq=114&orientation=squarish',
    colors: ['#0D0D0D', '#F5F5F5'],
    colorNames: ['Black', 'Off White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Our heaviest tee at 300gsm. Built like a sweatshirt but cut like a tee. Features a mock-neck collar, boxy cropped fit, and substantial fabric that drapes with structure. For those who want more than a basic.',
    details: ['300gsm heavyweight cotton', 'Mock-neck collar', 'Boxy cropped fit', 'Reinforced seams', 'Made in Portugal'],
    isNew: true,
    isBestseller: false,
    isUnder50: true,
  }),
  createMockProduct({
    id: '8',
    name: 'Arvox Dad Cap',
    price: 32,
    originalPrice: 42,
    category: 'Caps',
    image: 'https://readdy.ai/api/search-image?query=Dark%20unstructured%20dad%20cap%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20accessory%20photography&width=600&height=750&seq=115&orientation=squarish',
    hoverImage: 'https://readdy.ai/api/search-image?query=Dark%20unstructured%20dad%20cap%20front%20view%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20accessory%20photography&width=600&height=750&seq=116&orientation=squarish',
    colors: ['#0D0D0D', '#F5F5F5'],
    colorNames: ['Black', 'Off White'],
    sizes: ['One Size'],
    description: 'An unstructured dad cap with a relaxed, worn-in feel from day one. Soft cotton twill with a low profile and adjustable fabric strap. Minimal embroidered logo.',
    details: ['Soft cotton twill', 'Unstructured low profile', 'Embroidered logo', 'Adjustable fabric strap', 'Curved brim'],
    isNew: true,
    isBestseller: false,
    isUnder50: true,
  }),
];

export const getBestsellers = () => products.filter((p) => p.isBestseller);
export const getNewDrops = () => products.filter((p) => p.isNew);
export const getUnder50 = () => products.filter((p) => p.isUnder50);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getRelatedProducts = (id: string, limit = 4) => {
  const product = getProductById(id);
  if (!product) return [];
  return products
    .filter((p) => p.id !== id && p.category === product.category)
    .slice(0, limit);
};