import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class FooterComponent {
    
}