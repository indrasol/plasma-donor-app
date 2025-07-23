import { Component, Input } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'grid-loading-overlay',
  template:
    `<div class="ag-overlay-loading-center" style="background-color: lightsteelblue;">` +
    `   <i class="fas fa-hourglass-half"> {{this.params.loadingMessage}} </i>` +
    `</div>`,
})
export class GridLoaderComponent implements ILoadingOverlayAngularComp {
  public params: any;

  agInit(params : any): void {
    this.params = params;
  }
}