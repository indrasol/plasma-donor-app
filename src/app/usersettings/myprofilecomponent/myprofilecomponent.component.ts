import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myprofilecomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './myprofilecomponent.component.html',
})
export class MyprofilecomponentComponent implements OnInit {
infoForm: FormGroup;
  submitted = false;
  loading = false;
  companyLocations: any[] = [];
  roles: any[] = [];

  constructor(
    private employeService: EmployeService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.infoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3), Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(1), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(6), Validators.maxLength(18)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[- +()0-9]+$'), Validators.minLength(9), Validators.maxLength(12)]),
      companyLocationId: new FormControl('', [Validators.required]),
      roleId: new FormControl('', [Validators.required]),
      status: new FormControl(1, [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadCurrentUser();
    this.employeService.getAllCompanyLocations().subscribe((data: any) => {
      this.companyLocations = data;
    });
    this.employeService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    });
  }

  loadCurrentUser() {
    this.employeService.currentUser.subscribe(user => {
      if (user) {
        this.infoForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          companyLocationId: user.companyLocationId,
          roleId: user.roleId,
          status: user.status,
        });
      }
    });
  }

  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  get f() { return this.infoForm.controls; }

  saveForm() {
    console.log('saveForm clicked', this.infoForm.value);
    this.submitted = true;
    if (this.infoForm.invalid || this.infoForm.errors?.['mismatch']) {
      this.infoForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }
    this.loading = true;
    const updatedUser = { password: this.infoForm.value.password };
    const userId = this.employeService.userInfo?.id;
    if (!userId) {
      this.toastr.error('User ID not found');
      this.loading = false;
      return;
    }
    this.employeService.updateUser(userId, updatedUser).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('Password updated successfully');
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Failed to update password');
      }
    });
  }

  cancelForm() {
    console.log('cancelForm clicked');
    this.router.navigate(['/dashboard']);
  }
}
