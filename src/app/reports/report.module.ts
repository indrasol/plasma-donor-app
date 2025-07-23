import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
 
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
 
import { ComponentsModule } from "../components/components.module";
import { ReportComponent } from "./report.component";
import { ReportTreeComponent } from "./report-components/infr-reports/report-tree.component";
 
import { ChartsModule } from "../charts/charts.module";
import { ReportDnrComponent } from "./report-components/donor-reports/report-dnr.component";
import { StdDonorReportComponent } from "./report-components/donor-std-reports/std-donor-report.component";
import { StdInfReportComponent } from "./report-components/infr-std-reports/std-inf-report.component";
import { InfStatsReportComponent } from "./report-components/infr-stats-reports/inf-stats-report.component";
import { ReportDnrVisualsComponent } from "./report-components/donor-visuals/report-dnr-visuals.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Reports",
      urls: [{ title: "Reports", url: "/reports" } ],
      
    },
    component: ReportComponent,
  },
  {
    path: "influencer-visuals",component: ReportTreeComponent
  },
  {
    path: "influencer-stats",component: InfStatsReportComponent,
  },
  {
    path: "influencer-details",component: StdInfReportComponent
  },
  {
    path: "donor-stats",component: ReportDnrComponent
  },
  {
    path: "donor-details",component: StdDonorReportComponent
  },
  {
    path: "donor-visuals", component: ReportDnrVisualsComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    ComponentsModule,
    ChartsModule,
     
  ],
  declarations: [
     
     ReportComponent,
     ReportTreeComponent,
     
     ReportDnrComponent,
     StdDonorReportComponent,
     StdInfReportComponent,
     InfStatsReportComponent,
     ReportDnrVisualsComponent,
  ],
})
export class ReportsModule {}
