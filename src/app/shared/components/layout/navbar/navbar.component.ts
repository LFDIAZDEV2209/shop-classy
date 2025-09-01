import { Component, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Search, ShoppingCart, Menu, ChevronDown, User, Gem } from "lucide-angular";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class NavbarComponent {
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

  // ✅ Computed para clases dinámicas
  readonly navbarClasses = computed(() => 
    this.isScrolled() 
      ? 'bg-white shadow-md transition-all duration-300' 
      : 'bg-transparent transition-all duration-300'
  );

  readonly cartBadgeClasses = computed(() => 
    this.cartItemsCount() > 0 
      ? 'bg-rose-500 text-white' 
      : 'bg-gray-300 text-gray-600'
  );

  toggleMenu() {
    this.isMenuOpen.update((open: boolean) => !open);
  }

  updateCartCount(count: number) {
    this.cartItemsCount.set(count);
  }

  onScroll(scrolled: boolean) {
    this.isScrolled.set(scrolled);
  }
}