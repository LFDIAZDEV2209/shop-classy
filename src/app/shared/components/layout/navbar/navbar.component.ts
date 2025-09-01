import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NavbarComponent {
  constructor() { }
}