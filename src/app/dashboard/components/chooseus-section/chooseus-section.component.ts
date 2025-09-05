import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'chooseus-section',
  templateUrl: './chooseus-section.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class ChooseusSectionComponent {
  constructor(private router: Router) {}

  onViewProducts() {
    this.router.navigate(['/products']);
  }
}