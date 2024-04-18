import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-account-statement",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./account-statement.component.html",
  styleUrl: "./account-statement.component.scss",
})
export class AccountStatementComponent {
  public form: UntypedFormGroup;
  accounts: any[] = [];
  statements: any[] = [];
  totalDr: number = 0;
  totalCr: number = 0;
  balance: number = 0;
  p: number = 1;
  isLoading = false;
  accountLoading = false;

  constructor(public fb: UntypedFormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      Account_Code: ["", Validators.required],
      From: ["", Validators.required],
      To: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchAccounts();
  }
  fetchAccounts(): void {
    this.accountLoading = true;
    //const url = `${baseUrl}/transaction/cash-account-list`;
    const url = `${environment.url}accounts`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.accounts = response;
        console.log(response);
        this.accountLoading = false;
      },
      (error) => {
        console.error(error);
        this.accountLoading = false;
      }
    );
  }
  fetchStatements(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const url = `${environment.url}transaction/account-statement`;
    this.http.post<any[]>(url, this.form.value).subscribe(
      (response) => {
        this.statements = response;
        this.calculateAnalytics();
        this.isLoading = false;
        if (this.statements.length === 0) {
          alert("There are no account statements");
        }
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        // this.toaster.error(error, 'Error');
      }
    );
  }
  calculateAnalytics(): void {
    this.totalDr = 0;
    this.totalCr = 0;
    this.balance = 0;

    for (const item of this.statements) {
      this.totalDr += parseInt(
        item.Dr.replace(",", "").split(".").shift() || "0",
        10
      );
      this.totalCr += parseInt(
        item.Cr.replace(",", "").split(".").shift() || "0",
        10
      );
    }

    this.balance = this.totalDr - this.totalCr;
  }
}
