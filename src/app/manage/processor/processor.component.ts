import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartService } from '../../services/part.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-processor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {
  parts: any[] = [];
  partCounts: { [partId: string]: number } = {};

  constructor(
    private partService: PartService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.partService.getParts('processor').subscribe(data => {
      this.parts = data;

      for (const part of this.parts) {
        this.partCounts[part.id] = 0;
      }
    });
  }

  addPart(part: any): void {
    this.partCounts[part.id] = (this.partCounts[part.id] || 0) + 1;
    this.cartService.addItem({
      id: part.id,
      description: part.description,
      price: part.price,
      quantity: 1
    });
  }

  removePart(part: any): void {
    if ((this.partCounts[part.id] || 0) > 0) {
      this.partCounts[part.id]--;
      this.cartService.removeItem({
        id: part.id,
        description: part.description,
        price: part.price,
        quantity: 1
      });
    }
  }
}