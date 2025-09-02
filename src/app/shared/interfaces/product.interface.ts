export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number; // Precio original para mostrar descuento
    category: string;
    rating: number;
    image: string;
    status: 'available' | 'sold-out';
    statusIcon: 'green-diamond' | 'yellow-circle' | 'blue-diamond';
    isTrend: boolean;
    brandCategory: 'diamante' | 'oro' | 'esmeralda';
    size?: string; // Tamaño del producto (ej: "150ml")
    sanitaryRegistration?: string; // Registro sanitario Invima
    description?: string;
    usageInstructions?: string;
    recommendedFor?: string;
    ingredients?: string;
    warnings?: string;
  }