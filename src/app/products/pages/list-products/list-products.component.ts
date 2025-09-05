// src/app/products/pages/list-products/list-products.component.ts
import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterProductsComponent, FilterState } from "../../components/list-products/filter-products/filter-products.component";
import { AppProductsComponent } from "../../components/list-products/app-products/app-products.component";
import { ProductsService } from "../../services/product.service";
import { Product } from "../../../shared/interfaces/product.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { LucideAngularModule, ArrowLeft } from "lucide-angular";

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  standalone: true,
  imports: [CommonModule, FilterProductsComponent, AppProductsComponent, LucideAngularModule]
})
export class ListProductsComponent {
  readonly ArrowLeft = ArrowLeft;
  // Signals para el estado
  readonly isLoading = signal(false);
  readonly currentFilters = signal<FilterState>({
    category: 'all',
    brandCategory: 'all',
    price: 'all',
    sortBy: 'most-sold'
  });
  
  // Computed para productos filtrados
  readonly filteredProducts = computed(() => {
    const filters = this.currentFilters();
    let products = this.productsService.getAllProducts();
    
    // Aplicar filtros
    if (filters.category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === filters.category);
    }
    
    // Aplicar filtro de categoría de marca
    if (filters.brandCategory !== 'all') {
      products = products.filter(p => p.brandCategory === filters.brandCategory);
    }
    
    if (filters.price !== 'all') {
      products = products.filter(p => this.isInPriceRange(p.price, filters.price));
    }
    
    // Aplicar ordenamiento
    products = this.sortProducts(products, filters.sortBy);
    
    return products;
  });
  
  // Computed para contadores
  readonly totalProducts = computed(() => this.productsService.getAllProducts().length);
  readonly showingProducts = computed(() => this.filteredProducts().length);
  
  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const brandCategory = params['brandCategory'];

      this.currentFilters.set({
        ...this.currentFilters(),
        brandCategory: brandCategory || 'all'
      });
    });
  }
  
  // Método para manejar cambios de filtros
  onFilterChange(filters: FilterState) {
    this.currentFilters.set(filters);
  }
  
  // Método para verificar rango de precios
  private isInPriceRange(price: number, range: string): boolean {
    switch (range) {
      case '0-50000':
        return price >= 0 && price <= 50000;
      case '50000-100000':
        return price > 50000 && price <= 100000;
      case '100000-200000':
        return price > 100000 && price <= 200000;
      case '200000+':
        return price > 200000;
      default:
        return true;
    }
  }
  
  // Método para ordenar productos
  private sortProducts(products: Product[], sortBy: string): Product[] {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...products].sort((a, b) => b.id - a.id);
      case 'most-sold':
      default:
        return [...products].sort((a, b) => (b.isTrend ? 1 : 0) - (a.isTrend ? 1 : 0));
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}