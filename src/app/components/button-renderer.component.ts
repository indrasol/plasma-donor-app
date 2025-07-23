import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-renderer',
  template: `
    <span    *ngFor="let ic of btns;" class='grid-action' >
      <i [class]="ic.clz" [title]="ic.actType" (click)="onClick($event, ic.actType)"> </i>
    </span>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  btnClz: string = '';
  btns:any;
  
  

  agInit(params : any): void {
    this.params = params;
    this.btns = this.params.btns || null;
  }

  refresh(params?: any): boolean {
    console.log(':: refresh::');
    return false;
  }

  onClick($event: any, actType: any) {
    console.log(" ng init::"+ this.params);
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      console.log(" ng inside::"+ JSON.stringify(params.rowData));  
      this.params.onClick(params, actType);

    }
  }
}