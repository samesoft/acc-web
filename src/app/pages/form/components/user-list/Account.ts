export interface Account {
    AccountId: string;
    Account_code: string;
    Account_Name: string;
    Parent_id: string; //dropdown
    Account_Class_id: string; //dropdown
    Account_type_id: string; //dropdown
    Account_sub_type_id: string; //dropdown
    Is_Local: boolean;
    Dr_Cr: number;
    accountClassId:string;
    Currency: string; //dropdown with default
    Is_Sub_Account: boolean;
    Is_Patent:boolean
  }