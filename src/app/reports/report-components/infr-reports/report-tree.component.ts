import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { MdService } from 'src/app/services/md.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StatService } from 'src/app/services/stat.service';
 

@Component({
  selector: 'report-d3-tree',
  templateUrl: './report-tree.component.html'
})

export class ReportTreeComponent implements OnInit {

  influencers: any = [];
  homeCenters: any = [];
  relationships: any = [];
  searchForm: FormGroup;
  loading = false;
  defTreeData = {
    name: 'Nuram',
    children: [
      {
        name: 'Influencer',
        
      },
       
    ],}

  margin = { top: 0, right: 130, bottom: 0, left: 80 };
  treeData = {
    name: 'Nuram',
    children: [
      {
        name: 'Influencer',
        
      },
       
    ],
  };

  pfsByStates: any;
  donorsByOccupation: any;

  

  constructor( private statService: StatService
    , private profileService: ProfileService
    , private mdService: MdService
    , private employeService: EmployeService ) {

    this.statService.dashboardStats.subscribe(sd=>{
      if(sd){
        this.pfsByStates = sd.pfsByStates;
        this.donorsByOccupation = sd.pfsByOccupation;
      }
    });

    this.prepareSf();
     
     
  }
  prepareSf(){
    this.searchForm = new FormGroup({
      'homeCenterId': new FormControl(),
      'influencedById': new FormControl(),
      'relationshipId': new FormControl(),
      'ageGroup': new FormControl(),
      'gender': new FormControl()
    })
  }

  ngOnInit(): void {
    this.loadInfluencers(null);
    this.loadCompanyLocations();
    this.loadTreeData();
    this.loadMasterData();
  }

  loadInfluencers(homeCenterId : any){
    if(homeCenterId){
      this.profileService.getAllInfluencers(homeCenterId).subscribe((res:any)=>{
        if(res.data){
          this.influencers = res.data;
          let cinfId = this.searchForm.controls['influencedById'].value;
          let infFound = false;
          for(let inf of this.influencers){
            if(cinfId == inf.id){
              infFound = true;
            }

          }
          
           
        }
         
      });
    }
	}
  loadCompanyLocations(){
		this.employeService.getAllCompanyLocations().subscribe((res:any)=>{
			if(res && res.status){
				this.homeCenters = res.data;
			}
			 
		});
	}

  loadMasterData(){
    const types = {'types': ['relationship']};
    this.mdService.getMasterDataByTypes(types).subscribe((res:any)=>{
      const resData = res.data;
      if(resData){
        if(resData && resData.relationship){
          this.relationships = resData.relationship;
        }
      }
    });
  }

  influencerChange(changeData: any){
    if(changeData){
      var infId = changeData.id;
      if(infId){
        this.loadTreeData(infId);
      }
    }
  }
  loadTreeData(infId?: any){

    let frmData = this.searchForm.value;
        
    this.loading = true;
    this.statService.getInfTreeData(frmData).subscribe(res =>{
      if(res.status){
        let tData = JSON.parse(JSON.stringify(this.defTreeData));
        if(res.data ){
          if( res.data.length >1){
            tData.children =  res.data;
          }else if(res.data.length  == 1){
            tData = res.data[0];
          }
        }
        this.treeData = tData;
      }
      this.loading = false;
    });
  }

  selectedNode: any;
    nodeUpdated(node:any){
  }
  nodeSelected(node:any){
    this.selectedNode= node;
  }

  homeCenterChange(changedData : any){
    console.log('changeddata::'+ JSON.stringify(changedData));
      if(changedData && changedData.id){
        this.loadInfluencers(changedData.id);
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
