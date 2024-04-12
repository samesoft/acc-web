import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CargoTableComponent } from "./cargo-table/cargo-table.component";
import { CargoReportComponent } from "./cargo-report/cargo-report.component";

const routes: Routes = [
  {
    path: "cargo-schedule",
    component: CargoTableComponent,
  },

  {
    path: "cargoreport",
    component: CargoReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargoRoutingModule {}
