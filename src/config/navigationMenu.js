export const navigation = {
  categories: [
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on a table with a line drawing on the front of each shirt.',
        },
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirts', id: 'shirts' },
            { name: 'Jeans', id: 'men_jeans' },
            { name: 'Sweaters', id: 'men_sweaters' },
            { name: 'T-Shirts', id: 'men_tshirts' },
            { name: 'Jackets', id: 'men_jackets' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'men_watches' },
            { name: 'Wallets', id: 'men_wallets' },
            { name: 'Bags', id: 'men_bags' },
            { name: 'Sunglasses', id: 'men_sunglasses' },
            { name: 'Hats', id: 'men_hats' },
            { name: 'Belts', id: 'men_belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Alpha', id: 'brand_alpha' },
            { name: 'Omega', id: 'brand_omega' },
            { name: 'Zenith', id: 'brand_zenith' },
            { name: 'Eclipse', id: 'brand_eclipse' },
          ],
        },
      ],
    },
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: 'women_tops' },
            { name: 'Dresses', id: 'women_dresses' },
            { name: 'Jeans', id: 'women_jeans' },
            { name: 'Sweaters', id: 'women_sweaters' },
            { name: 'T-Shirts', id: 'women_tshirts' },
            { name: 'Jackets', id: 'women_jackets' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'women_watches' },
            { name: 'Wallets', id: 'women_wallets' },
            { name: 'Bags', id: 'women_bags' },
            { name: 'Belts', id: 'women_belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Lunar', id: 'brand_lunar' },
            { name: 'Aurora', id: 'brand_aurora' },
            { name: 'Starlight', id: 'brand_starlight' },
            { name: 'Nova', id: 'brand_nova' },
          ],
        },
      ],
    },
    {
      id: 'kids',
      name: 'Kids',
      featured: [
        {
          name: 'Playful Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-03-image-card-01.jpg',
          imageAlt: 'Colorful tees with fun patterns for kids.',
        },
        {
          name: 'Back to School',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-03-image-card-02.jpg',
          imageAlt: 'New collection of school outfits for kids.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'T-Shirts', id: 'kids_tshirts' },
            { name: 'Shorts', id: 'kids_shorts' },
            { name: 'Sweaters', id: 'kids_sweaters' },
            { name: 'Dresses', id: 'kids_dresses' },
            { name: 'Jackets', id: 'kids_jackets' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Hats', id: 'kids_hats' },
            { name: 'Bags', id: 'kids_bags' },
            { name: 'Backpacks', id: 'kids_backpacks' },
            { name: 'Sunglasses', id: 'kids_sunglasses' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Tiny Trend', id: 'brand_tiny_trend' },
            { name: 'Playful Minds', id: 'brand_playful_minds' },
            { name: 'Little Champs', id: 'brand_little_champs' },
            { name: 'Joyful Kids', id: 'brand_joyful_kids' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About Us', href: '/' },
    { name: 'Store Locator', href: '/' },
  ],
};
