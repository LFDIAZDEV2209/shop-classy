import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../interfaces/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal para los items del carrito
  private readonly _cartItems = signal<CartItem[]>([]);
  
  // Computed para obtener los items del carrito
  readonly cartItems = computed(() => this._cartItems());
  
  // Computed para el total de productos únicos (cantidad de productos diferentes)
  readonly totalUniqueProducts = computed(() => this._cartItems().length);
  
  // Computed para el total de items (suma de cantidades) - para uso interno
  readonly totalItems = computed(() => 
    this._cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  
  // Computed para el total del precio
  readonly totalPrice = computed(() => 
    this._cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  // Agregar producto al carrito
  addToCart(product: Product, quantity: number = 1) {
    this._cartItems.update(items => {
      const existingItemIndex = items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // Si el producto ya existe, sumar la cantidad
        const updatedItems = [...items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Si es un producto nuevo, agregarlo
        return [...items, { product, quantity }];
      }
    });
  }

  // Remover producto del carrito
  removeFromCart(productId: number) {
    this._cartItems.update(items => 
      items.filter(item => item.product.id !== productId)
    );
  }

  // Actualizar cantidad de un producto
  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this._cartItems.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Limpiar carrito
  clearCart() {
    this._cartItems.set([]);
  }

  // Obtener cantidad de un producto específico
  getProductQuantity(productId: number): number {
    const item = this._cartItems().find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Verificar si un producto está en el carrito
  isProductInCart(productId: number): boolean {
    return this._cartItems().some(item => item.product.id === productId);
  }
}