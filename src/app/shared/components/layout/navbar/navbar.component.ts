import { Component, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NavbarComponent {
  // ✅ Signals para estado del navbar
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