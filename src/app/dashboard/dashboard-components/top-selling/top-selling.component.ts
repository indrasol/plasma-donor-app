import { Component, OnInit } from '@angular/core';
import {Product,TopSelling} from './top-selling-data';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  topSelling:any;

  constructor(private statService: StatService) { 

    this.statService.dashboardStats.subscribe(sd=>{
      if(sd.topInfluencers){
        this.topSelling = sd.topInfluencers;
      }
    });

     
  }

   

  ngOnInit(): void {
  }

}
