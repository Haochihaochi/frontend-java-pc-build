import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessorComponent } from '../manage/processor/processor.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, ProcessorComponent],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  selectedPart: string = 'processor';

  setPart(part: string) {
    this.selectedPart = part;
  }
}
