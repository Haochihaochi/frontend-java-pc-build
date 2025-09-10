import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  description: string;
  price: number;
  quantity: number;
  group?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addItem(item: CartItem) {
    const items = [...this.cartItems.value];
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this.cartItems.next(items);
  }

  increaseQuantity(item: CartItem) {
    const items = [...this.cartItems.value];
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
      this.cartItems.next(items);
    }
  }

  decreaseQuantity(item: CartItem) {
    const items = [...this.cartItems.value];
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity--;
      } else {
        this.deleteItem(item.id);
        return;
      }
      this.cartItems.next(items);
    }
  }

  deleteItem(itemId: string) {
    const items = this.cartItems.value.filter(i => i.id !== itemId);
    this.cartItems.next(items);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getRawList(): string {
    return this.cartItems.value
      .map(i => `${i.description} x${i.quantity} - RM${i.price * i.quantity}`)
      .join('\n');
  }

  getSubtotal(): number {
    return this.cartItems.value.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((sum, i) => sum + i.quantity, 0);
  }
}
