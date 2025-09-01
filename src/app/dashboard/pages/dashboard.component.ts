import { Component } from "@angular/core";
import { DashboardBannerComponent } from "../components/dashboard-banner/dashboard-banner.component";
import { ProductsSectionsComponent } from "../components/products-sections/products-sections.component";
import { ChooseusSectionComponent } from "../components/chooseus-section/chooseus-section.component";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DashboardBannerComponent, ProductsSectionsComponent, ChooseusSectionComponent],
})

export class DashboardComponent {
  constructor() { }
}