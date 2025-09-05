import { Component, computed, signal, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Search, ShoppingCart, Menu, ChevronDown, User, Gem, X } from "lucide-angular";
import { NavigationEnd, Router } from "@angular/router";
import { filter, debounceTime, distinctUntilChanged } from "rxjs";
import { Subject } from "rxjs";
import { ProductsService } from "../../../../products/services/product.service";
import { Product } from "../../../interfaces/product.interface";
import { CartService } from "../../../services/cart.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  // ✅ Signals para estado del navbar
  readonly Search = Search;
  readonly ShoppingCart = ShoppingCart;
  readonly Menu = Menu;
  readonly ChevronDown = ChevronDown;
  readonly User = User;
  readonly Gem = Gem;
  readonly X = X;
  
  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly currentRoute = signal('');
  
  // ✅ Signals para búsqueda
  readonly isSearchOpen = signal(false);
  readonly searchQuery = signal('');
  readonly searchResults = signal<Product[]>([]);
  readonly isSearching = signal(false);
  readonly isSearchClosing = signal(false);
  private searchSubject = new Subject<string>();

  // ✅ Computed para clases dinámicas
  readonly navbarClasses = computed(() => {
    const isDashboard = this.currentRoute() === '/';
    const isScrolled = this.isScrolled();

    if (isDashboard && !isScrolled) {
      return 'bg-transparent transition-all duration-300'
    }

    return 'bg-white shadow-md transition-all duration-300'
});

  readonly cartBadgeClasses = computed(() => 
    this.cartService.totalUniqueProducts() > 0 
      ? 'bg-rose-500 text-white' 
      : 'bg-gray-300 text-gray-600'
  );

  readonly textClasses = computed(() => {
    const isDashboard = this.currentRoute() === '/';
    const isScrolled = this.isScrolled();

    if (isDashboard && !isScrolled) {
      return 'text-white hover:text-pink-400'
    }

    return 'text-black hover:text-pink-400'
  });

  // ✅ Computed para clases del botón de búsqueda
  readonly searchButtonClasses = computed(() => {
    const baseClasses = "hidden md:block transition-all duration-200 search-icon-rotate";
    const textClasses = this.textClasses();
    return `${baseClasses} ${textClasses}`;
  });

  constructor(
    private router: Router,
    private productsService: ProductsService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });

    // Listener para scroll
    window.addEventListener('scroll', this.onScroll.bind(this));

    // Configurar búsqueda con debounce
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.performSearch(query);
      });
  }

  private onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  // ✅ Métodos de búsqueda con animación de cierre
  toggleSearch() {
    if (this.isSearchOpen()) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.isSearchOpen.set(true);
    this.isSearchClosing.set(false);
  }

  closeSearch() {
    this.isSearchClosing.set(true);
    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      this.isSearchOpen.set(false);
      this.isSearchClosing.set(false);
      this.clearSearch();
    }, 300); // Duración de la animación
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();
    this.searchQuery.set(query);
    
    if (query.length > 0) {
      this.searchSubject.next(query);
    } else {
      this.clearSearch();
    }
  }

  private performSearch(query: string) {
    if (query.length < 2) {
      this.searchResults.set([]);
      return;
    }

    this.isSearching.set(true);
    
    // Simular búsqueda (puedes reemplazar con una API real)
    setTimeout(() => {
      const allProducts = this.productsService.getAllProducts();
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brandCategory.toLowerCase().includes(query.toLowerCase())
      );
      
      this.searchResults.set(results);
      this.isSearching.set(false);
    }, 200);
  }

  clearSearch() {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.isSearching.set(false);
  }

  selectProduct(product: Product) {
    this.router.navigate(['/products', product.id]);
    this.clearSearch();
    this.isSearchOpen.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update((open: boolean) => !open);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  onScrollDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
}