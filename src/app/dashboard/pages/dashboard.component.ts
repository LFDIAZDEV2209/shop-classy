import { Component, computed, signal } from "@angular/core";
import { DashboardBannerComponent } from "../components/dashboard-banner/dashboard-banner.component";
import { ProductsSectionsComponent } from "../components/products-sections/products-sections.component";
import { ChooseusSectionComponent } from "../components/chooseus-section/chooseus-section.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DashboardBannerComponent, ProductsSectionsComponent, ChooseusSectionComponent, CommonModule],
  standalone: true
})

export class DashboardComponent {
  // ✅ Signals para estado global
  readonly isLoading = signal(true);
  readonly currentSection = signal('tendencias');
  readonly scrollPosition = signal(0);

  // ✅ Computed para secciones visibles
  readonly visibleSections = computed(() => {
    const sections = ['tendencias', 'diamante', 'oro', 'esmeralda'];
    return sections.filter(section => section !== this.currentSection());
  });

  // ✅ Computed para clases dinámicas
  readonly loadingClasses = computed(() => 
    this.isLoading() 
      ? 'opacity-100 pointer-events-auto' 
      : 'opacity-0 pointer-events-none'
  );

  readonly contentClasses = computed(() => 
    this.isLoading() 
      ? 'opacity-0 transform translate-y-4' 
      : 'opacity-100 transform translate-y-0'
  );

  ngOnInit() {
    // Simular carga inicial
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);

    // Listener para scroll
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll() {
    this.scrollPosition.set(window.scrollY);
  }

  onSectionChange(section: string) {
    this.currentSection.set(section);
  }

scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
}