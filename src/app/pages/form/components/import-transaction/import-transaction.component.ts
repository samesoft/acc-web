import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import-transaction',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule,NgbModule],
  templateUrl: './import-transaction.component.html',
  styleUrl: './import-transaction.component.scss'
})
export class ImportTransactionComponent {

  selectedFile!: File | null;
  transactions: Transaction[] = [];
  isLoading = false;
  isPosting = false;
  p:number=1

  page: any = 1;
  // pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  currentPage = 1;
  pageSize = 7;
  totalPages!: number;
  showAddToast = false;

  constructor(private http: HttpClient) {}
 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  importData() {
    if (this.selectedFile) {
      this.isLoading = true;
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.transactions = this.parseTransactions(jsonData);
        console.log(this.transactions)
        this.isLoading = false;
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    }
  }

  parseTransactions(jsonData: any[]): Transaction[] {
    // Assuming the worksheet data starts from the second row
    const transactions: Transaction[] = [];
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
        const transaction: Transaction = {
          Tran_Date:formattedDate,
          Account_code: transactionData[1],
          Account_Name: transactionData[2],
          Dr: transactionData[3],
          Cr: transactionData[4],
          Party_Name: transactionData[5] || null, // Set PartyName to null if it is blank
          Tran_Type:transactionData[6],
          Note:transactionData[7],
          Journal_NO:transactionData[8]
        };
        transactions.push(transaction);
      }
    }
    console.log(transactions)
    return transactions;
  }

  postTransactions() {
    this.isPosting=true
    const url = `${environment.url}transaction/import-from-excel`;
  
 
    this.http.post(url, this.transactions)
      .subscribe(
        () => {
          this.isPosting=false
          console.log("successfully imported");
          this.showAddToast = true;
          // this.toastr.success('Transactions posted successfully', 'Success');
          // this.router.navigate(['/pages'])
        },
        (error) => {
          this.isPosting=false
          // this.toastr.error('Error posting transactions', 'Error');
          // console.error(error);
        }
      );
  }

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.transactions.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }

  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.transactions.slice(startIndex, startIndex + this.pageSize);
  }


}

interface Transaction {
  Tran_Date:string,
  Account_code: string;
  Account_Name: string;
  Dr: number;
  Cr: number;
  Party_Name: string;
  Tran_Type:string;
  Note:string;
  Journal_NO:string;
}
