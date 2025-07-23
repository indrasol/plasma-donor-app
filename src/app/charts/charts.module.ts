import { NgModule } from "@angular/core";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { D3Tree } from "./tree-chart/d3-tree";
import { CommonModule } from "@angular/common";
import { HeatMapComponent } from "./heat-map/heat-map.component";
 

@NgModule({
  declarations: [
     PieChartComponent,
     BarChartComponent,
     D3Tree,
     HeatMapComponent
   

  ],
  imports: [
    NgApexchartsModule,
    CommonModule,
    
  ],
  exports: [
    PieChartComponent,
    BarChartComponent,
    D3Tree,
    HeatMapComponent
  ],
  providers: [],
})
export class ChartsModule { }
