import { Component } from "@angular/core";
import { DashboardBannerComponent } from "../components/dashboard-banner/dashboard-banner.component";
import { ProductsSectionsComponent } from "../components/products-sections/products-sections.component";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DashboardBannerComponent, ProductsSectionsComponent],
})

export class DashboardComponent {
  constructor() { }
}