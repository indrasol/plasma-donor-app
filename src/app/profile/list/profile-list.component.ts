import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FormControl, FormGroup, Validators, AbstractControl,ValidatorFn,ValidationErrors } from "@angular/forms";

import { EmployeService } from "src/app/services/employe.service";
import { ButtonRendererComponent } from "src/app/components/button-renderer.component";
import { GridLoaderComponent } from "src/app/components/grid-loader.component";
import { ColDef } from 'ag-grid-community';
import { ToastrService } from "ngx-toastr";
import { MdService } from "src/app/services/md.service";
import { ProfileService } from "src/app/services/profile.service";
import { NgxGpAutocompleteDirective } from "@angular-magic/ngx-gp-autocomplete";
import { saveAs as importedSaveAs } from "file-saver";
import Swal from "sweetalert2";

@Component({
	templateUrl: 'profile-list.component.html'
})

export class ProfileListComponent {

	frameworkComponents: any;
	gridApi: any;
	gridColumnApi: any;
	gridList: any = [];
	infoForm: FormGroup;
	importForm: FormGroup;
	pageTitle = 'Profiles';
	detailsTitle = 'New Profile';
	isEdit = false;
	isImport = false;
	isUpdate = false;
	isNew = false;
	isRemove = false;
	public loading = false;
	public importing = false;
	public gridLoading = false;

	public occupations: any = [];
	public relationships: any = [];
	public races: any = [];
	public languages: any = [];
	public influencers: any = [];
	public relationshipScores: any = [];
	public relationshipstrengths: any = [];
	public educations: any = [];
	public homeCenters: any = [];
	public hobbies: any = [];
	public interests: any = [];
	selectedFile: any;
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

