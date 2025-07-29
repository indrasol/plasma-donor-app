import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { StatService } from 'src/app/services/stat.service';


@Component({
  selector: 'report-infr-stats',
  templateUrl: './inf-stats-report.component.html'
})

export class InfStatsReportComponent implements OnInit {




  pfsByStates: any;
  donorsByOccupation: any;
  pfsByRels: any;
  influencers: any[];
  homeCenters: any[];
  occupations: any = [];
  pfsByEdu: any[];
  searchForm: FormGroup;
  loading = false;



  constructor(private statService: StatService, private employService: EmployeService) {

    this.prepareSf();
  }
  prepareSf() {
    this.searchForm = new FormGroup({
      'homeCenterId': new FormControl(),
      'influencerId': new FormControl(),
      'occupationId': new FormControl(),
      'relationshipId': new FormControl(),
      'ageGroup': new FormControl(),
      'gender': new FormControl()
    })
  }

  ngOnInit(): void {
    this.loadCompanyLocations();
    this.searchInf();
  }


  loadCompanyLocations() {
    this.employService.getAllCompanyLocations().subscribe((res: any) => {
      if (res && res.status) {
        this.homeCenters = res.data;
      }

    });
  }

  searchInf ()  {
    this.loading = true;
    const formData = this.searchForm.value;
    formData.isInfluencer = true;
    this.statService.getInfuencerStats(formData).subscribe((res: any) => {
      if (res && res.status) {
        const sd = res.data;
        this.pfsByStates = sd.pfsByStates;
        this.donorsByOccupation = sd.pfsByOccupation;
        this.pfsByRels = sd.pfsByRels;
        this.pfsByEdu = sd.pfsByEdu;
      }
      this.loading = false;
    });
  }

  homeCenterChange(changedData: any) {
    
     
  }

  genders = [
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
    { label: 'Transgender', value: 'n' },
    { label: 'Neutral', value: 'n' },
    { label: 'Others', value: 'n' }
  ];

  ageGroups = [
    { label: '0 - 20 years', value: 20 },
    { label: '21 - 30 years', value: 30 },
    { label: '31 - 40 years', value: 40 },
    { label: '41 - 60 years', value: 60 },
    { label: '61 - 80 years', value: 80 },
    { label: '81+ years', value: 81 }
  ];
   

}
