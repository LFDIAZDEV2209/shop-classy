import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Product } from "../../../interfaces/product.interface";
import { LucideAngularModule, Star, Gem, Crown, Shield } from "lucide-angular";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule, LucideAngularModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: Product;

  // Iconos disponibles
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Crown = Crown;
  readonly Shield = Shield;
  
  onProductClick() {
    console.log('Product clicked:', this.product);
  }
}