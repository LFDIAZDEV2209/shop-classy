import { Component, signal, computed, input, ChangeDetectionStrategy } from "@angular/core";
import { ProductsService } from "../../../services/product.service";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Shield, Crown, Gem, FileText, Truck, RotateCcw, Heart, ChevronDown, Star } from "lucide-angular";
import { Product } from "../../../../shared/interfaces/product.interface";

@Component({
  selector: 'details-component',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Versión optimizada - Enfoque híbrido
export class DetailsComponent {
  // Input signal para recibir el producto desde el componente padre
  readonly product = input<Product | null>(null);
  
  // Signals para estado interno
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  
  // Iconos de Lucide Angular
  readonly Shield = Shield;
  readonly Crown = Crown;
  readonly Gem = Gem;
  readonly FileText = FileText;
  readonly Truck = Truck;
  readonly RotateCcw = RotateCcw;
  readonly Heart = Heart;
  readonly ChevronDown = ChevronDown;
  readonly Star = Star;
  
  // Computed principal que obtiene el producto una sola vez
  private readonly currentProduct = computed(() => this.product());

  // Computed properties optimizadas - solo recalcula cuando cambia el producto
  readonly productName = computed(() => {
    const product = this.currentProduct();
    return product?.name || 'Producto no disponible';
  });
  
  readonly productPrice = computed(() => {
    const product = this.currentProduct();
    return product?.price ? product.price.toLocaleString() : '0';
  });
  
  readonly productRating = computed(() => {
    const product = this.currentProduct();
    return product?.rating || 0;
  });
  
  readonly productCategory = computed(() => {
    const product = this.currentProduct();
    return product?.category || 'Sin categoría';
  });
  
  readonly productStatus = computed(() => {
    const product = this.currentProduct();
    return product?.status || 'unknown';
  });
  
  readonly isProductAvailable = computed(() => {
    return this.productStatus() === 'available';
  });
  
  readonly productBrandCategory = computed(() => {
    const product = this.currentProduct();
    return product?.brandCategory || 'diamante';
  });
  
  readonly isTrending = computed(() => {
    const product = this.currentProduct();
    return product?.isTrend || false;
  });

  // Computed para datos de precios (relacionados)
  readonly pricingData = computed(() => {
    const product = this.currentProduct();
    const originalPrice = product?.originalPrice;
    const currentPrice = product?.price;
    
    return {
      originalPrice: originalPrice ? originalPrice.toLocaleString() : null,
      hasDiscount: originalPrice && originalPrice > (currentPrice || 0),
      discountPercentage: originalPrice && originalPrice > (currentPrice || 0)  
        ? Math.round(((originalPrice - currentPrice!) / originalPrice) * 100) 
        : 0
    };
  });

  // Computed para información adicional del producto
  readonly productInfo = computed(() => {
    const product = this.currentProduct();
    return {
      size: product?.size || 'N/A',
      sanitaryRegistration: product?.sanitaryRegistration || 'N/A'
    };
  });

  // Computed para contenido de acordeones (se usa menos frecuentemente)
  readonly accordionContent = computed(() => {
    const product = this.currentProduct();
    return {
      description: product?.description || 'Descripción no disponible',
      usageInstructions: product?.usageInstructions || 'Instrucciones no disponibles',
      recommendedFor: product?.recommendedFor || 'Información no disponible',
      ingredients: product?.ingredients || 'Ingredientes no disponibles',
      warnings: product?.warnings || 'Advertencias no disponibles'
    };
  });

  // Computed para obtener el icono de categoría de marca
  readonly brandCategoryIcon = computed(() => {
    const brandCategory = this.productBrandCategory();
    switch (brandCategory) {
      case 'diamante':
        return this.Gem;
      case 'oro':
        return this.Crown;
      case 'esmeralda':
        return this.Shield;
      default:
        return this.Gem; // Por defecto diamante
    }
  });

  // Computed para obtener el color de la categoría de marca
  readonly brandCategoryColor = computed(() => {
    const brandCategory = this.productBrandCategory();
    switch (brandCategory) {
      case 'diamante':
        return 'text-blue-600';
      case 'oro':
        return 'text-yellow-600';
      case 'esmeralda':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  });

  // Signals para estado interno
  readonly quantity = signal(1);
  readonly isFavorite = signal(false);
  // Cambio: Ahora solo guardamos el acordeón abierto actual (string | null)
  readonly openAccordion = signal<string | null>(null);

  constructor(private productsService: ProductsService) {}

  // Métodos para manejar la cantidad
  increaseQuantity() {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  // Método para toggle de favoritos
  toggleFavorite() {
    this.isFavorite.update(fav => !fav);
  }

  // Método para toggle de acordeones - Solo uno a la vez
  toggleAccordion(section: string) {
    this.openAccordion.update(current => {
      // Si el acordeón actual está abierto, lo cerramos
      if (current === section) {
        return null;
      }
      // Si no, abrimos el nuevo acordeón (cierra el anterior automáticamente)
      return section;
    });
  }

  // Método para verificar si un acordeón está abierto
  isAccordionOpen(section: string): boolean {
    return this.openAccordion() === section;
  }
}