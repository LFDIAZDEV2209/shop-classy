import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ImagesLayoutComponent } from "../../components/details-product/images-layout/images-layout.component";

@Component({
  selector: 'details-product',
  templateUrl: './details-product.component.html',
  standalone: true,
  imports: [CommonModule, ImagesLayoutComponent]
})

export class DetailsProductComponent implements OnInit {
  readonly productId = signal<string | null>(null);
  
  // Datos de ejemplo para las imágenes
  readonly productImages = signal<string[]>([
    '/product-1.jpg',
    '/product-2.jpg', 
    '/product-3.jpg',
    '/product-4.jpg'
  ]);
  
  readonly productName = signal<string>('Mixsoon Centella Cleansing Foam');

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del producto de la URL
    this.productId.set(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', this.productId);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}