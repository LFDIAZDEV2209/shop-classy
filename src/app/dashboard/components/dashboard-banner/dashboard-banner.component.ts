import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'dashboard-banner',
  templateUrl: './dashboard-banner.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardBannerComponent {
  constructor(private router: Router) {}
      onViewProducts() {
    // Navegar a la página de productos
    this.router.navigate(['/products']);
  }
}