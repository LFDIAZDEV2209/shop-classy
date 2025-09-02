import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { 
  PRODUCTS_DATA, 
  getTrendingProducts, 
  getProductsByBrandCategory, 
  getProductById,
  getAllProducts 
} from '../../shared/data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Signal para todos los productos
  private readonly productsSignal = signal<Product[]>(PRODUCTS_DATA);
  
  // Computed para productos en tendencia
  readonly trendingProducts = computed(() => 
    this.productsSignal().filter(product => product.isTrend)
  );
  
  // Computed para productos por categoría de marca
  readonly diamanteProducts = computed(() => 
    this.productsSignal().filter(product => product.brandCategory === 'diamante')
  );
  
  readonly oroProducts = computed(() => 
    this.productsSignal().filter(product => product.brandCategory === 'oro')
  );
  
  readonly esmeraldaProducts = computed(() => 
    this.productsSignal().filter(product => product.brandCategory === 'esmeralda')
  );
  
  // Métodos para obtener productos
  getProductById(id: number): Product | undefined {
    return getProductById(id);
  }
  
  getAllProducts(): Product[] {
    return getAllProducts();
  }
  
  getTrendingProducts(): Product[] {
    return getTrendingProducts();
  }
  
  getProductsByBrandCategory(category: 'diamante' | 'oro' | 'esmeralda'): Product[] {
    return getProductsByBrandCategory(category);
  }
  
  // Método para simular búsqueda con delay (como una API real)
  async getProductByIdAsync(id: number): Promise<Product | undefined> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    return getProductById(id);
  }
  
  // Método para simular actualización de productos
  updateProducts(newProducts: Product[]): void {
    this.productsSignal.set(newProducts);
  }
}