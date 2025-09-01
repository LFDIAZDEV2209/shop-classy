import { Component } from "@angular/core";
import { DashboardBannerComponent } from "../components/dashboard-banner/dashboard-banner.component";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DashboardBannerComponent],
})

export class DashboardComponent {
  constructor() { }
}