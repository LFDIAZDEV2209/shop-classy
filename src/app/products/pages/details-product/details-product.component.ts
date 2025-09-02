import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'details-product',
  templateUrl: './details-product.component.html',
  standalone: true,
  imports: [CommonModule]
})

export class DetailsProductComponent {
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del producto de la URL
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', this.productId);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}