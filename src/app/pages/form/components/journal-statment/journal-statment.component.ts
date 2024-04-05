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
import { NgbModal, NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/pages/icons/toast-service";
import { AccountSubTypeService } from "../service/accountSubType.service";


@Component({
  selector: "app-journal-statment",
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, NgbPaginationModule, NgbModule,],
  templateUrl: "./journal-statment.component.html",
  styleUrl: "./journal-statment.component.scss",
})
export class JournalStatmentComponent {
  breadCrumbItems!: Array<{}>;
  submitted = false;
  listJsForm!: UntypedFormGroup;
  ListJsData!: ListJsModel[];
  checkedList: any;
  masterSelected!: boolean;
  ListJsDatas: any;

  page: any = 1;
  pageSize: any = 3;
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
  @ViewChildren(NgbdOrdersSortableHeader)
  headers!: QueryList<NgbdOrdersSortableHeader>;
  journalStatementForm: FormGroup;
  journalStatementData: any[] = [];
  loading = false;
  editFormFieldValue: any;
  constructor(
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    public toastService: ToastService,
    public service: AccountSubTypeService
  ) {
    this.journalStatementForm = new FormGroup({
      fromDate: new FormControl("", Validators.required),
      toDate: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.fetchAccounts();

    this.listJsForm = this.formBuilder.group({
      Journal_id: "",
      Account_code: ["", Validators.required],
    });
  }

  accounts: any[] = [];
  fetchAccounts(): void {
    const url = `${environment.url}accounts`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.accounts = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getJournalStatementData(): void {
    this.loading = true;

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
        this.loading = false;
      });
  }

  get form() {
    return this.listJsForm.controls;
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.journalStatementData.filter(
      (data: { Journal_id: any }) => data.Journal_id === id
    );

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.Journal_id; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.listJsForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified ScheduleID");
    }
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
      this.http
        .post<any>(
          `${environment.url}transaction/update-entry-account`,
          this.listJsForm.value
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
  // {
  //   "journal_id":1,
  //   "journal_date":"2024-01-01,
  //   "details":[
  //   {"account_code":1200,"debit":100,"credit":0,"memo":"xxx" },
  //   {"account_code":2000,"debit":0,"credit":1000,"memo":"yyyy" }
  //   ]
  //   }
  delete(id: any) {
    let data={"journal_id":id}
    return this.http.post<any>(
      `${environment.url}transaction/delete-journal/`,
      data
    );
  }


  elete(deleteId: any) {
    let data = { "journal_id": deleteId };
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
}
