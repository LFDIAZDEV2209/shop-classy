import { Component } from "@angular/core";

@Component({
  selector: 'dashboard-banner',
  templateUrl: './dashboard-banner.component.html',
})

export class DashboardBannerComponent {
    products = [
        {
          name: 'Premium Facial Care Collection',
          position: 'top-left',
          rotation: 'rotate-6'
        },
        {
          name: 'Gentle Cleanser',
          position: 'bottom-left',
          rotation: '-rotate-3'
        },
        {
          name: 'Anti-aging Night Cream',
          position: 'middle-right',
          rotation: 'rotate-4'
        },
        {
          name: 'Hydrating Serum',
          position: 'top-right',
          rotation: '-rotate-5'
        },
        {
          name: 'Vitamin C Brightening Mask',
          position: 'bottom-right',
          rotation: 'rotate-3'
        }
      ];
    
      onViewProducts() {
        // Navegar a la página de productos
        console.log('Ver productos clicked');
      }
}