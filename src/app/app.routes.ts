import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard.component';
import { DetailsProductComponent } from './products/pages/details-product/details-product.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products/:id',
    component: DetailsProductComponent
  }
];
