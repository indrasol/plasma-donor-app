import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public isActive = false;

  constructor() {
    this.isActive = true;
  }

  message: string = '';

  ngOnInit() {
    console.log('spinner loading::');

  }
}
