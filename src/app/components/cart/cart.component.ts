import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  isOpen = false;
  cart$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cartItems$;
  }

  toggleCart(): void {
    this.isOpen = !this.isOpen;
  }

  copyToClipboard(): void {
    const text = this.cartService.getRawList();
    navigator.clipboard.writeText(text).then(() => {
      alert('Cart copied to clipboard!');
    });
  }
}
