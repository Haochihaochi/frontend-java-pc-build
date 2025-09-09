import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProcessorComponent } from '../manage/processor/processor.component';
import { CasingComponent } from '../manage/casing/casing.component';
import { RamComponent } from '../manage/ram/ram.component';
import { PsuComponent } from '../manage/psu/psu.component';
import { GpuComponent } from '../manage/gpu/gpu.component';
import { StorageComponent } from '../manage/storage/storage.component';
import { MotherboardComponent } from '../manage/motherboard/motherboard.component';
import { CoolerComponent } from '../manage/cooler/cooler.component';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, ProcessorComponent, CoolerComponent, RamComponent, PsuComponent, GpuComponent, StorageComponent, MotherboardComponent, CasingComponent],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  selectedPart: string = 'processor';

  isOpen = false;
  cart$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cartItems$;
  }

  setPart(tab: string): void {
    this.selectedPart = tab;
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
