import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard.component';
import { DetailsProductComponent } from './products/pages/details-product/details-product.component';
import { ListProductsComponent } from './products/pages/list-products/list-products.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products/:id',
    component: DetailsProductComponent
  },
  {
    path: 'products',
    component: ListProductsComponent
  }
];
