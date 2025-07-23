import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from "./button-renderer.component";
import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from '@angular/common';
import { GridLoaderComponent } from "./grid-loader.component";
 
import { SpinnerModule } from "./spinner/spinner.module";

import { NgSelectModule } from "@ng-select/ng-select";
import { NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { CustomDateParserFormatter } from "./dataformat";
 

@NgModule({
  declarations: [
    ButtonRendererComponent,
    GridLoaderComponent,
   

  ],
  imports: [
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    SpinnerModule,

    NgSelectModule,
    AgGridModule,
    NgxGpAutocompleteModule,
    
  ],
  exports: [
    AgGridModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    NgSelectModule,
    CommonModule,
    SpinnerModule,
    NgxGpAutocompleteModule,
  ],
  providers: [{ provide: NgbDateParserFormatter , useClass: CustomDateParserFormatter  },],
})
export class ComponentsModule { }
