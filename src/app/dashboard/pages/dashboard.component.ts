import { Component } from "@angular/core";
import { DashboardBannerComponent } from "../components/dashboard-banner/dashboard-banner.component";
import { ProductsSectionsComponent } from "../components/products-sections/products-sections.component";
import { ChooseusSectionComponent } from "../components/chooseus-section/chooseus-section.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DashboardBannerComponent, ProductsSectionsComponent, ChooseusSectionComponent, CommonModule],
  standalone: true
})

export class DashboardComponent {
  constructor() { }
}