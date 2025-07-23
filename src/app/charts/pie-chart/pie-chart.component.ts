import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";
import { StatService } from "src/app/services/stat.service";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

@Component({
    selector: "app-piechart",
    templateUrl: "./pie-chart.component.html",

})
export class PieChartComponent implements OnInit {
     
    public chartOptions: Partial<ChartOptions> | any;

    @Input()
    chartData: any;

    @Input()
    public title: string;

    isDrawing = false;

    constructor(private statService: StatService) {

        this.chartOptions = {
            series: [],
            chart: {
                type: "donut",
                height: 350
            },
            labels: [],
           
             
            responsive: [
                {
                    breakpoint: 350,
                    options: {
                        chart: {
                            width: 350
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };
    }
    ngOnInit(): void {
        this.drawPie();

    }

    ngOnChanges() {
        this.drawPie();

    }

    drawPie() {
        setTimeout(() => this.processChartData(this.chartData), 300);
    }

    processChartData(ctData: any) {
        if (this.isDrawing) {
            return;
        }
        this.isDrawing = true;
        var cats = [];
        var ser1 = [];
        console.log(':: pieData::' + JSON.stringify(ctData))
        if (ctData) {

            for (var d of ctData) {
                cats.push(d.title);
                ser1.push(Number.parseFloat(d.valStr));
            }

            this.chartOptions.series = ser1;


            this.chartOptions.labels = cats;
            var sco = this.chartOptions;
            this.chartOptions = JSON.parse(JSON.stringify(sco));
            console.log("::piechart::" + JSON.stringify(this.chartOptions));
        }
        this.isDrawing = false;
    }

}
