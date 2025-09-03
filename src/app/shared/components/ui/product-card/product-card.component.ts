import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Product } from "../../../interfaces/product.interface";
import { LucideAngularModule, Star, Gem, Crown, Shield } from "lucide-angular";
import { Router } from "@angular/router";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule, LucideAngularModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  constructor(private router: Router) {}
  @Input() product!: Product;

  // Iconos disponibles
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Crown = Crown;
  readonly Shield = Shield;
  
  onProductClick() {
    this.router.navigate(['/products', this.product.id]);
  }

  // En product-card.component.ts, agregar este método:
  getDiscountPercentage(): number {
    if (!this.product.originalPrice || this.product.originalPrice <= this.product.price) return 0;
    return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
  }
}