import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { CartService } from '../../services/cart.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-psu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './psu.component.html',
  styleUrls: ['./psu.component.css']
})
export class PsuComponent implements OnInit, OnDestroy {
  parts: any[] = [];
  groupedParts: { type: string, items: any[] }[] = [];
  partCounts: { [partId: string]: number } = {};
  searchTerm: string = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private partService: PartService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadAllParts();

    // 🔥 Sync partCounts with cartItems
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cartItems => {
        const counts: { [id: string]: number } = {};
        for (const item of cartItems) {
          counts[item.id] = item.quantity;
        }
        this.partCounts = counts;
      });

    this.searchSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(term => this.performSearch(term));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.partService.getParts('psu').subscribe(data => {
      this.parts = data;
      this.groupParts(this.parts);
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  private performSearch(term: string): void {
    const trimmed = term.trim();

    if (trimmed === '') {
      this.loadAllParts();
      return;
    }

    this.partService.searchParts('psu', trimmed).subscribe(data => {
      this.parts = data;
      this.groupParts(this.parts);
    });
  }

  addPart(part: any): void {
    this.cartService.addItem({
      id: part.id,
      description: part.description,
      price: part.price,
      quantity: 1,
      group: "PSU " + part.type
    });
  }

  removePart(part: any): void {
    this.cartService.decreaseQuantity({
      id: part.id,
      description: part.description,
      price: part.price,
      quantity: 1,
      group: "PSU " + part.type
    });
  }
}
