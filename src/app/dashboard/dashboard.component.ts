import { Component, AfterViewInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;

  pfsByStates: any;
  donorsByOccupation: any;


  ngAfterViewInit() { }

  constructor(private statService: StatService, private route: ActivatedRoute
    , private toastr: ToastrService

  ) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
    this.loadDashboardStats();

  }

  loadDashboardStats() {
    this.statService.getDashboardStats().subscribe(res => {
      if (res.data) {
        this.pfsByStates = res.data.pfsByStates;
        this.donorsByOccupation = res.data.pfsByOccupation;
      }
    });
  }
}
