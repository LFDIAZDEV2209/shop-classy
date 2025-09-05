import { CommonModule } from "@angular/common";
import { Component, Input, signal, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: 'images-layout',
  templateUrl: './images-layout.component.html',
  standalone: true,
  imports: [CommonModule]
})
    
export class ImagesLayoutComponent implements OnChanges {
  @Input() images: string[] = [];
  @Input() productName: string = '';
  
  // Signal para la imagen seleccionada
  readonly selectedImageIndex = signal(0);
  
  // Computed para la imagen actual
  readonly currentImage = signal('');
  
  constructor() {}
  
  ngOnChanges(changes: SimpleChanges) {
    // Cuando las imágenes cambian, actualizar la imagen actual
    if (changes['images'] && this.images.length > 0) {
      this.currentImage.set(this.images[0]);
      this.selectedImageIndex.set(0);
    }
  }
  
  // Método para cambiar imagen
  selectImage(index: number) {
    this.selectedImageIndex.set(index);
    this.currentImage.set(this.images[index] || '');
  }
  
  // Método para navegar entre imágenes
  nextImage() {
    const currentIndex = this.selectedImageIndex();
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.selectImage(nextIndex);
  }
  
  prevImage() {
    const currentIndex = this.selectedImageIndex();
    const prevIndex = currentIndex === 0 ? this.images.length - 1 : currentIndex - 1;
    this.selectImage(prevIndex);
  }
}