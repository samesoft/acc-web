import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-income-statement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income-statement.component.html',
  styleUrl: './income-statement.component.scss'
})
export class IncomeStatementComponent {

  income: { account: string, balance: number }[] = [];
  expense: { account: string, balance: number }[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
  }
  
}
