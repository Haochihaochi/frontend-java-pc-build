import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  description: string;
  price: number;
  quantity: number;
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

  removeItem(item: CartItem) {
    let items = [...this.cartItems.value];
    const index = items.findIndex(i => i.id === item.id);

    if (index > -1) {
      if (items[index].quantity > 1) {
        items[index].quantity--;
      } else {
        items.splice(index, 1);
      }
    }

    this.cartItems.next(items);
  }

  getRawList(): string {
    return this.cartItems.value
      .map(i => `${i.description} x${i.quantity} - RM${i.price * i.quantity}`)
      .join('\n');
  }
}
