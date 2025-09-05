import { Component, computed, signal, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Search, ShoppingCart, Menu, ChevronDown, User, Gem } from "lucide-angular";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  // ✅ Signals para estado del navbar
  readonly Search = Search;
  readonly ShoppingCart = ShoppingCart;
  readonly Menu = Menu;
  readonly ChevronDown = ChevronDown;
  readonly User = User;
  readonly Gem = Gem;
  readonly isMenuOpen = signal(false);
  readonly cartItemsCount = signal(0);
  readonly isScrolled = signal(false);
  readonly currentRoute = signal('');

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
    this.cartItemsCount() > 0 
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

  constructor(private router: Router) {}

  ngOnInit() {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });

    // Listener para scroll
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update((open: boolean) => !open);
  }

  updateCartCount(count: number) {
    this.cartItemsCount.set(count);
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