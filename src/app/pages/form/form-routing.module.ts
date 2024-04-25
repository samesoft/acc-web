import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Component pages
import { BasicComponent } from "./basic/basic.component";
import { SelectComponent } from "./select/select.component";
import { CheckboxsRadiosComponent } from "./checkboxs-radios/checkboxs-radios.component";
import { PickersComponent } from "./pickers/pickers.component";
import { MasksComponent } from "./masks/masks.component";
import { AdvancedComponent } from "./advanced/advanced.component";
import { RangeSlidersComponent } from "./range-sliders/range-sliders.component";
import { ValidationComponent } from "./validation/validation.component";
import { WizardComponent } from "./wizard/wizard.component";
import { EditorsComponent } from "./editors/editors.component";
import { FileUploadsComponent } from "./file-uploads/file-uploads.component";
import { LayoutsComponent } from "./layouts/layouts.component";
import { JournalStatmentComponent } from "./components/journal-statment/journal-statment.component";
import { PartyListComponent } from "./components/party-list/party-list.component";
import { ImportPartyComponent } from "./components/import-party/import-party.component";
import { ImportTransactionComponent } from "./components/import-transaction/import-transaction.component";
import { PostedIncomeReportComponent } from "./components/posted-income-report/posted-income-report.component";
import { IncomeStatementComponent } from "./components/income-statement/income-statement.component";
import { AccountStatementComponent } from "./components/account-statement/account-statement.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { AccountListComponent } from "./components/account-list/account-list.component";
import { ImportJournalComponent } from "./components/import-journal/import-journal.component";
import { BalancesheetComponent } from "./components/balancesheet/balancesheet.component";
import { TripListComponent } from "./components/trip-list/trip-list.component";
import { ScheduleListComponent } from "./components/schedule-list/schedule-list.component";
import { CargoReportComponent } from "./components/cargo-report/cargo-report.component";

const routes: Routes = [
  {
    path: "basic",
    component: BasicComponent,
  },
  {
    path: "select",
    component: SelectComponent,
  },
  {
    path: "checkboxs-radios",
    component: CheckboxsRadiosComponent,
  },
  {
    path: "pickers",
    component: PickersComponent,
  },
  {
    path: "masks",
    component: MasksComponent,
  },
  {
    path: "advanced",
    component: AdvancedComponent,
  },
  {
    path: "range-sliders",
    component: RangeSlidersComponent,
  },
  {
    path: "validation",
    component: ValidationComponent,
  },
  {
    path: "wizard",
    component: WizardComponent,
  },
  {
    path: "editors",
    component: EditorsComponent,
  },
  {
    path: "file-uploads",
    component: FileUploadsComponent,
  },
  {
    path: "layouts",
    component: LayoutsComponent,
  },
  {
    path: "journal-statement",
    component: JournalStatmentComponent,
  },
  {
    path: "party-list",
    component: PartyListComponent,
  },
  {
    path: "import-party",
    component: ImportPartyComponent,
  },
  {
    path: "import-transaction",
    component: ImportTransactionComponent,
  },
  {
    path: "posted-income",
    component: PostedIncomeReportComponent,
  },
  {
    path: "Income-statement",
    component: IncomeStatementComponent,
  },
  {
    path: "account-statement",
    component: AccountStatementComponent,
  },
  {
    path: "users",
    component: UserListComponent,
  },
  {
    path: "accounts",
    component: AccountListComponent,
  },
  {
    path: "import-Journal",
    component: ImportJournalComponent,
  },
  {
    path: "balancesheet",
    component: BalancesheetComponent,
  },
  {
    path: "trip",
    component: TripListComponent,
  },

  {
    path: "schedule-list",
    component: ScheduleListComponent,
  },
  {
    path: "cargo-report",
    component: CargoReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
