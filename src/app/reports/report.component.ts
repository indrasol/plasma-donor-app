import { Component, AfterViewInit, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//declare var require: any;

@Component({
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  subtitle: string;
   

  ngAfterViewInit() { }

  constructor(private statService: StatService, private route: ActivatedRoute
		, private toastr: ToastrService 
		 
	) { 
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
		//this.loadDashboardStats();
		 
	}

  loadDashboardStats(){
    this.statService.getDashboardStats().subscribe(res =>{

    });
  }
}
