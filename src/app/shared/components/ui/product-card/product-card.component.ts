import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from "@angular/core";
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
export class ProductCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef;
  
  constructor(private router: Router) {}
  @Input() product!: Product;

  // Iconos disponibles
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Crown = Crown;
  readonly Shield = Shield;

  // Signals para lazy loading
  readonly isImageLoaded = signal(false);
  readonly isImageInView = signal(false);
  readonly hasImageError = signal(false);

  private observer?: IntersectionObserver;
  
  onProductClick() {
    this.router.navigate(['/products', this.product.id]);
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (!this.imageContainer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isImageInView.set(true);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar cuando esté a 50px de entrar en viewport
        threshold: 0.1
      }
    );

    this.observer.observe(this.imageContainer.nativeElement);
  }

  onImageLoad() {
    this.isImageLoaded.set(true);
  }

  onImageError() {
    this.hasImageError.set(true);
  }

  getDiscountPercentage(): number {
    if (!this.product.originalPrice || this.product.originalPrice <= this.product.price) return 0;
    return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
  }
}