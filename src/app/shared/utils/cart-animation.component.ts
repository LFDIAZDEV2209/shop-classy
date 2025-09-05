import { Component, signal, computed, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-animation',
  template: `
    <div #animationContainer class="fixed inset-0 pointer-events-none z-50">
      @for (animation of activeAnimations(); track animation.id) {
        <div 
          [attr.data-animation-id]="animation.id"
          [style]="animation.style"
          class="absolute bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
          {{ animation.quantity }}
        </div>
      }
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartAnimationComponent implements AfterViewInit {
  @ViewChild('animationContainer', { static: true }) animationContainer!: ElementRef;

  private readonly _activeAnimations = signal<Array<{
    id: string;
    style: string;
    quantity: number;
  }>>([]);

  readonly activeAnimations = computed(() => this._activeAnimations());

  ngAfterViewInit() {
    // El componente está listo
  }

  // Método para iniciar la animación
  animateToCart(
    startElement: HTMLElement, 
    endElement: HTMLElement, 
    quantity: number,
    onComplete?: () => void
  ) {
    const animationId = `animation-${Date.now()}-${Math.random()}`;
    
    // Obtener posiciones
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    
    // Calcular la posición inicial (centro del botón)
    const startX = startRect.left + startRect.width / 2 - 16; // 16px = mitad del ancho del elemento animado
    const startY = startRect.top + startRect.height / 2 - 16; // 16px = mitad del alto del elemento animado
    
    // Calcular la posición final (centro del icono del carrito)
    const endX = endRect.left + endRect.width / 2 - 16;
    const endY = endRect.top + endRect.height / 2 - 16;
    
    // Crear el elemento de animación
    const animation = {
      id: animationId,
      style: `left: ${startX}px; top: ${startY}px; transform: translate(0, 0);`,
      quantity
    };
    
    // Agregar a las animaciones activas
    this._activeAnimations.update(animations => [...animations, animation]);
    
    // Iniciar la animación después de un pequeño delay para que el DOM se actualice
    setTimeout(() => {
      this._animateElement(animationId, endX, endY, onComplete);
    }, 50);
  }

  private _animateElement(animationId: string, endX: number, endY: number, onComplete?: () => void) {
    const animation = this._activeAnimations().find(a => a.id === animationId);
    if (!animation) return;

    // Buscar el elemento DOM y animarlo
    const element = this.animationContainer.nativeElement.querySelector(`[data-animation-id="${animationId}"]`);
    if (!element) return;

    // Crear la animación CSS
    const keyframes = [
      { 
        transform: 'translate(0, 0) scale(1)', 
        opacity: 1 
      },
      { 
        transform: `translate(${endX - parseFloat(animation.style.match(/left: ([\d.-]+)px/)?.[1] || '0')}px, ${endY - parseFloat(animation.style.match(/top: ([\d.-]+)px/)?.[1] || '0')}px) scale(0.5)`, 
        opacity: 0.8 
      }
    ];

    const options: KeyframeAnimationOptions = {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    };

    element.animate(keyframes, options).addEventListener('finish', () => {
      // Remover la animación cuando termine
      this._activeAnimations.update(animations => 
        animations.filter(a => a.id !== animationId)
      );
      onComplete?.();
    });
  }
}