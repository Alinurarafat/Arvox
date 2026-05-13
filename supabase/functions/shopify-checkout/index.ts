import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: items.map((item: any) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        })),
      },
    };

    const res = await fetch(`https://${shopifyDomain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    const userErrors = json.data?.cartCreate?.userErrors || [];
    if (userErrors.length > 0) {
      return new Response(JSON.stringify({ error: userErrors[0].message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl;
    if (!checkoutUrl) {
      return new Response(JSON.stringify({ error: 'Failed to create checkout' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Rewrite custom domain to myshopify.com to avoid Vercel catching the checkout route
    const fixedUrl = checkoutUrl.replace('https://arvox.space', 'https://arvox-space.myshopify.com');

    return new Response(JSON.stringify({ checkoutUrl: fixedUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
