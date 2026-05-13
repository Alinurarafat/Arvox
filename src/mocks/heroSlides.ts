export interface HeroSlide {
  id: number;
  image: string;
  line1: string;
  line2: string;
  line3: string;
  subtext: string;
  cta: string;
  featuredProduct: {
    name: string;
    price: number;
    image: string;
    href: string;
  };
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://readdy.ai/api/search-image?query=Editorial%20streetwear%20fashion%20photography%20with%20young%20male%20model%20wearing%20dark%20maroon%20oversized%20hoodie%20and%20black%20cargo%20pants%2C%20urban%20rooftop%20setting%20at%20golden%20hour%2C%20moody%20atmospheric%20lighting%2C%20cinematic%20style%2C%20high%20contrast%2C%20premium%20fashion%20campaign%20aesthetic%2C%20full%20body%20shot%2C%20confident%20pose%2C%20dramatic%20sky%20background%20with%20deep%20shadows%20and%20warm%20highlights%2C%20monochrome%20dominant%20with%20subtle%20earth%20tones%2C%20clean%20composition%20with%20negative%20space%20on%20one%20side%2C%20high-end%20magazine%20cover%20quality&width=1600&height=900&seq=hero-301&orientation=landscape',
    line1: 'New',
    line2: 'Collection',
    line3: 'Spring / Summer 2026',
    subtext: 'A range of styles from classic pieces to next gen wear for the culture. Limited quantities. No restocks.',
    cta: 'Explore Collection',
    featuredProduct: {
      name: 'Oversized Hoodie',
      price: 78,
      image: 'https://readdy.ai/api/search-image?query=Dark%20oversized%20hoodie%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible%2C%20clean%20simple%20neutral%20background&width=400&height=500&seq=hero-feat-1&orientation=portrait',
      href: '/product/2',
    },
  },
  {
    id: 2,
    image: 'https://readdy.ai/api/search-image?query=Editorial%20streetwear%20fashion%20photography%20with%20young%20female%20model%20wearing%20black%20graphic%20tee%20and%20white%20sneakers%2C%20urban%20concrete%20background%20with%20dramatic%20shadows%2C%20moody%20atmospheric%20lighting%2C%20cinematic%20style%2C%20high%20contrast%2C%20premium%20fashion%20campaign%20aesthetic%2C%20full%20body%20shot%2C%20confident%20powerful%20stance%2C%20deep%20blacks%20and%20subtle%20warm%20skin%20tones%2C%20clean%20minimalist%20composition%20with%20negative%20space%2C%20magazine%20editorial%20quality%20photography&width=1600&height=900&seq=hero-302&orientation=landscape',
    line1: 'Limited',
    line2: 'Drop',
    line3: 'Exclusive Release 02',
    subtext: 'Fresh cuts. New silhouettes. Built different for the next generation. Once they are gone, they are gone.',
    cta: 'Products',
    featuredProduct: {
      name: 'Core Tee — Black',
      price: 42,
      image: 'https://readdy.ai/api/search-image?query=Premium%20black%20cotton%20t-shirt%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible%2C%20clean%20simple%20neutral%20background&width=400&height=500&seq=hero-feat-2&orientation=portrait',
      href: '/product/1',
    },
  },
];