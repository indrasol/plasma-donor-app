import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';
import { EmployeService } from 'src/app/services/employe.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FormControl, FormGroup } from "@angular/forms";
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'std-infr-report',
  templateUrl: './std-inf-report.component.html'
})

export class StdInfReportComponent implements OnInit {

  influencers: any = [];
  homeCenters: any = [];
  searchForm: FormGroup;
  loading = false;

  frameworkComponents: any;
  gridApi: any;
  gridColumnApi: any;
  gridList: any = [];



  constructor(private statService: StatService
    , private profileService: ProfileService
    , private employeService: EmployeService
  ) {

    this.prepareSf();


  }

  prepareSf() {
    this.searchForm = new FormGroup({
      'homeCenterId': new FormControl(),
      'influencerId': new FormControl(),
      'relationshipId': new FormControl(),
      'ageGroup': new FormControl(),
      'gender': new FormControl()
    })
  }

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

  ngOnInit(): void {
    this.loadCompanyLocations();
    setTimeout(()=> {
      this.loadInfluencerDetails();
    }, 100);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }


  loadInfluencerDetails(homeCenterId?: any) {
    if(this.gridApi){
      this.gridApi.showLoadingOverlay();
    }
    const frmData: any = {'isInfluencer': true};
      if (homeCenterId) {
        frmData.homeCenterId = homeCenterId;
      }
      this.statService.searchProfiles(frmData).subscribe((res: any) => {
        if (res.data) {
          this.influencers = res.data;
        }
        this.gridApi.hideOverlay();

      });
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
    frmData.isInfluencer = true;

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

    if (changedData && changedData.id) {
      this.loadInfluencerDetails(changedData.id);
    }
  }


  exportToExcel() {
    const params = {
      fileName: 'Influencer_Report.csv',
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
    { label: '0 - 20 years', value: 20 },
    { label: '21 - 30 years', value: 30 },
    { label: '31 - 40 years', value: 40 },
    { label: '41 - 60 years', value: 60 },
    { label: '61 - 80 years', value: 80 },
    { label: '81+ years', value: 81 }
  ];
 
}
