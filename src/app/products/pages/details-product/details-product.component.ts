import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, computed } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ImagesLayoutComponent } from "../../components/details-product/images-layout/images-layout.component";
import { DetailsComponent } from "../../components/details-product/details/details.component";
import { LucideAngularModule, ChevronLeft } from "lucide-angular";
import { Product } from "../../../shared/interfaces/product.interface";
import { ProductsService } from "../../services/product.service";

@Component({
  selector: 'details-product',
  templateUrl: './details-product.component.html',
  standalone: true,
  imports: [CommonModule, ImagesLayoutComponent, DetailsComponent, LucideAngularModule]
})

export class DetailsProductComponent implements OnInit {
  readonly productId = signal<string | null>(null);
  readonly ChevronLeft = ChevronLeft;
  
  // Signal para el producto actual
  readonly currentProduct = signal<Product | null>(null);
  readonly isLoading = signal(true);
  
  // Computed para las imágenes del producto
  readonly productImages = computed(() => {
    const product = this.currentProduct();
    if (!product) return [];
    
    // Si el producto tiene múltiples imágenes, usarlas
    // Si no, usar la imagen principal repetida
    return [product.image, product.image, product.image, product.image];
  });
  
  // Computed para el nombre del producto
  readonly productName = computed(() => {
    const product = this.currentProduct();
    return product?.name || 'Producto no encontrado';
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  async ngOnInit() {
    // Obtener el ID del producto de la URL
    const id = this.route.snapshot.paramMap.get('id');
    this.productId.set(id);
    
    // Cargar el producto usando el servicio
    await this.loadProduct(id);
  }

  private async loadProduct(id: string | null) {
    if (!id) {
      this.isLoading.set(false);
      return;
    }
    
    try {
      this.isLoading.set(true);
      
      // Simular llamada asíncrona al servicio
      const product = await this.productsService.getProductByIdAsync(Number(id));
      this.currentProduct.set(product || null);
      
    } catch (error) {
      console.error('Error loading product:', error);
      this.currentProduct.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}