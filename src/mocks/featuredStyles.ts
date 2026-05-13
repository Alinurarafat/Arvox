export interface FeaturedStyle {
  id: string;
  label: string;
  image: string;
  size: 'tall' | 'wide' | 'normal';
}

export const featuredStyles: FeaturedStyle[] = [
  {
    id: 'women-season',
    label: 'Women Season',
    image: 'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20woman%20wearing%20oversized%20streetwear%20hoodie%20and%20biker%20shorts%2C%20dramatic%20studio%20lighting%20with%20dark%20background%2C%20high%20fashion%20editorial%20style%2C%20full%20body%20shot%2C%20confident%20powerful%20pose%2C%20premium%20fashion%20campaign%20aesthetic&width=600&height=900&seq=501&orientation=portrait',
    size: 'tall',
  },
  {
    id: 'bestselling',
    label: 'Bestselling',
    image: 'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20man%20wearing%20black%20premium%20streetwear%20t-shirt%20and%20dark%20jeans%2C%20dramatic%20studio%20lighting%20with%20dark%20background%2C%20high%20fashion%20editorial%20style%2C%20half%20body%20shot%2C%20confident%20pose%2C%20premium%20fashion%20campaign%20aesthetic&width=800&height=500&seq=502&orientation=landscape',
    size: 'wide',
  },
  {
    id: 'men-season',
    label: 'Men Season',
    image: 'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20man%20wearing%20dark%20maroon%20hoodie%20and%20black%20cargo%20pants%2C%20dramatic%20studio%20lighting%20with%20dark%20background%2C%20high%20fashion%20editorial%20style%2C%20half%20body%20shot%2C%20confident%20pose%2C%20premium%20fashion%20campaign%20aesthetic&width=800&height=500&seq=503&orientation=landscape',
    size: 'wide',
  },
];