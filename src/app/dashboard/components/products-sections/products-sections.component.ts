import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'products-sections',
  templateUrl: './products-sections.component.html',
  imports: [CommonModule],
})

export class ProductsSectionsComponent {
  trendingProducts = [
    {
      id: 1,
      name: "Haruni Ginseng Aqua Sun Cream SPF50",
      price: 75000,
      category: "Skincare",
      rating: 4.5,
      image: "product-1.jpg",
      status: "available",
      statusIcon: "green-diamond"
    },
    {
      id: 2,
      name: "Dr. Althea 345 Relief Cream",
      price: 129000,
      category: "Skincare",
      rating: 4.7,
      image: "product-2.jpg",
      status: "sold-out",
      statusIcon: "yellow-circle"
    },
    {
      id: 3,
      name: "Mixsoon Centella Cleansing Foam",
      price: 89000,
      category: "Skincare",
      rating: 4.6,
      image: "product-3.jpg",
      status: "available",
      statusIcon: "blue-diamond"
    },
    {
      id: 4,
      name: "Tocobo Cica Cooling Sun Stick SPF50+ PA++++",
      price: 85000,
      category: "Maquillaje",
      rating: 4.8,
      image: "product-4.jpg",
      status: "available",
      statusIcon: "green-diamond"
    }
  ];

  onViewAll() {
    console.log('Ver todo clicked');
  }

  onProductClick(product: any) {
    console.log('Product clicked:', product);
  }
}
