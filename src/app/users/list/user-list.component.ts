import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

import { EmployeService } from "src/app/services/employe.service";
import { ButtonRendererComponent } from "src/app/components/button-renderer.component";
import { GridLoaderComponent } from "src/app/components/grid-loader.component";
import { ColDef } from 'ag-grid-community';
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
@Component({
	templateUrl: './user-list.component.html'
})
export class UserListComponent {

	frameworkComponents: any;
	gridApi: any;
	gridColumnApi: any;
	gridList: any = [];
	infoForm: FormGroup;
	pageTitle = 'Users';
	detailsTitle = 'New User';
	isEdit = false;
	isRemove =false;
	public deleteUser = false;
	public loading = false;
	public gridLoading = false;
	public companyLocations: any = [];
	public roles: any = [];
	public status: any = [{
		id: "1",
		status: 'Active'
	},
	{
		id: "0",
		status: 'Inactive'
	}];
	public submitted = false;

	gridColDefs: ColDef[] = [
		{
			field: 'Actions', pinned: 'left', width: 120, cellRenderer: 'buttonRenderer', cellRendererParams: {
				onClick: this.onButtonClick.bind(this),
				btns: [{ "actType": "edit", "clz": "bi bi-pencil-square" }, { "actType": "remove", "clz": "bi bi-trash3-fill" }]
			},
		},
		{ field: '_id', headerName: 'Id', hide: true },

		{
			field: 'email', headerName: 'EmailId', pinned: 'left', width: 280, filter: true, sortable: true,

		},
		{
			field: 'firstName', headerName: 'First Name', width: 280, filter: true, sortable: true,

		},
		{
			field: 'lastName', headerName: 'Last Name', width: 280, filter: true, sortable: true,

		},
		{
			field: 'phoneNumber', headerName: 'Phone Number', width: 280, filter: true, sortable: true,

		},

		{
			field: 'status', headerName: 'Status', width: 150, filter: true, sortable: true,

		},
		{
			field: 'createdOn', headerName: 'Created On', width: 250, filter: true, sortable: true,

		},
		{
			field: 'updatedOn', headerName: 'Updated On', width: 250, filter: true, sortable: true,

		},


	];

	constructor(private employeService: EmployeService, private route: ActivatedRoute
		, private toastr: ToastrService
	) {
		this.frameworkComponents = {
			buttonRenderer: ButtonRendererComponent,
			loadingCellRenderer: GridLoaderComponent,
		}
		this.infoForm = new FormGroup({
			'firstName': new FormControl('', [
				Validators.required,
				Validators.pattern('^[a-zA-Z]+$'),
				Validators.minLength(3),
				Validators.maxLength(15)
			]),
			'lastName': new FormControl('', [
				Validators.required,
				Validators.pattern('^[a-zA-Z]+$'),
				Validators.minLength(1),
				Validators.maxLength(15)
			]),
			'id': new FormControl(''),
			'email': new FormControl('', [
				Validators.required,
				
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(32)
			]),
			'status': new FormControl(0, [
				Validators.required,
			]),
			"password": new FormControl('', [
				Validators.required,
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
				Validators.minLength(6),
				Validators.maxLength(18),
			]),
			"phoneNumber": new FormControl('', [
				Validators.required,
				Validators.pattern('^[- +()0-9]+$'),
				Validators.minLength(9),
				Validators.maxLength(12),
			]),
			"companyLocationId": new FormControl('',[
				Validators.required,
			]),
			"roleId": new FormControl('',[
				Validators.required,
			]),
		});

	}

	ngOnInit() {
		this.loadUsers();
		this.loadCompanyLocations();
		this.loadRoles();

	}
	get f(): { [key: string]: any } {
		return this.infoForm.controls;
	}



	onGridReady(params: any) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;

	}

	loadUsers() {
		if(this.gridApi){
			this.gridApi.showLoadingOverlay();
		}else{
			this.gridLoading = true;
		}
		this.employeService.getAllEmployees().subscribe((res: any) => {
			if (res) {
				this.gridList = res;
			}
			this.gridLoading = false;
			this.gridApi.hideOverlay();
		});

	}
	loadCompanyLocations() {
		this.employeService.getAllCompanyLocations().subscribe((res: any) => {
			if (res && res.status) {
				this.companyLocations = res.data;
			}

		});
	}

	loadRoles() {

		this.employeService.getAllRoles().subscribe((res: any) => {
			if (res && res.status) {
				this.roles = res.data;
			}

		});
	}
	

	onButtonClick(params: any, actType: any) {
		//console.log(' act type ' + actType + ":: " + JSON.stringify(params.rowData));
		if(params.rowData){
			if (actType == 'edit') {
				var id = params.rowData._id;
				this.infoForm.reset();
				this.infoForm.patchValue(params.rowData);
				this.pageTitle = 'User Details';
	
				this.isEdit = true;
			}else if(actType == 'remove'){
				this.removeEntry(params.rowData);
			}

		}
	}
	 

	cancelForm() {
		this.infoForm.reset();
		this.isEdit = false;
		this.isRemove = false;
		this.pageTitle = 'User List';
	}

	createNew() {
		this.isEdit = true;

		this.pageTitle = 'New User';
		this.infoForm.reset();

	}

	saveForm() {
		var formData = this.infoForm.value;
		this.submitted = true;
		if(formData.id){
			console.log('its edit'+ formData.id);
			 
		}
		console.log(':is Valid:' + this.infoForm.valid + ";;" + this.infoForm.invalid);

		if (this.infoForm.invalid) {
			 
			return;
		}
			
		this.loading = true;
		this.employeService.createUser(formData).subscribe((res: any) => {
			if (res && res.status) {
				this.isEdit = false;
				this.pageTitle = 'User List';
				this.loadUsers();
				this.toastr.show('User added/updated successfully');
			} else {
				// toast message
				this.toastr.show(res.msg);
			}
			this.loading = false;
		});
	}

	removeEntry(paramsData: any){
		const userId = paramsData.id;
		Swal.fire({
			title: "Do you want to delete the User?",
			 
			showCancelButton: true,
			confirmButtonText: "Delete",
			 
		  }).then((result) => {
			 
			if (result.isConfirmed) {
				// need to make a call to server and remove
				this.gridApi.showLoadingOverlay();
				this.employeService.deleteUser(userId).subscribe((res: any) => {
					if(res && res.status){
						Swal.fire("Deleted!", "", "success");
						this.refresh();
					}
				});
			}  
		  });
	}

	refresh() {
		this.loadUsers();
	}

}
