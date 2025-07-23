import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:any;

  constructor(private statService: StatService) { 

    this.statService.dashboardStats.subscribe(sd=>{
      if(sd.topCards){
        this.topcards = sd.topCards;
      }
    });

     
  }

  ngOnInit(): void {
  }

}
