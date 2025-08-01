import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StatService } from 'src/app/services/stat.service';
 

@Component({
  selector: 'report-dnr-visuals',
  templateUrl: './report-dnr-visuals.component.html'
})
export class ReportDnrVisualsComponent implements OnInit {

  influencers: any = [];
  homeCenters: any = [];
  searchForm: FormGroup;

  pfsByType: any;
   
  donorsByOccupation: any;

  loading = false;

  

  constructor( private statService: StatService,
    private employeService: EmployeService,
     private profileService: ProfileService ) {

     
     this.prepareSf();
     
  }

  ngOnInit(): void {
     this.loadCompanyLocations();
     this.searchResults();
  }

  loadInfluencers(homeCenterId: any) {
    if (homeCenterId) {
      this.profileService.getAllInfluencers(homeCenterId).subscribe((res: any) => {
        if (res.data) {
          this.influencers = res.data;
        }

      });
    }
  }
  loadCompanyLocations() {
    this.employeService.getAllCompanyLocations().subscribe((res: any) => {
      if (res && res.status) {
        this.homeCenters = res.data;
      }

    });
  }

  homeCenterChange(changedData: any) {
    console.log('changeddata::' + JSON.stringify(changedData));
    if (changedData && changedData.id) {
      //this.loadInfluencers(changedData.id);
    }
  }

  prepareSf() {
    this.searchForm = new FormGroup({
      'homeCenterId': new FormControl(),
      'influencedById': new FormControl(),
      'relationshipId': new FormControl(),
      'ageGroup': new FormControl(),
      'gender': new FormControl()
    })
  }

 

  searchResults() {
    this.loading = true;
    const formData = this.searchForm.value;
    formData.isInfluencer = true;
    this.statService.getDonorStatsForHeatMap(formData).subscribe((res: any) => {
      if (res && res.status) {
        const sd = res.data;
        this.pfsByType = sd.pfsByCities;
        
      }
      this.loading = false;
    });
     
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
