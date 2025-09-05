import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/pages/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./products/pages/details-product/details-product.component').then(m => m.DetailsProductComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./products/pages/list-products/list-products.component').then(m => m.ListProductsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
