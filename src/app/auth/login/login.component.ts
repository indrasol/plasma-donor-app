import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 
import { EmployeService } from 'src/app/services/employe.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
})
export class LoginComponent implements OnInit {
  
  public form!: UntypedFormGroup;
  public emailRegexp: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public formValue!: any;
  public loading = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private employeService: EmployeService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    if (this.form?.invalid) {
      return;
    }
    this.loading = true;
    const formData = this.form?.value;
    if (this.form.valid) {
      this.employeService
        .loginEmployee(formData.email, formData.password)
        .subscribe({
          next: (response) => {
            console.log('respnose'+ response); 
            if (response !== null && response.status && response.data) {
              let userObj = response.data; 
              console.log('navigate'+ userObj); 
              
              this.router.navigate(['/dashboard']);
            } else {
              this.showMessage('Sorry.invalid Username or Password');
            }
            this.loading = false; 
          },
          error: (error) => {
            console.log('error in validating employee', error);
            this.showMessage(
              'Error in validating employee.please try again later'
            );
            this.loading = false; 
          },
        });
    } else {
      this.showMessage('Form is invalid. Please fill all required fields.');
    }
  }

  showMessage(message: string): void {
    this._toastr.show(message);
  }
}
