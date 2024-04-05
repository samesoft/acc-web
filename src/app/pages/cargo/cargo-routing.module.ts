import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoTableComponent } from './cargo-table/cargo-table.component';

const routes: Routes = [

  {
    path: "cargo-schedule",
    component: CargoTableComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule { }
