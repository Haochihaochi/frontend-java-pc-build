import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-processor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {
  parts: any[] = [];
  groupedParts: { type: string, items: any[] }[] = [];
  partCounts: { [partId: string]: number } = {};
  searchTerm: string = '';

  constructor(
    private partService: PartService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadAllParts();
  }

  private groupParts(parts: any[]): void {
    const map = new Map<string, any[]>();

    for (const part of parts) {
      if (!map.has(part.type)) {
        map.set(part.type, []);
      }
      map.get(part.type)!.push(part);
    }

    this.groupedParts = Array.from(map, ([type, items]) => ({ type, items }));
  }

  loadAllParts(): void {
    this.partService.getParts('processor').subscribe(data => {
      this.parts = data;
      this.groupParts(this.parts);
      this.partCounts = {};
      for (const part of this.parts) {
        this.partCounts[part.id] = 0;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.loadAllParts();
      return;
    }

    this.partService.searchParts('processor', this.searchTerm).subscribe(data => {
      this.parts = data;
      this.groupParts(this.parts);
      this.partCounts = {};
      for (const part of this.parts) {
        this.partCounts[part.id] = 0;
      }

      this.searchTerm = '';
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
