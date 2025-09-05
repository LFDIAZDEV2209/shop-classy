import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "../../../shared/components/ui/product-card/product-card.component";
import { LucideAngularModule, Shield, Crown, Gem, Star } from "lucide-angular";
import { Product } from "../../../shared/interfaces/product.interface";
import { ProductsService } from "../../../products/services/product.service";
import { TrackByFunction } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'products-sections',
  templateUrl: './products-sections.component.html',
  imports: [CommonModule, ProductCardComponent, LucideAngularModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSectionsComponent {
  
  constructor(private productsService: ProductsService, private router: Router) {}
  
  // Iconos disponibles
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Crown = Crown;
  readonly Shield = Shield;
  
  // TrackBy function para optimización
  readonly trackByProductId: TrackByFunction<Product> = (_, product) => product.id;
  
  // Usar los computed del servicio
  readonly trendingProducts = computed(() => this.productsService.trendingProducts());
  readonly diamanteProducts = computed(() => this.productsService.diamanteProducts());
  readonly oroProducts = computed(() => this.productsService.oroProducts());
  readonly esmeraldaProducts = computed(() => this.productsService.esmeraldaProducts());

  onViewAll(section: string) {

    const brandCategoryMap: { [key: string]: string } = {
      tendencias: 'all',
      diamante: 'diamante',
      oro: 'oro',
      esmeralda: 'esmeralda'
    }

    const brandCategory = brandCategoryMap[section] || 'all';

    this.router.navigate(['/products'], { queryParams: { brandCategory: brandCategory } });
  }
}