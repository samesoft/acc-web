import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'app-loading-spinner',
  template: `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {

}
