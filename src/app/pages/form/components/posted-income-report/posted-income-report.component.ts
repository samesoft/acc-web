import { Component, NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommaSeparatedPipe } from 'src/app/comma-separated';

@Component({
  selector: 'app-posted-income-report',
  standalone: true,
  
  imports: [CommonModule, FormsModule, ],
  templateUrl: './posted-income-report.component.html',
  styleUrl: './posted-income-report.component.scss',
 
})
// @Pipe({
//   name: 'commaSeparated'
// })
export class PostedIncomeReportComponent {

  incomeData: any[] = [];
  loading: boolean = false;
  incomeDate: string = '';

  constructor( private http: HttpClient){}

  ngOnInit(): void {
  
  }

  fetchIncomeReport(): void {
    if (!this.incomeDate) {
      return;
    }

    this.loading = true;
    const apiUrl = `${environment.url}transaction/posted-income`;
    const requestData = { income_date: this.incomeDate };

    this.http.post<any[]>(apiUrl, requestData).subscribe(
      (response) => {
        this.incomeData = response;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
    calculateTotal(): number {
    let total = 0;
    for (let item of this.incomeData) {
      total += parseFloat(item.total);
    }
    return parseFloat(total.toFixed(2));
  }
}
