import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

interface Product {
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

@Component({
  selector: 'products-sections',
  templateUrl: './products-sections.component.html',
  imports: [CommonModule],
})

export class ProductsSectionsComponent {
    // Tendencias
    products: Product[] = [
    {
      id: 1,
      name: "Haruni Ginseng Aqua Sun Cream SPF50",
      price: 75000,
      category: "Skincare",
      rating: 4.5,
      image: "product-1.jpg",
      status: "available",
      statusIcon: "green-diamond",
      isTrend: true,
      brandCategory: "diamante"
    },
    {
      id: 2,
      name: "Dr. Althea 345 Relief Cream",
      price: 129000,
      category: "Skincare",
      rating: 4.7,
      image: "product-2.jpg",
      status: "sold-out",
      statusIcon: "yellow-circle",
      isTrend: true,
      brandCategory: "oro"
    },
    {
      id: 3,
      name: "Mixsoon Centella Cleansing Foam",
      price: 89000,
      category: "Skincare",
      rating: 4.6,
      image: "product-3.jpg",
      status: "available",
      statusIcon: "blue-diamond",
      isTrend: true,
      brandCategory: "esmeralda"
    },
    {
      id: 4,
      name: "Tocobo Cica Cooling Sun Stick SPF50+ PA++++",
      price: 85000,
      category: "Maquillaje",
      rating: 4.8,
      image: "product-4.jpg",
      status: "available",
      statusIcon: "green-diamond",
      isTrend: true,
      brandCategory: "diamante"
    },
    // Productos Diamante
    {
      id: 5,
      name: "La Prairie Anti-Aging Eye Cream Complex",
      price: 289000,
      category: "Skincare",
      rating: 4.9,
      image: "product-1.jpg",
      status: "available",
      statusIcon: "blue-diamond",
      isTrend: false,
      brandCategory: "diamante"
    },
    {
      id: 6,
      name: "SK-II Facial Treatment Essence",
      price: 325000,
      category: "Skincare",
      rating: 4.8,
      image: "product-2.jpg",
      status: "available",
      statusIcon: "blue-diamond",
      isTrend: false,
      brandCategory: "diamante"
    },
    {
      id: 7,
      name: "Clé de Peau Beauté The Serum",
      price: 445000,
      category: "Skincare",
      rating: 4.7,
      image: "product-3.jpg",
      status: "available",
      statusIcon: "blue-diamond",
      isTrend: false,
      brandCategory: "diamante"
    },
    {
      id: 8,
      name: "Tom Ford Lip Color Luxe Collection",
      price: 189000,
      category: "Maquillaje",
      rating: 4.6,
      image: "product-4.jpg",
      status: "available",
      statusIcon: "blue-diamond",
      isTrend: false,
      brandCategory: "diamante"
    },
    // Productos Oro
    {
      id: 9,
      name: "Estée Lauder Advanced Night Repair",
      price: 165000,
      category: "Skincare",
      rating: 4.5,
      image: "product-1.jpg",
      status: "available",
      statusIcon: "yellow-circle",
      isTrend: false,
      brandCategory: "oro"
    },
    {
      id: 10,
      name: "Charlotte Tilbury Magic Foundation",
      price: 155000,
      category: "Maquillaje",
      rating: 4.4,
      image: "product-2.jpg",
      status: "available",
      statusIcon: "yellow-circle",
      isTrend: false,
      brandCategory: "oro"
    },
    {
      id: 11,
      name: "Clinique Dramatically Different Moisturizer",
      price: 125000,
      category: "Skincare",
      rating: 4.3,
      image: "product-3.jpg",
      status: "sold-out",
      statusIcon: "yellow-circle",
      isTrend: false,
      brandCategory: "oro"
    },
    {
      id: 12,
      name: "NARS Radiant Creamy Concealer",
      price: 98000,
      category: "Maquillaje",
      rating: 4.2,
      image: "product-4.jpg",
      status: "available",
      statusIcon: "yellow-circle",
      isTrend: false,
      brandCategory: "oro"
    },
    // Productos Esmeralda
    {
      id: 13,
      name: "The Ordinary Hyaluronic Acid 2% + B5",
      price: 45000,
      category: "Skincare",
      rating: 4.1,
      image: "product-1.jpg",
      status: "available",
      statusIcon: "green-diamond",
      isTrend: false,
      brandCategory: "esmeralda"
    },
    {
      id: 14,
      name: "CeraVe Moisturizing Cream",
      price: 55000,
      category: "Skincare",
      rating: 4.0,
      image: "product-2.jpg",
      status: "available",
      statusIcon: "green-diamond",
      isTrend: false,
      brandCategory: "esmeralda"
    },
    {
      id: 15,
      name: "Maybelline Fit Me Foundation",
      price: 35000,
      category: "Maquillaje",
      rating: 3.9,
      image: "product-3.jpg",
      status: "available",
      statusIcon: "green-diamond",
      isTrend: false,
      brandCategory: "esmeralda"
    },
    {
      id: 16,
      name: "e.l.f. Pure Skin Super Serum",
      price: 28000,
      category: "Skincare",
      rating: 3.8,
      image: "product-4.jpg",
      status: "available",
      statusIcon: "green-diamond",
      isTrend: false,
      brandCategory: "esmeralda"
    }
  ];

  // Getters para filtrar productos por categoría
  get trendingProducts(): Product[] {
    return this.products.filter(product => product.isTrend);
  }

  get diamanteProducts(): Product[] {
    return this.products.filter(product => product.brandCategory === 'diamante' && !product.isTrend);
  }

  get oroProducts(): Product[] {
    return this.products.filter(product => product.brandCategory === 'oro' && !product.isTrend);
  }

  get esmeraldaProducts(): Product[] {
    return this.products.filter(product => product.brandCategory === 'esmeralda' && !product.isTrend);
  }

  onViewAll(section: string) {
    console.log(`Ver todo clicked for section: ${section}`);
  }

  onProductClick(product: Product) {
    console.log('Product clicked:', product);
  }
}
