import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountClassEnum, DebitCredit } from './accountClass.enum';
import { AccountClassService } from '../service/accountClass.service';
import { AccountSubTypeService } from '../service/accountSubType.service';
import { AccountTypeService } from '../service/accountType.service';
import { Router } from '@angular/router';
import { userService } from '../user-list/userManagment.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent {
  public Accounts: any[] = [];
  public page: any;
  public count = 6;
  public currentPage = 1;
  public itemsPerPage = 5;
  public accountClassEnums!: number[];
  public accountClassEnumList = AccountClassEnum;
  accountType!: any[];
  subType!: any[];
  accountClasses: any;
  drCrList = DebitCredit;
  drCrEnum!: number[];
  constructor(private userService: userService,
    private accountClassService: AccountClassService,
    private accountTypeService: AccountTypeService,
    private accountSubTypeService: AccountSubTypeService,
  
    private router:Router) { }

    ngOnInit(): void {
      this.getAllAccountClasses();
      this.getAllAccountTypes();
      this.getAllAccountSubType();
      this.accountClassEnums = Object.keys(this.accountClassEnumList)
        .map((key) => parseInt(key))
        .filter((f) => !isNaN(Number(f)));
      this.drCrEnum = Object.keys(this.drCrList)
        .map((key) => parseInt(key))
        .filter((f) => !isNaN(Number(f)));
      this.getAccount();
  
    }

  getAllAccountClasses() {
    this.accountClassService.getAll().subscribe({
      next: (res) => {
        this.accountClasses = res;
      },
      error: (err) => {
        alert("Error while fetching the Records");
      },
    });
  }
  getAllAccountTypes() {
    this.accountTypeService.getAll().subscribe({
      next: (res) => {
        this.accountType = res;
      },
      error: (err) => {
        alert("Error while fetching the Records");
      },
    });
  }

  getAccount() {
    this.userService.getAllAccounts().subscribe({
      next: (res) => {
        this.Accounts = res;
        console.log(this.Accounts)
      },
      error: (err) => {
        alert("Error while fetching the Records");
      },
    });
  }

  getAllAccountSubType() {
    this.accountSubTypeService.getAll().subscribe({
      next: (res) => {
        this.subType = res;
      },
      error: (err) => {
        alert("Error while fetching the Records");
      },
    });
  }
}
