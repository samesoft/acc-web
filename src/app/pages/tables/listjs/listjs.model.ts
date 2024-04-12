export interface ListJsModel {
  id: any;
  customer_name: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  status_color: string;
  isSelected?:any;
}

export interface paginationModel {
  id: any;
  name: string;
  type: string;
  img: string;
}
export interface scheduleModel {
  ScheduleID: any;
  CityID: string;
  Party_ID: string;
  Kg: string;
  Nbr: string;
  Rate: string;
  flight: string;
 
}