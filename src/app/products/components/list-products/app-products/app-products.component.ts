// src/app/products/components/list-products/app-products/app-products.component.ts
import { Component, input, output, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Product } from "../../../../shared/interfaces/product.interface";
import { ProductsService } from "../../../services/product.service";
import { ProductCardComponent } from "../../../../shared/components/ui/product-card/product-card.component";

@Component({
  selector: 'app-products-component',
  templateUrl: './app-products.component.html',
  standalone: true,
  imports: [CommonModule, ProductCardComponent] // Agregar ProductCardComponent
})
export class AppProductsComponent {
  
  // Inputs
  readonly products = input<Product[]>([]);
  readonly isLoading = input<boolean>(false);
  
  // Outputs
  readonly productClick = output<Product>();
  
  // Signals para estado interno
  readonly selectedProduct = signal<Product | null>(null);
  
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  
  // Computed para productos filtrados
  readonly filteredProducts = computed(() => {
    return this.products();
  });
  
  // Método para manejar click en producto
  onProductClick(product: Product) {
    this.selectedProduct.set(product);
    this.productClick.emit(product);
    this.router.navigate(['/products', product.id]);
  }
}