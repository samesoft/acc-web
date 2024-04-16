import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-income-statement",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./income-statement.component.html",
  styleUrl: "./income-statement.component.scss",
})
export class IncomeStatementComponent {
  // income: { account: string, balance: number }[] = [];
  // expense: { account: string, balance: number }[] = [];

  income: any[] = [];
  expense: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = `${environment.url}transaction/income-statement`;
    this.http.get<any>(url).subscribe((data) => {
      console.log(data);
      this.income = data.income;
      this.expense = data.expense;

      console.log(this.income);
      console.log(this.expense);
    });
  }

  showBalanceSheet = false; // Flag for printing

  printReport() {
    this.showBalanceSheet = true; // Set flag to show text on print
    window.print(); // Trigger printing
    this.showBalanceSheet = false; // Reset flag after printing
  }
}
