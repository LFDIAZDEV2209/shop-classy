import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { StorageService } from './storage.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shop-classy-cart';
  
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

  constructor(private storageService: StorageService) {
    // Cargar datos del localStorage al inicializar el servicio
    this.loadFromLocalStorage();
    
    // Efecto para guardar en localStorage cada vez que cambie el carrito
    effect(() => {
      this.saveToLocalStorage();
    });
  }

  // Cargar datos del localStorage
  private loadFromLocalStorage() {
    if (!this.storageService.isAvailable()) {
      console.warn('localStorage is not available');
      return;
    }

    const savedCart = this.storageService.getItem<CartItem[]>(this.CART_STORAGE_KEY, []);
    this._cartItems.set(savedCart ?? []);
  }

  // Guardar datos en localStorage
  private saveToLocalStorage() {
    if (!this.storageService.isAvailable()) {
      console.warn('localStorage is not available');
      return;
    }

    const cartData = this._cartItems();
    this.storageService.setItem(this.CART_STORAGE_KEY, cartData);
  }

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

  // Método para obtener un resumen del carrito (útil para mostrar en el checkout)
  getCartSummary() {
    const items = this._cartItems();
    return {
      totalProducts: items.length,
      totalItems: this.totalItems(),
      totalPrice: this.totalPrice(),
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        productPrice: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity
      }))
    };
  }

  // Método para exportar datos del carrito (para enviar a un backend)
  exportCartData() {
    return {
      items: this._cartItems().map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      summary: this.getCartSummary()
    };
  }

  // Método para restaurar carrito desde datos externos (útil para sincronización)
  restoreCart(cartData: CartItem[]) {
    this._cartItems.set(cartData);
  }

  // Método para sincronizar con el servidor (cuando implementes la API)
  async syncWithServer() {
    // Aquí puedes implementar la lógica para sincronizar con el backend
    // Por ejemplo, enviar los datos del carrito al servidor
    const cartData = this.exportCartData();
    console.log('Sincronizando carrito con servidor:', cartData);
    // TODO: Implementar llamada a API
  }
}