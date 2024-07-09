import { Component, QueryList, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { environment } from "src/environments/environment";
import { NgbdOrdersSortableHeader } from "src/app/pages/tables/listjs/listjs-sortable.directive";
import { Observable } from "rxjs";
import { ListJsModel } from "src/app/pages/tables/listjs/listjs.model";
import { OrdersService } from "src/app/pages/tables/listjs/listjs.service";
import {
  NgbModal,
  NgbModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/pages/icons/toast-service";
import { AccountSubTypeService } from "../service/accountSubType.service";

@Component({
  selector: "app-journal-statment",
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, NgbPaginationModule, NgbModule],
  templateUrl: "./journal-statment.component.html",
  styleUrl: "./journal-statment.component.scss",
})
export class JournalStatmentComponent {
  breadCrumbItems!: Array<{}>;
  submitted = false;
  listJsForm!: FormGroup;
  ListJsData!: ListJsModel[];
  checkedList: any;
  masterSelected!: boolean;
  ListJsDatas: any;
  isPosting = false;
  page: any = 1;
  // pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;

  showSuccessToast = false;

  // Table data
  ListJsList!: Observable<ListJsModel[]>;

  schedules: any[] = [];
  parties: any[] = [];
  cities: any[] = [];

  //new
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  @ViewChildren(NgbdOrdersSortableHeader)
  headers!: QueryList<NgbdOrdersSortableHeader>;
  journalStatementForm!: FormGroup;
  journalStatementData: any[] = [];
  loading = false;
  editFormFieldValue: any;
  accounts: any[] = [];

  isLoading = false;
  constructor(
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    public toastService: ToastService,
    public service: AccountSubTypeService
  ) {
    // this.journalStatementForm = new FormGroup({
    //   fromDate: new FormControl("", Validators.required),
    //   toDate: new FormControl("", Validators.required),
    // });
  }

  ngOnInit(): void {
    this.fetchAccounts();

    this.listJsForm = this.formBuilder.group({
      Journal_id: [""],
      Journal_Date: [""],
      Account_code: [""],
      Description: [""],
      Debit: [""],
      Credit: [""],
      // memo: [""],
    });

    this.journalStatementForm = this.formBuilder.group({
      fromDate: ["", Validators.required],
     toDate: ["", Validators.required]
  })
}

  
  fetchAccounts() {
    const url = `${environment.url}accounts`;
    this.http.get<any[]>(url).subscribe((response) => {
      this.accounts = response;
      console.log(this.accounts);
    });
  }

  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.journalStatementData.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
  getJournalStatementData(): void {
    this.isLoading = true;

    const requestData = {
      from_date: this.journalStatementForm.value.fromDate,
      to_date: this.journalStatementForm.value.toDate,
    };

    this.http
      .post<any[]>(
        `${environment.url}transaction/journal-statement`,
        requestData
      )
      .subscribe((data) => {
        this.journalStatementData = data;
        console.log(data);
        this.isLoading = false;
      });
  }

  get form() {
    return this.listJsForm.controls;
  }

  editModa(Edit: any, id: any) {
    this.submitted = false;
    this.modalService.open(Edit, { size: "md", centered: true });

    var listData = this.journalStatementData.filter(
      (data: { Journal_id: any }) => data.Journal_id === id
    );

    if (listData.length > 0) {
      const rowData = listData[0];
      const formattedDate = this.formatDate(rowData.Journal_Date);
      const matchingAccount = this.accounts.find(
        (account) => account.Account_Name === rowData.Account_code
      );
      const editFormFieldValue = rowData.Journal_id;

      this.editFormFieldValue = editFormFieldValue;
      // this.listJsForm.patchValue(rowData);

      this.listJsForm.patchValue({
        // ...rowData,
        Journal_id: rowData.Journal_id,
        Journal_Date: formattedDate,
        Account_code: matchingAccount,
        Debit: rowData.Debit,
        Description: rowData.Description,
        Credit: rowData.Credit,
        memo: rowData.memo,
      });
      console.log(rowData);
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

    return `${year}-${month}-${day}`;
  }
  journal: any;
  deleteId: any;
  confirm(journal: any, id: any) {
    this.journal = id;

    var listData = this.journalStatementData.filter(
      (data: { Journal_id: any }) => data.Journal_id === id
    );

    if (listData.length > 0) {
      const rowData = listData[0];
      const editFormFieldValue = rowData.Journal_id;

      this.editFormFieldValue = editFormFieldValue;
      console.log(editFormFieldValue);
      this.deleteId = editFormFieldValue;
      this.modalService.open(journal, { centered: true });
    }
  }
  // transaction/update-entry-account`

  editSchedule(): void {
    if (this.listJsForm.valid) {
      const formData = this.listJsForm.value;
      this.listJsForm.markAsDirty();
      // Prepare data in the desired format
      const journalData = {
        // Assuming you have a way to determine the journal ID
        Journal_id: formData.Journal_id,
        Journal_Date: formData.Journal_Date, // Format date as YYYY-MM-DD
        details: [
          {
            Account_code: formData.Account_code,
            Debit: formData.Debit,
            Credit: formData.Credit,
            memo: formData.memo,
          },
        ],
      };
      this.http
        .post<any>(
          `${environment.url}transaction/update-entry-account`,
          journalData
        )
        .subscribe(
          (data) => {
            console.log(data);

            this.modalService.dismissAll();
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
            this.toastService.remove("An error occurred!"); // Optional error notification
          }
        );
    }
  }
  EditJournal(): void {
    this.isPosting = true;
    this.listJsForm.markAllAsTouched();
    if (this.listJsForm.valid) {
      const url = `${environment.url}transaction/update-journal`;
      // this.listJsForm.value
      const formData = this.transformFormData(this.listJsForm.value);
      this.http.post(url, this.transformFormData(this.listJsForm.value)).subscribe((response) => {
        console.log(response);
        this.modalService.dismissAll();
        // this.showEditToast = true;
        this.isPosting = false;
        this.ngOnInit();
      });
    } else {
      // Handle form validation errors here, e.g., display an error message.
    }
  }
  private transformFormData(data: any): any {
    return {
      journal_detail_id: data.Journal_id,
      account_number: data.Account_code,
      debit: data.Debit,
      credit: data.Credit,
      description: data.Description,
      journal_date: data.Journal_Date
    };
  }
  // {
  //   "journal_id":1,
  //   "journal_date":"2024-01-01,
  //   "details":[
  //   {"account_code":1200,"debit":100,"credit":0,"memo":"xxx" },
  //   {"account_code":2000,"debit":0,"credit":1000,"memo":"yyyy" }
  //   ]
  //   }
  delete(id: any) {
    let data = { journal_id: id };
    return this.http.post<any>(
      `${environment.url}transaction/delete-journal/`,
      data
    );
  }

  elete(deleteId: any) {
    let data = { journal_id: deleteId };
    this.service.deleteJournal(data).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.showSuccessToast = true;
        // Handle success response
      },
      (error) => {
        // Handle error response
      }
    );
  }
  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.schedules.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }
}
