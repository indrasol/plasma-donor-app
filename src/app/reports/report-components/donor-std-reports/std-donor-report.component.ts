import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';
import { FormControl, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { EmployeService } from 'src/app/services/employe.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ColDef } from 'ag-grid-community';



@Component({
  selector: 'std-donor-report',
  templateUrl: './std-donor-report.component.html'
})

export class StdDonorReportComponent implements OnInit {
  frameworkComponents: any;
  gridApi: any;
  gridColumnApi: any;
  influencers: any = [];
  homeCenters: any = [];
  searchForm: FormGroup;
  pfsByStates: any;
  donorsByOccupation: any;
  gridList: any = [];
  isEdit = false;
  subscribe: any;
  donorDetails: any;
  infoForm: FormGroup;
  gridLoading: any = [];

  public loading = false;
  public submitted = false;


  gridColDefs: ColDef[] = [

    { field: '_id', headerName: 'Id', hide: true },

    {
      field: 'email', headerName: 'EmailId', pinned: 'left', width: 280, filter: true, sortable: true,

    },
    {
      field: 'name', headerName: 'Name', width: 280, filter: true, sortable: true,

    },

    {
      field: 'phoneNumber', headerName: 'Phone Number', width: 280, filter: true, sortable: true,

    },
    {
      field: 'dob', headerName: 'DOB', width: 250, filter: true, sortable: true,

    },

    {
      field: 'isDonor', headerName: 'isDonor?', width: 150, filter: true, sortable: true,

    },
    {
      field: 'isInfluencer', headerName: 'isInfluencer?', width: 150, filter: true, sortable: true,

    },

    {
      field: 'influencers', headerName: 'Influenced By', width: 250, filter: true, sortable: true,

    },

    // {
    // 	field: 'infScore', headerName: 'Score', width: 250, filter: true, sortable: true,

    // },

    {
      field: 'addressLine1', headerName: 'Address Line', width: 250, filter: true, sortable: true,

    },
    {
      field: 'city', headerName: 'city', width: 250, filter: true, sortable: true,

    },
    {
      field: 'state', headerName: 'state', width: 250, filter: true, sortable: true,

    },
    {
      field: 'postalCode', headerName: 'Zip Code', width: 250, filter: true, sortable: true,

    },

    {
      field: 'occupation', headerName: 'Occupation', width: 250, filter: true, sortable: true,

    },
    {
      field: 'education', headerName: 'Education', width: 250, filter: true, sortable: true,

    },
    {
      field: 'language', headerName: 'Language', width: 250, filter: true, sortable: true,

    },
    {
      field: 'race', headerName: 'Race', width: 250, filter: true, sortable: true,

    },
    {
      field: 'schoolAttended', headerName: 'School Attended', width: 250, filter: true, sortable: true,

    },
    {
      field: 'hobbieStr', headerName: 'Hobby(ies)', width: 250, filter: true, sortable: true,

    },
    {
      field: 'interestStr', headerName: 'Interest(s)', width: 250, filter: true, sortable: true,

    },
    {
      field: 'homeCenter', headerName: 'Home Center', width: 250, filter: true, sortable: true,

    },


    {
      field: 'createdOn', headerName: 'Created On', width: 250, filter: true, sortable: true,

    },


  ];
  constructor(private statService: StatService
    , private profileService: ProfileService
    , private employeService: EmployeService) {




    this.prepareSf();



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
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

  ngOnInit(): void {
    this.loadInfluencers(null);
    this.loadCompanyLocations();
    setTimeout(() => {
      this.loadProfiles();

    }, 100);
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
  loadProfiles() {
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
    }
    let frmData = this.searchForm.value;
    frmData.isDonor = true;

    // Handle age group filtering
    if (frmData.ageGroup) {
      const selectedAgeGroup = this.ageGroups.find(group => group.label === frmData.ageGroup);
      if (selectedAgeGroup) {
        frmData.minAge = selectedAgeGroup.min;
        frmData.maxAge = selectedAgeGroup.max;
      }
      // Remove the original ageGroup value as we're now sending minAge and maxAge
      delete frmData.ageGroup;
    }

    this.statService.searchProfiles(frmData).subscribe((res: any) => {
      if (res && res.status) {
        this.gridList = res.data;
      }

      this.gridApi.hideOverlay();


    });

  }

  searchResults() {
    this.loadProfiles();

  }

  homeCenterChange(changedData: any) {
    console.log('changeddata::' + JSON.stringify(changedData));
    if (changedData && changedData.id) {
      this.loadInfluencers(changedData.id);
    }
  }
  exportToExcel() {
    const params = {
      fileName: 'Donor_Report.csv',
    };
  
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv(params);
    }
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



