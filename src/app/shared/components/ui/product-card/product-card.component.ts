import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Product } from "../../../interfaces/product.interface";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: Product;

  onProductClick() {
    console.log('Product clicked:', this.product);
  }
}