import { Component, OnInit } from '@angular/core';
import { PartService } from '../services/part.service';

@Component({
  selector: 'app-manage',
  standalone: false,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  parts: any[] = [];

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.partService.getParts().subscribe({
      next: data => this.parts = data,
      error: err => console.error('Error fetching parts:', err)
    });
  }

  addPart(part: any): void {
    console.log('Add part clicked:', part);
  }
}
