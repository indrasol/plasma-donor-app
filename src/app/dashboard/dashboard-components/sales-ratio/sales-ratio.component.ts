import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexStroke

  // ChartComponent,
  // ApexAxisChartSeries,
  // ApexChart,
  // ApexXAxis,
  // ApexDataLabels,
  // ApexTooltip,
  // ApexStroke
} from 'ng-apexcharts';
import { StatService } from 'src/app/services/stat.service';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html'
})
export class SalesRatioComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor(private statService: StatService) {
    this.statService.dashboardStats.subscribe(sd=>{
      if(sd.donorSeries){
        this.prepareSeries(sd);
      }
    });

    this.salesChartOptions = {


      series: [
        {
          name: "Donors",
          data: [ ]
        },
        {
          name: "Influencers",
          data: [ ]
        }
      ],
      chart: {
        fontFamily: 'Montserrat,sans-serif',
        height: 290,
        type: 'area',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#0d6efd", "#009efb", "#6771dc"],
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      grid: {
        strokeDashArray: 3,
      },
      xaxis: {
        categories: [
           
        ],
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

  prepareSeries(sd: any){
    var cats = [];
    var ser1 = [];
    var ser2 = [];
    for(var d of sd.donorSeries){
      cats.push(d.title);
      ser1.push(d.valStr);
    }
    for(var d of sd.infSeries){
      
      ser2.push(d.valStr);
    }
    if(this.salesChartOptions){

      this.salesChartOptions.series[0].data = ser1;
      this.salesChartOptions.series[1].data = ser2;
  
      this.salesChartOptions.xaxis.categories =cats;
      var sco = this.salesChartOptions;
      this.salesChartOptions = JSON.parse(JSON.stringify(sco));
    }
    
  }

  ngOnInit(): void {
  }

}
