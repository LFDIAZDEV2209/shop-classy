import { Component, computed, signal, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-angular';
import { CartService, CartItem } from '../../../services/cart.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shoping-cart.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit, OnDestroy, OnChanges {
  // Icons
  readonly X = X;
  readonly Plus = Plus;
  readonly Minus = Minus;
  readonly Trash2 = Trash2;
  readonly ShoppingBag = ShoppingBag;
  readonly MessageCircle = MessageCircle;

  // Input para controlar la visibilidad desde el padre
  @Input() isOpen = false;
  
  // Output para comunicar el cierre al padre
  @Output() cartClosed = new EventEmitter<void>();

  // Form data
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly customerEmail = signal('');
  readonly customerAddress = signal('');
  readonly additionalNotes = signal('');

  // Computed properties - forzar reactividad
  readonly cartItems = computed(() => {
    const items = this.cartService.cartItems();
    console.log('Cart items updated:', items); // Debug
    return items;
  });
  
  readonly totalPrice = computed(() => {
    const total = this.cartService.totalPrice();
    console.log('Total price updated:', total); // Debug
    return total;
  });
  
  readonly totalItems = computed(() => {
    const total = this.cartService.totalItems();
    console.log('Total items updated:', total); // Debug
    return total;
  });

  // Computed para el mensaje de WhatsApp
  readonly whatsappMessage = computed(() => {
    const items = this.cartItems();
    const name = this.customerName();
    const phone = this.customerPhone();
    const email = this.customerEmail();
    const address = this.customerAddress();
    const notes = this.additionalNotes();

    // Emojis seguros con escapes Unicode
    const E = {
      shopping: '\u{1F6CD}',        // ��️
      receipt: '\u{1F9FE}',         // ��
      box: '\u{1F4E6}',             // ��
      money: '\u{1F4B5}',           // 💵
      clipboard: '\u{1F4CB}',       // ��
      memo: '\u{1F4DD}',            // ��
      person: '\u{1F464}',          // 👤
      check: '\u{2705}',            // ✅
    };

    let message = `${E.shopping} *NUEVO PEDIDO - LIORA* ${E.receipt}\n\n`;
    message += `Hola! Me gustaría realizar un pedido:\n\n`;
    
    // Información del cliente
    message += `${E.person} *INFORMACIÓN DEL CLIENTE:*\n`;
    message += `• Nombre: ${name || 'No especificado'}\n`;
    message += `• Teléfono: ${phone || 'No especificado'}\n`;
    message += `• Email: ${email || 'No especificado'}\n`;
    message += `• Dirección: ${address || 'No especificada'}\n\n`;
    
    // Productos
    message += `${E.receipt} *PRODUCTOS SOLICITADOS:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   ${E.box} Cantidad: ${item.quantity} unidades\n`;
      message += `   ${E.money} Precio unitario: $${item.product.price.toLocaleString()}.00\n`;
      message += `   ${E.money} Subtotal: $${(item.product.price * item.quantity).toLocaleString()}.00\n\n`;
    });
    
    // Resumen
    message += `${E.clipboard} *RESUMEN DEL PEDIDO:*\n`;
    message += `• Total de productos: ${this.totalItems()} unidades\n`;
    message += `• Valor total: $${this.totalPrice().toLocaleString()}.00\n\n`;
    
    // Notas adicionales
    if (notes && notes.trim()) {
      message += `${E.memo} *NOTAS ADICIONALES:*\n${notes}\n\n`;
    }
    
    // Cierre amigable
    message += `${E.check} ¡Gracias por tu atención! Espero tu confirmación para proceder con el pago y envío.\n\n`;
    message += `Saludos cordiales,\n${name || 'Cliente'}`;

    return message;
  });

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Prevenir scroll del body cuando el sidebar está abierto
    if (this.isOpen) {
      this.preventBodyScroll();
    }
    
    // Forzar detección de cambios inicial
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.preventBodyScroll();
        // Forzar detección de cambios cuando se abre
        this.cdr.detectChanges();
      } else {
        this.restoreBodyScroll();
      }
    }
  }

  ngOnDestroy() {
    // Restaurar scroll del body
    this.restoreBodyScroll();
  }

  // Métodos del carrito
  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    // Forzar detección de cambios inmediata
    this.cdr.detectChanges();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    // Forzar detección de cambios inmediata
    this.cdr.detectChanges();
  }

  clearCart() {
    this.cartService.clearCart();
    // Forzar detección de cambios inmediata
    this.cdr.detectChanges();
  }

  // Método para enviar a WhatsApp con mejor compatibilidad
  sendToWhatsApp() {
    const message = encodeURIComponent(this.whatsappMessage());
    const whatsappNumber = '573058194054';

    // Detectar si es móvil para usar la URL más compatible
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // URLs alternativas para mejor compatibilidad con emojis
    const urlMobile = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    const urlDesktop = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    
    // Usar la URL más apropiada según el dispositivo
    const url = isMobile ? urlMobile : urlDesktop;
    
    window.open(url, '_blank');
  }

  // Validar si el formulario está completo
  isFormValid() {
    return this.customerName().trim() !== '' && 
           this.customerPhone().trim() !== '' && 
           this.customerEmail().trim() !== '' && 
           this.customerAddress().trim() !== '';
  }

  // Limpiar formulario
  clearForm() {
    this.customerName.set('');
    this.customerPhone.set('');
    this.customerEmail.set('');
    this.customerAddress.set('');
    this.additionalNotes.set('');
  }

  // Cerrar el sidebar del carrito
  closeCart() {
    this.restoreBodyScroll();
    this.cartClosed.emit();
  }

  // Prevenir scroll del body
  private preventBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  // Restaurar scroll del body
  private restoreBodyScroll() {
    document.body.style.overflow = 'auto';
  }
}