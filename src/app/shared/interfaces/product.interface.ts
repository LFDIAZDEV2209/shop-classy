export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    image: string;
    status: 'available' | 'sold-out';
    statusIcon: 'green-diamond' | 'yellow-circle' | 'blue-diamond';
    isTrend: boolean;
    brandCategory: 'diamante' | 'oro' | 'esmeralda';
  }