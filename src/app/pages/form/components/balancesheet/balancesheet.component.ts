import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-balancesheet",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./balancesheet.component.html",
  styleUrl: "./balancesheet.component.scss",
})
export class BalancesheetComponent {
  assets: any[] = [];
  liabilities: any[] = [];
  equity: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = `${environment.url}transaction/balance-sheet`;
    this.http.get<any>(url).subscribe((data) => {
      console.log(data);
      this.assets = data.assets;
      this.liabilities = data.liability;
      this.equity = data.equity;
      console.log(this.assets);
      console.log(this.liabilities);
      console.log(this.equity);
    });
  }

  showBalanceSheet = false; // Flag for printing

  printReport() {
    this.showBalanceSheet = true; // Set flag to show text on print
    window.print(); // Trigger printing
    this.showBalanceSheet = false; // Reset flag after printing
  }
}
