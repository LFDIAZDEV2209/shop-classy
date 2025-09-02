import { Product } from '../interfaces/product.interface';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'Mixsoon Centella Cleansing Foam',
    price: 89000,
    originalPrice: 95000,
    image: '/product-1.jpg',
    rating: 4.6,
    category: 'Skincare',
    brandCategory: 'diamante',
    status: 'available',
    isTrend: true,
    statusIcon: 'green-diamond',
    size: '150ml',
    sanitaryRegistration: 'NSOC39712-25CO',
    description: 'Limpiador facial en espuma con extracto de centella asiática que ayuda a limpiar suavemente la piel mientras la calma y protege.',
    usageInstructions: 'Aplicar sobre la piel húmeda, masajear suavemente y enjuagar con agua tibia. Usar mañana y noche.',
    recommendedFor: 'Pieles sensibles, con tendencia al acné y que buscan una limpieza suave pero efectiva.',
    ingredients: 'Agua, Glicerina, Extracto de Centella Asiática, Ácido Hialurónico, Niacinamida.',
    warnings: 'Para uso externo únicamente. Evitar contacto con los ojos. En caso de irritación, suspender el uso.'
  },
  {
    id: 2,
    name: 'Haruni Ginseng Essence',
    price: 120000,
    image: '/product-2.jpg',
    rating: 4.8,
    category: 'Skincare',
    brandCategory: 'oro',
    status: 'available',
    isTrend: false,
    statusIcon: 'yellow-circle'
  },
  {
    id: 3,
    name: 'Cosrx Snail 96 Mucin Power Essence',
    price: 95000,
    image: '/product-3.jpg',
    rating: 4.7,
    category: 'Skincare',
    brandCategory: 'esmeralda',
    status: 'available',
    isTrend: true,
    statusIcon: 'green-diamond'
  },
  {
    id: 4,
    name: 'Some By Mi AHA BHA PHA 30 Days Miracle Toner',
    price: 78000,
    image: '/product-4.jpg',
    rating: 4.5,
    category: 'Skincare',
    brandCategory: 'diamante',
    status: 'sold-out',
    isTrend: false,
    statusIcon: 'yellow-circle'
  },
  {
    id: 5,
    name: 'Beauty of Joseon Relief Sun',
    price: 65000,
    image: '/product-1.jpg',
    rating: 4.9,
    category: 'Skincare',
    brandCategory: 'oro',
    status: 'available',
    isTrend: true,
    statusIcon: 'green-diamond'
  },
  {
    id: 6,
    name: 'Innisfree Green Tea Seed Serum',
    price: 110000,
    image: '/product-2.jpg',
    rating: 4.4,
    category: 'Skincare',
    brandCategory: 'esmeralda',
    status: 'available',
    isTrend: false,
    statusIcon: 'yellow-circle'
  }
];

// Funciones helper para filtrar productos
export const getTrendingProducts = (): Product[] => {
  return PRODUCTS_DATA.filter(product => product.isTrend);
};

export const getProductsByBrandCategory = (category: 'diamante' | 'oro' | 'esmeralda'): Product[] => {
  return PRODUCTS_DATA.filter(product => product.brandCategory === category);
};

export const getProductById = (id: number): Product | undefined => {
  return PRODUCTS_DATA.find(product => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return PRODUCTS_DATA;
};