import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const colorHexMap: Record<string, string> = {
  black: '#0D0D0D',
  white: '#FFFFFF',
  'off white': '#F5F5F5',
  offwhite: '#F5F5F5',
  red: '#DC2626',
  blue: '#2563EB',
  navy: '#1E3A5F',
  green: '#16A34A',
  gray: '#9CA3AF',
  grey: '#9CA3AF',
  brown: '#8B5A2B',
  beige: '#E8DCC4',
  olive: '#6B7C3E',
  yellow: '#FACC15',
  orange: '#F97316',
  pink: '#EC4899',
  purple: '#7C3AED',
  cream: '#FFFDD0',
  sand: '#C2B280',
  charcoal: '#36454F',
  tan: '#D2B48C',
  khaki: '#C3B091',
  maroon: '#800000',
  burgundy: '#800020',
  teal: '#008080',
  mint: '#98FF98',
  coral: '#FF7F50',
  lavender: '#E6E6FA',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  'heather grey': '#B0B0B0',
  'dark grey': '#555555',
  'light grey': '#D3D3D3',
};

function getColorHex(name: string): string {
  const normalized = name.toLowerCase().trim();
  return colorHexMap[normalized] || '#9CA3AF';
}

function getNumericId(shopifyId: string): string {
  return shopifyId.replace(/^gid:\/\/shopify\/Product\//, '');
}

function parsePrice(amount: string | null | undefined): number {
  if (!amount) return 0;
  return parseFloat(amount);
}

function extractColors(variants: any[]): { names: string[]; hexes: string[] } {
  const colorValues = new Set<string>();
  for (const v of variants) {
    for (const opt of v.selectedOptions || []) {
      if (opt.name && opt.name.toLowerCase().includes('color')) {
        colorValues.add(opt.value);
      }
    }
  }
  const names = Array.from(colorValues);
  const hexes = names.map((name) => getColorHex(name));
  return { names, hexes };
}

function extractSizes(variants: any[]): string[] {
  const sizeValues = new Set<string>();
  for (const v of variants) {
    for (const opt of v.selectedOptions || []) {
      if (opt.name && opt.name.toLowerCase().includes('size')) {
        sizeValues.add(opt.value);
      }
    }
  }
  return Array.from(sizeValues);
}

function normalizeProduct(node: any, _fullImages = false): any {
  const shopifyId = node.id;
  const numericId = getNumericId(shopifyId);
  const variants = (node.variants?.edges || []).map((e: any) => e.node);
  const images = (node.images?.edges || []).map((e: any) => e.node.url);
  const featuredImage = node.featuredImage?.url || images[0] || '';

  const { names: colorNames, hexes: colors } = extractColors(variants);
  const sizes = extractSizes(variants);

  const price = variants[0]?.price?.amount ? parsePrice(variants[0].price.amount) : 0;
  const compareAtPrice = variants[0]?.compareAtPrice?.amount ? parsePrice(variants[0].compareAtPrice.amount) : price;

  const createdAt = node.createdAt ? new Date(node.createdAt) : new Date();
  const isNew = (Date.now() - createdAt.getTime()) < 60 * 24 * 60 * 60 * 1000;
  const tags = node.tags || [];

  const description = node.description || '';
  const details = description
    .split('\n')
    .map((l: string) => l.trim())
    .filter((l: string) => l.startsWith('-') || l.startsWith('*'))
    .map((l: string) => l.replace(/^[-*]\s*/, ''));

  return {
    id: numericId,
    shopifyId,
    name: node.title || '',
    price,
    originalPrice: compareAtPrice > price ? compareAtPrice : price,
    category: node.productType || 'Other',
    productType: node.productType || 'Other',
    image: featuredImage,
    hoverImage: images[1],
    images,
    colors,
    colorNames,
    sizes: sizes.length > 0 ? sizes : ['One Size'],
    description,
    details,
    isNew: isNew || tags.includes('new'),
    isBestseller: tags.includes('bestseller'),
    isUnder50: price < 50,
    variants: variants.map((v: any) => ({
      id: v.id,
      title: v.title,
      price: parsePrice(v.price?.amount),
      compareAtPrice: v.compareAtPrice?.amount ? parsePrice(v.compareAtPrice.amount) : undefined,
      availableForSale: v.availableForSale ?? true,
      selectedOptions: v.selectedOptions || [],
    })),
    tags,
    descriptionHtml: node.descriptionHtml || `<p>${description}</p>`,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const shopifyDomain = Deno.env.get('ShopifyDomain');
    const storefrontToken = Deno.env.get('StorefrontAccessToken');

    if (!shopifyDomain || !storefrontToken) {
      return new Response(JSON.stringify({ error: 'Shopify not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ());
    const { productId, limit = 50 } = body;

    let query: string;
    let variables: Record<string, any> = {};

    if (productId) {
      const gid = productId.startsWith('gid://') ? productId : `gid://shopify/Product/${productId}`;
      query = `
        query GetProduct($id: ID!) {
          product(id: $id) {
            id
            title
            description
            descriptionHtml
            productType
            tags
            createdAt
            featuredImage {
              url
            }
            images(first: 20) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `;
      variables = { id: gid };
    } else {
      query = `
        query GetProducts($first: Int!) {
          products(first: $first) {
            edges {
              node {
                id
                title
                description
                descriptionHtml
                productType
                tags
                createdAt
                featuredImage {
                  url
                }
                images(first: 5) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                variants(first: 20) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                      }
                      compareAtPrice {
                        amount
                      }
                      availableForSale
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      variables = { first: Math.min(limit, 50) };
    }

    const res = await fetch(`https://${shopifyDomain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      return new Response(JSON.stringify({ error: json.errors[0].message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (productId) {
      const node = json.data?.product;
      if (!node) {
        return new Response(JSON.stringify({ error: 'Product not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ product: normalizeProduct(node, true) }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      const edges = json.data?.products?.edges || [];
      const products = edges.map((e: any) => normalizeProduct(e.node));
      return new Response(JSON.stringify({ products }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
