import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';
 

@Component({
  selector: 'app-d3-tree',
  templateUrl: './d3-tree.component.html'
})
export class D3TreeComponent implements OnInit {

  margin = { top: 0, right: 130, bottom: 0, left: 80 };
  treeData = {
    name: 'Nuram',
    children: [
       
       
    ],
  };

  

  constructor( private statService: StatService ) {

    
     
     
  }

  ngOnInit(): void {
    this.loadTreeData();
  }

  loadTreeData(){
    this.statService.getInfTreeData().subscribe(res =>{
      if(res.status){
        let tData = JSON.parse(JSON.stringify(this.treeData));
        tData.children =  res.data;
        this.treeData = tData;
      }
    });
  }
  selectedNode: any;
    nodeUpdated(node:any){
  }
  nodeSelected(node:any){
    this.selectedNode= node;
  }

}
