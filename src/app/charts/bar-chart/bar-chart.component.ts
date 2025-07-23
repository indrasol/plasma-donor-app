import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexXAxis,
    ApexPlotOptions
} from "ng-apexcharts";
import { StatService } from "src/app/services/stat.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
};

@Component({
    selector: "app-barchart",
    templateUrl: "./bar-chart.component.html",

})
export class BarChartComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    @Input()
    public chartData: any = {};

    @Input()
    public chartType : string;

    @Input()
    public label : string;

    @Input()
    public title: string;

    constructor(private statService: StatService) {
         
    
        this.chartOptions = {
            series: [
                {
                    name: "",
                    data: [ ]
                }
            ],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false,
                }
                 
            },
            plotOptions: {
                bar: {
                    
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    
                     
                     
                ]
            }
        };
    }
    ngOnInit(): void {
        this.drawBar();
        
    }

    ngOnChanges() {
        this.drawBar();

    }

    drawBar(){
        setTimeout(() => {this.processChartData(this.chartData)}, 300);
    }
    

    processChartData(ctData: any) {
        var cats = [];
        var ser1 = [];
        console.log(':: ctData::'+ JSON.stringify(ctData)) 
        if(ctData){
            console.log(' drawing::');
             
            for(var d of ctData ){
                cats.push(d.title);
                ser1.push(d.valStr);
            }
             
            this.chartOptions.series[0].data = ser1;
            this.chartOptions.series[0].name = this.label;
            this.chartOptions.chart.type = this.chartType;
             
    
            this.chartOptions.xaxis.categories =cats;
            var sco = this.chartOptions;
            this.chartOptions = JSON.parse(JSON.stringify(sco));
            console.log("::::"+JSON.stringify(this.chartOptions));
        }
    }

}
