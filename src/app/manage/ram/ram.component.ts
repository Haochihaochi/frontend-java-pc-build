import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { CartService } from '../../services/cart.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit, OnDestroy {
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
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(term => this.performSearch(term));
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
    this.partService.getParts('ram').subscribe(data => {
      this.parts = data;
      this.groupParts(this.parts);
      this.resetPartCounts();
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

    this.partService.searchParts('ram', trimmed).subscribe(data => {
      this.parts = data;
      this.groupParts(this.parts);
      this.resetPartCounts();
    });
  }

  private resetPartCounts(): void {
    this.partCounts = {};
    for (const part of this.parts) {
      this.partCounts[part.id] = 0;
    }
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
