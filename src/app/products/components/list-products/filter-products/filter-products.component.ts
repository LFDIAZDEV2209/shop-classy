// src/app/products/components/list-products/filter-products/filter-products.component.ts
import { Component, input, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, ChevronDown, Gem, Crown, Shield } from "lucide-angular";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterState {
  category: string;
  brandCategory: string; // Cambiar de 'level' a 'brandCategory'
  price: string;
  sortBy: string;
}

@Component({
  selector: 'filter-products-component',
  templateUrl: './filter-products.component.html',
  standalone: true,
  imports: [CommonModule, LucideAngularModule]
})
export class FilterProductsComponent {
  readonly ChevronDown = ChevronDown;
  readonly Gem = Gem;
  readonly Crown = Crown;
  readonly Shield = Shield;
  
  // Inputs
  readonly totalProducts = input<number>(0);
  readonly showingProducts = input<number>(0);
  
  // Outputs
  readonly filterChange = output<FilterState>();
  
  // Signals para el estado de los filtros
  readonly selectedCategory = signal('all');
  readonly selectedBrandCategory = signal('all'); // Cambiar de 'selectedLevel' a 'selectedBrandCategory'
  readonly selectedPrice = signal('all');
  readonly selectedSort = signal('most-sold');
  readonly isCategoryOpen = signal(false);
  readonly isBrandCategoryOpen = signal(false); // Cambiar de 'isLevelOpen' a 'isBrandCategoryOpen'
  readonly isPriceOpen = signal(false);
  readonly isSortOpen = signal(false);
  
  // Opciones de filtros
  readonly categoryOptions: FilterOption[] = [
    { value: 'all', label: 'Todas' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'makeup', label: 'Maquillaje' },
    { value: 'hair', label: 'Cabello' },
    { value: 'body', label: 'Cuerpo' }
  ];
  
  // Cambiar las opciones de nivel por categorías de marca
  readonly brandCategoryOptions: FilterOption[] = [
    { value: 'all', label: 'Todas las marcas' },
    { value: 'diamante', label: 'Diamante' },
    { value: 'oro', label: 'Oro' },
    { value: 'esmeralda', label: 'Esmeralda' }
  ];
  
  readonly priceOptions: FilterOption[] = [
    { value: 'all', label: 'Todos' },
    { value: '0-50000', label: '$0 - $50.000' },
    { value: '50000-100000', label: '$50.000 - $100.000' },
    { value: '100000-200000', label: '$100.000 - $200.000' },
    { value: '200000+', label: '$200.000+' }
  ];
  
  readonly sortOptions: FilterOption[] = [
    { value: 'most-sold', label: 'Más vendidos' },
    { value: 'price-low', label: 'Precio: menor a mayor' },
    { value: 'price-high', label: 'Precio: mayor a menor' },
    { value: 'rating', label: 'Mejor calificados' },
    { value: 'newest', label: 'Más recientes' }
  ];
  
  // Métodos para toggle de dropdowns
  toggleCategory() {
    this.isCategoryOpen.update(open => !open);
    this.isBrandCategoryOpen.set(false);
    this.isPriceOpen.set(false);
    this.isSortOpen.set(false);
  }
  
  toggleBrandCategory() { // Cambiar de 'toggleLevel' a 'toggleBrandCategory'
    this.isBrandCategoryOpen.update(open => !open);
    this.isCategoryOpen.set(false);
    this.isPriceOpen.set(false);
    this.isSortOpen.set(false);
  }
  
  togglePrice() {
    this.isPriceOpen.update(open => !open);
    this.isCategoryOpen.set(false);
    this.isBrandCategoryOpen.set(false);
    this.isSortOpen.set(false);
  }
  
  toggleSort() {
    this.isSortOpen.update(open => !open);
    this.isCategoryOpen.set(false);
    this.isBrandCategoryOpen.set(false);
    this.isPriceOpen.set(false);
  }
  
  // Métodos para seleccionar opciones
  selectCategory(option: FilterOption) {
    this.selectedCategory.set(option.value);
    this.isCategoryOpen.set(false);
    this.emitFilterChange();
  }
  
  selectBrandCategory(option: FilterOption) { // Cambiar de 'selectLevel' a 'selectBrandCategory'
    this.selectedBrandCategory.set(option.value);
    this.isBrandCategoryOpen.set(false);
    this.emitFilterChange();
  }
  
  selectPrice(option: FilterOption) {
    this.selectedPrice.set(option.value);
    this.isPriceOpen.set(false);
    this.emitFilterChange();
  }
  
  selectSort(option: FilterOption) {
    this.selectedSort.set(option.value);
    this.isSortOpen.set(false);
    this.emitFilterChange();
  }
  
  // Método para obtener la etiqueta seleccionada
  getSelectedLabel(options: FilterOption[], selectedValue: string): string {
    return options.find(option => option.value === selectedValue)?.label || 'Todos';
  }
  
  // Método para emitir cambios
  private emitFilterChange() {
    this.filterChange.emit({
      category: this.selectedCategory(),
      brandCategory: this.selectedBrandCategory(), // Cambiar de 'level' a 'brandCategory'
      price: this.selectedPrice(),
      sortBy: this.selectedSort()
    });
  }
}