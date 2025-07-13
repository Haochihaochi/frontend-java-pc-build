import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartService } from '../../services/part.service';

@Component({
  selector: 'app-processor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {
  parts: any[] = [];

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.partService.getParts().subscribe({
      next: data => this.parts = data,
      error: err => console.error('Error fetching processor data:', err)
    });
  }

  addPart(part: any): void {
    console.log('Add part clicked:', part);
  }
}
