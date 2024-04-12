import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { paginationlist } from 'src/app/core/data';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { JournalService } from '../service/journal.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-import-journal',
  standalone: true,
  imports: [CommonModule,  NgbPaginationModule, NgbModule],
  templateUrl: './import-journal.component.html',
  styleUrl: './import-journal.component.scss'
})
export class ImportJournalComponent {
  breadCrumbItems!: Array<{}>;
  submitted = false;
  listJsForm!: UntypedFormGroup;
  ListJsData!: any[];
  checkedList: any;
  masterSelected!: boolean;
  ListJsDatas: any;

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
  selectedFile!: File | null;
  Journals: any[] = [];
  isLoading = false;
  isPosting = false;
  p:number=1
  showAddToast= false;
  file!: File;

  //new
  currentPage = 1;
pageSize = 7;
totalPages!: number;

  constructor(private http: HttpClient,private router:Router, private service : JournalService) {}


  
 

  FileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadData() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.Journals = this.parseTransactions(jsonData);

      this.http.post(`${environment.url}transaction/import-journal`, jsonData).subscribe(
        response => {
          console.log('Data uploaded successfully', response);
        },
        error => {
          console.error('Error uploading data', error);
        }
      );
    };

    reader.readAsBinaryString(this.file);
  }

  upload() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.Journals =this.parseTransactions(jsonData);
      this.http.post(`${environment.url}transaction/import-journal`, this.Journals).subscribe(
        response => {
          console.log('Data uploaded successfully', response);
        },
        error => {
          console.error('Error uploading data', error);
        }
      );
    };

    reader.readAsBinaryString(this.file);
  }
  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.Journals.slice(startIndex, startIndex + this.pageSize);
  }
  

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.Journals.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  importData() {
    if (this.selectedFile) {
      if (this.selectedFile) {
        this.isLoading = true;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.Journals = this.parse(jsonData);
          console.log(this.Journals)
          this.isLoading = false;
        };
        fileReader.readAsArrayBuffer(this.selectedFile);
      }}
  }
  parseTransactions(jsonData: any[]): Journal[] {
    // Assuming the worksheet data starts from the second row
    const Journals: Journal[] = [];
    for (let i = 1; i < jsonData.length; i++) {
      const transactionData = jsonData[i];
      const hasNonNullValues = transactionData.some((value: string) => value !== null && value !== '');
      if (hasNonNullValues) {
        let formattedDate=transactionData[0];
        if(transactionData[0]){
          const date = new Date(1900, 0, 1); // January is represented by 0
          date.setDate(date.getDate() + transactionData[0] - 1);
          //const dateString = date.toLocaleDateString('en-US');
          //const timeString = date.toLocaleTimeString('en-US', { hour12: true });
          formattedDate = date.toISOString().slice(0, 10);;
        }
        const Journ: Journal = {
          Journal_Date:formattedDate,
          Dr_Account_Name: transactionData[1],
          Dr_Tran_Type: transactionData[2],
          Dr_Note: transactionData[3],
          Dr_Party_Name: transactionData[4],
          Amount: transactionData[5],
          Journal_Type: transactionData[6], // Set PartyName to null if it is blank
          Journal_Descripition:transactionData[7],
          Cr_Account_Name:transactionData[8],
          Cr_Tran_Type:transactionData[9],
          Cr_Note:transactionData[10],
          Cr_Party_Name:transactionData[11],
         

        };
        Journals.push(Journ);
      }
    }
    console.log(this.Journals)
    return this.Journals;
  }

  parse(jsonData: any[]): Journal[] {
    // Assuming the worksheet data starts from the second row
    const transactions: Journal[] = [];
    for (let i = 1; i < jsonData.length; i++) {
      const transactionData = jsonData[i];
      const hasNonNullValues = transactionData.some((value: string | null) => value !== null && value !== '');
      if (hasNonNullValues) {
        let formattedDate=transactionData[0];
        if(transactionData[0]){
          const date = new Date(1900, 0, 1); // January is represented by 0
          date.setDate(date.getDate() + transactionData[0] - 1);
          //const dateString = date.toLocaleDateString('en-US');
          //const timeString = date.toLocaleTimeString('en-US', { hour12: true });
          formattedDate = date.toISOString().slice(0, 10);;
        }
        const transaction: Journal = {
          Journal_Date:formattedDate,
          Dr_Account_Name: transactionData[1],
          Dr_Tran_Type: transactionData[2],
          Dr_Note: transactionData[3],
          Dr_Party_Name: transactionData[4],
          Amount: transactionData[5],
          Journal_Type: transactionData[6],  // Set PartyName to null if it is blank
          Journal_Descripition:transactionData[7],
          Cr_Account_Name:transactionData[8],
          Cr_Tran_Type:transactionData[9],
          Cr_Note:transactionData[10],
          Cr_Party_Name:transactionData[11],
          

        };
        transactions.push(transaction);
      }
    }
    console.log(transactions)
    return transactions;
  }


  postTransactions() {
    this.isPosting=true
    const url = `${environment.url}transaction/import-journal`;
  
 
    this.http.post(url, this.Journals)
      .subscribe(
        () => {
          this.isPosting=false
          console.log('Data uploaded successfully');
          // this.router.navigate(['/pages'])
        },
        // (error) => {
        //   this.isPosting=false
        //   this.toastr.error('Error posting transactions', 'Error');
        //   console.error(error);
        // }
      );
  }
 

  

}
interface Journal {
  Journal_Date:string,
  Dr_Account_Name: string;
  Dr_Tran_Type: string;
  Dr_Note: string;
  Dr_Party_Name: string;
  Amount: number;
  Journal_Type:string;
  Journal_Descripition:string;
  Cr_Account_Name:string;
  Cr_Tran_Type: string;
  Cr_Note: string;
  Cr_Party_Name: string


}