	constructor(private employeService: EmployeService, private route: ActivatedRoute
		, private toastr: ToastrService
		, private mdService: MdService
		, private profileService: ProfileService
	) {
		this.frameworkComponents = {
			buttonRenderer: ButtonRendererComponent,
			loadingCellRenderer: GridLoaderComponent,
		}
		this.infoForm = new FormGroup({
			'id': new FormControl(['']),
			'firstName': new FormControl('', [
				Validators.required,
				Validators.pattern('^[a-zA-Z]+$'),
				Validators.minLength(3),
				Validators.maxLength(15)
			]),
			'lastName': new FormControl('', [
				Validators.required,
				Validators.minLength(1),
				Validators.pattern('^[a-zA-Z]+$'),
				Validators.maxLength(15)
			]),
			'email': new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(32)
			]),
			'dob': new FormControl(['']),
			'isDonor': new FormControl(['']),

			'isInfluencer': new FormControl(['']),
			'influencerIds': new FormControl([]),
			'gender': new FormControl(['']),
			"phoneNumber": new FormControl('', [
				Validators.required,
				Validators.pattern('^[- +()0-9]+$'),
				Validators.minLength(9),
				Validators.maxLength(15),
			]),
			'occupationId': new FormControl(['']),
			'relationshipId': new FormControl(['']),
			'raceId': new FormControl(['']),
			'languageId': new FormControl(['']),
			'educationId': new FormControl(['']),
			'relshipStatus': new FormControl(['']),
			'relshipScoreId': new FormControl(['']),
			'homeCenterId': new FormControl(['']),
			'schoolAttended': new FormControl(['']),
			'hobbiesIds': new FormControl(['']),
			'interestIds': new FormControl(['']),
			'status': new FormControl([0]),

			"fullAddress": new FormControl(''),
			"addressLine1": new FormControl(''),
			"addressLine2": new FormControl(''),
			"city": new FormControl(''),
			"state": new FormControl(''),
			"stateCode": new FormControl(''),
			"postalCode": new FormControl(''),
			"country": new FormControl(''),
			"countryCode": new FormControl(''),

			"latitude": new FormControl(''),
			"longitude": new FormControl(''),



		});

		this.importForm = new FormGroup({

		});

	}

	ngOnInit() {
		this.loadProfiles();
		this.loadListBoxData();
		this.loadInfluencers();
		this.loadCompanyLocations();
	}
	get f(): { [key: string]: any } {
		return this.infoForm.controls;
	}

	 



	onGridReady(params: any) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;

	}

	loadListBoxData() {
		this.mdService.getProfileMasterData().subscribe((res: any) => {
			if (res) {
				const masterData = res.data;
				this.occupations = masterData.occupation;
				this.races = masterData.race;
				this.languages = masterData.language;
				this.educations = masterData.education;
				this.relationships = masterData.relationship;
				this.hobbies = masterData.hobbies;
				this.interests = masterData.interests;

			}

		});



	}

	loadCompanyLocations() {
		this.employeService.getAllCompanyLocations().subscribe((res: any) => {
			if (res && res.status) {
				this.homeCenters = res.data;
			}

		});
	}

	loadInfluencers() {
		this.profileService.getAllInfluencers(-1).subscribe((res: any) => {
			if (res.data) {
				this.influencers = res.data;
			}

		});
	}

	loadProfiles() {
		this.gridLoading = true;
		this.profileService.getAllProfiles().subscribe((res: any) => {
			if (res && res.status) {
				this.gridList = res.data;
			}
			this.gridLoading = false;
		});

	}

	onButtonClick(params: any, actType: any) {
		//console.log(' act type ' + actType + ":: " + JSON.stringify(params.rowData));
		if (params.rowData) {
			if(actType == 'edit'){
				var id = params.rowData._id;
				this.infoForm.reset();
				this.infoForm.patchValue(params.rowData);
				this.setDate(params.rowData.dob);
				this.pageTitle = 'Profile Details';
				this.isUpdate = true;
				this.isEdit = true;
			}else if(actType == 'remove'){
				this.removeEntry(params.rowData);
			}
		}
	}

	removeEntry(paramsData: any){
		const userId = paramsData.id;
		Swal.fire({
			title: "Do you want to delete the Profile?",
			 
			showCancelButton: true,
			confirmButtonText: "Delete",
			 
		  }).then((result) => {
			 
			if (result.isConfirmed) {
				// need to make a call to server and remove
				this.gridLoading = true;
				this.profileService.deleteProfile (userId).subscribe((res: any) => {
					if(res && res.status){
						Swal.fire("Deleted!", "", "success");
						this.refresh();
					}
				});
			}  
		  });
	}

	 

	cancelForm() {
		this.infoForm.reset();
		this.isEdit = false;
		this.pageTitle = 'Profile List';
		this.isUpdate = false;
		this.isNew = false;
	}

	setDate(dts: any){
		if(dts){
			console.log('dts::'+ dts);
			var parts =dts.split('-');
			var dt = new Date(parts[2], parts[0] - 1, parts[1]);
			this.infoForm.controls['dob'].setValue({year: dt.getFullYear(),  month: dt.getMonth()+1, day: dt.getDate()});
		}
	}

	createNew() {
		this.isEdit = true;
		this.isNew = true;
		this.pageTitle = 'New Profile';
		this.infoForm.reset();

	}

	saveForm() {
		this.submitted = true;
		var formData = this.infoForm.value;
		console.log(':is Valid:' + this.infoForm.valid + ";;" + this.infoForm.invalid);
		if (this.infoForm.invalid) {
			return;
		}

		this.loading = true;
		this.profileService.createProfile(formData).subscribe((res: any) => {
			if (res && res.status) {
				this.isEdit = false;
				this.pageTitle = 'Profile List';
				this.loadProfiles();
				if (this.isUpdate) {
					this.toastr.show('Profile updated successfully');
				} else {

					this.toastr.show('Profile added successfully');
				}
			} else {
				// toast message
				this.toastr.show(res.msg);
			}
			this.loading = false;
		});
	}

	refresh() {
		this.loadProfiles();
	}

	public handleAddressChange(place: any) {
		// Do some stuff
		const adComps = place.address_components;
		console.log(JSON.stringify(place));

		let addObj: any = {};
		for (let cmp of adComps) {
			console.log('cmp::' + cmp.types);
			if (cmp.types) {
				if (cmp.types.includes('locality') || cmp.types.includes('colloquial_area')) {
					addObj.city = cmp.long_name;

				} else if (cmp.types.includes('administrative_area_level_3')) {
					addObj.addressLine1 = cmp.long_name;

				} else if (cmp.types.includes('administrative_area_level_2')) {
					addObj.addressLine2 = cmp.long_name;

				} else if (cmp.types.includes('administrative_area_level_1')) {
					addObj.state = cmp.long_name;
					addObj.stateCode = cmp.short_name;

				} else if (cmp.types.includes('country')) {
					addObj.country = cmp.long_name;
					addObj.countryCode = cmp.short_name;


				} else if (cmp.types.includes('postal_code')) {
					addObj.zipcode = cmp.long_name;


				}

			}
		}
		const geol = place.geometry;
		console.log(JSON.stringify(geol));
		if (geol && geol.location) {
			addObj.latitude = geol.location.lat();
			addObj.longitude = geol.location.lng();
		}
		console.log(JSON.stringify(addObj));
		this.infoForm.patchValue(addObj);
	}

	downloadTemplate() {

		this.profileService.downloadTemplate().subscribe((blb: any) => {
			importedSaveAs(blb, 'profile_donor_template.xlsx');
		})

	}

	importProfilesDailog() {
		this.isImport = true;
		this.isEdit = false;
	}

	onFileSelected(event: any) {
		this.selectedFile = <File>event.target.files[0];
		//console.log("::-> "+ this.selectedFile.type);
		if(!this.selectedFile.type.includes('application/vnd')){
			//console.log(':: valid fiel')
			this.selectedFile = null;
			event.target.value = '';
			this.toastr.show('Invalid file');
		}
	}

	cancelImportForm() {
		this.isImport = false;
		this.isEdit = false;
	}

	importExcel() {

		this.importing = true;
		const fd = new FormData();
		if (!this.selectedFile) {
			return;
		}
		fd.append('xlFile', this.selectedFile, this.selectedFile.name);

		this.profileService.importExcel(fd).subscribe((ires: any) => {
			if (ires && ires.status) {
				this.toastr.info('Imported successfully');
				this.isImport = false;
				this.loadProfiles();
				this.loadListBoxData();
			} else {
				this.toastr.error('Import error:' + ires.msg);
			}
			this.importing = false;
		});



	}
	// deleteUser(id: number): void {
	// 	if (confirm('Are you sure you want to delete this employee?')) {
	// 	  this.profileService.deleteUser(id).subscribe(
	// 		response => {
	// 		  console.log('Employee deleted successfully');
	// 		  this.loadProfiles();  // Refresh the list after deletion
	// 		},
	// 		error => {
	// 		  console.error('Error deleting employee:', error);
	// 		}
	// 	  );
	// 	}
	//   }
	  

}
