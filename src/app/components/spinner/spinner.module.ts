import { NgModule } from "@angular/core";

import { SpinnerComponent } from './spinner.component';
import { AppSpinnerDirective } from './app-spinner.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SpinnerComponent,
    AppSpinnerDirective,
  ],
  imports: [
    CommonModule,
    
  ],
  
  exports:[
    AppSpinnerDirective,
     
  ],
})
export class SpinnerModule {}