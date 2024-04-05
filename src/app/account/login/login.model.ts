export class Account implements IAccount {
    constructor(
      public token_type: String,
      public scope: string,
      public expires_in: string,
      public ext_expires_in: string,
      public expires_on: string,
      public not_before: string,
      public resource: string,
      public access_token: string,
      public refresh_token: string ,
      public id_token: string,
      public session_state: string,
      public refresh_expires_in: string,
      ) {}
  }
  export interface IAccount {
       token_type: String;
       scope: string;
       expires_in: string;
       ext_expires_in: string;
       expires_on: string;
       resource: string;
       access_token: string;
       refresh_token: string;
       id_token: string;
       session_state: string;
       refresh_expires_in: string;
  }