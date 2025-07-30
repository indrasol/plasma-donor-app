import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StatService } from 'src/app/services/stat.service';
 

@Component({
  selector: 'report-dnr',
  templateUrl: './report-dnr.component.html'
})
export class ReportDnrComponent implements OnInit {

  influencers: any = [];
  homeCenters: any = [];
  searchForm: FormGroup;

  pfsByStates: any;
  pfsByEdu: any;
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
    // Handle age group filtering
    if (formData.ageGroup) {
      const selectedAgeGroup = this.ageGroups.find(group => group.label === formData.ageGroup);
      if (selectedAgeGroup) {
        formData.minAge = selectedAgeGroup.min;
        formData.maxAge = selectedAgeGroup.max;
      }
      // Remove the original ageGroup value as we're now sending minAge and maxAge
      delete formData.ageGroup;
    }
    this.statService.getInfuencerStats(formData).subscribe((res: any) => {
      if (res && res.status) {
        const sd = res.data;
        this.pfsByStates = sd.pfsByStates;
        this.donorsByOccupation = sd.pfsByOccupation;
         
        this.pfsByEdu = sd.pfsByEdu;
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
    { label: '0 - 20 years', min: 0, max: 20 },
    { label: '21 - 30 years', min: 21, max: 30 },
    { label: '31 - 40 years', min: 31, max: 40 },
    { label: '41 - 60 years', min: 41, max: 60 },
    { label: '61 - 80 years', min: 61, max: 80 },
    { label: '81+ years', min: 81, max: 999 }
  ];
  

}
