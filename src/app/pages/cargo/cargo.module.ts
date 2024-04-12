import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CargoRoutingModule } from "./cargo-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbToastModule,
  NgbTypeaheadModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FlatpickrModule } from "angularx-flatpickr";
import { TablesRoutingModule } from "../tables/tables-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { SimplebarAngularModule } from "simplebar-angular";
import { NgPipesModule } from "ngx-pipes";

import { UiSwitchModule } from "ngx-ui-switch";
import { NgSelectModule } from "@ng-select/ng-select";
import { ColorPickerModule } from "ngx-color-picker";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { NgxSliderModule } from "ngx-slider-v2";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { FormRoutingModule } from "../form/form-routing.module";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgStepperModule } from "angular-ng-stepper";
import { AutocompleteLibModule } from "angular-ng-autocomplete";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CargoRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FlatpickrModule,
    TablesRoutingModule,
    SharedModule,
    SimplebarAngularModule,
    NgPipesModule,
    NgbToastModule,
    NgbNavModule,
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxSliderModule,
    CdkStepperModule,
    NgStepperModule,
    CKEditorModule,
    DropzoneModule,
    AutocompleteLibModule,
    FormRoutingModule,
  ],
})
export class CargoModule {}
