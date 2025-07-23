import { Component, Input, OnInit } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexChart,
    ApexPlotOptions,
    ApexLegend
  } from "ng-apexcharts";

 
export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
    colors: string[];
};

@Component({
    selector: "app-heat-map",
    templateUrl: "./heat-map.component.html",
    styleUrls: []
})
export class HeatMapComponent implements OnInit{

    @Input()
    chartData: any;

    @Input()
    public title: string;

    isDrawing = false;

    public chartOptions: Partial<ChartOptions> | any;

    ngOnInit(): void {
        this.drawChart();

    }

    ngOnChanges() {
        this.drawChart();

    }

    constructor() {
        this.chartOptions = {
            series: [
                {
                    data: [
                         
                    ]
                }
            ],
            
            legend: {
                show: false
            },
            chart: {
                height: 350,
                type: "treemap",
                toolbar: {
                    show: false
                },
            },
             
            colors: [
                "#3B93A5",
                "#F7B844",
                "#ADD8C7",
                "#EC3C65",
                "#CDD7B6",
                "#C1F666",
                "#D43F97",
                "#1E5D8C",
                "#421243",
                "#7F94B0",
                "#EF6537",
                "#C0ADDB"
            ],
            plotOptions: {
                treemap: {
                    distributed: true,
                    enableShades: false
                }
            }
        };
    }

    drawChart() {
        setTimeout(() => this.processChartData(this.chartData), 300);
    }

    processChartData(ctData: any) {
        
        var ser1   = [ ];
        console.log(':: ctData::'+ JSON.stringify(ctData)) 
        if(ctData){
            console.log(' drawing::');
             
            for(var d of ctData ){
                 
                ser1.push({x: d.title, y: d.valStr});
            }
             
            this.chartOptions.series[0].data = ser1;
          
             
             
    
            
            var sco = this.chartOptions;
            this.chartOptions = JSON.parse(JSON.stringify(sco));
            console.log("::::"+JSON.stringify(this.chartOptions));
        }
        this.isDrawing = false;
    }

}