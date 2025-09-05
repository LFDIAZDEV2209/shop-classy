import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LucideAngularModule, Gem } from "lucide-angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  standalone: true
})
export class FooterComponent {
  readonly Gem = Gem;
  constructor(private router: Router) {}

  goToHome() {
    if (this.router.url === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    this.router.navigate(['/']);
  }
}