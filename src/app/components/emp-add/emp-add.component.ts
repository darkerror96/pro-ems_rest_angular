import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { employee } from 'src/app/model/employee';
import { address } from 'src/app/model/address';
import { Router } from '@angular/router';

export interface CommonArray {
  value: number;
  name: string;
}

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class EmpAddComponent implements OnInit {

  genders: CommonArray[] = [
    { value: 0, name: 'Female' },
    { value: 1, name: 'Male' },
    { value: 2, name: 'Others' }
  ];

  jobs: CommonArray[] = [
    { value: 0, name: 'Full Stack Developer' },
    { value: 1, name: 'Java Developer' },
    { value: 2, name: 'Web Developer' }
  ];

  depts: CommonArray[] = [
    { value: 0, name: 'Developer' },
    { value: 1, name: 'Human Resources' },
    { value: 2, name: 'Sales' }
  ];

  empMan: CommonArray[] = [
    { value: 0, name: 'Employee' },
    { value: 1, name: 'Manager' }
  ];

  /** Returns a FormArray with the name 'formArray'. */
  get empArray(): AbstractControl | null { return this.empForm.get('empArray'); }

  constructor(private fb: FormBuilder, private empService: EmployeeService,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    this.empForm = this.fb.group({
      empArray: this.fb.array([
        this.fb.group({
          name: [, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
          age: [18, Validators.required],
          gender: [1, Validators.required]
        }),
        this.fb.group({
          contactNo: [, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
          ssn: [, [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
          email: [, [Validators.required, Validators.email, Validators.maxLength(30)]]
        }),
        this.fb.group({
          hstreetAddress: [, [Validators.required, Validators.maxLength(30)]],
          hcity: [, [Validators.required, Validators.maxLength(25)]],
          hstate: [, [Validators.required, Validators.maxLength(25)]],
          hcountry: [, [Validators.required, Validators.maxLength(25)]],
          hzipCode: [, [Validators.required, Validators.min(1), Validators.max(99999)]]
        }),
        this.fb.group({
          wstreetAddress: [, [Validators.required, Validators.maxLength(30)]],
          wcity: [, [Validators.required, Validators.maxLength(25)]],
          wstate: [, [Validators.required, Validators.maxLength(25)]],
          wcountry: [, [Validators.required, Validators.maxLength(25)]],
          wzipCode: [, [Validators.required, Validators.min(1), Validators.max(99999)]]
        }),
        this.fb.group({
          isManager: [0],
          jobTitle: [1, Validators.required],
          dept: [0, Validators.required],
          salary: [1, Validators.required],
          reportTo: [, [Validators.required, Validators.min(0)]]
        })
      ])
    });
  }

  // SALARY SLIDER APPENDING K
  formatSalary(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  // TWO WAY DATA BINDING
  empTW: employee;

  // FORM SUBMIT
  empForm: FormGroup;
  emp: employee;
  home: address;
  work: address;

  onSubmit() {

    var arrayControl = this.empForm.get('empArray') as FormArray;
    var basic = arrayControl.at(0);
    var contact = arrayControl.at(1);
    var home = arrayControl.at(2);
    var work = arrayControl.at(3);
    var job = arrayControl.at(4);

    this.home = new address(2, home.get('hstreetAddress').value, home.get('hcity').value, home.get('hstate').value, home.get('hcountry').value, home.get('hzipCode').value);
    this.work = new address(3, work.get('wstreetAddress').value, work.get('wcity').value, work.get('wstate').value, work.get('wcountry').value, work.get('wzipCode').value);

    var reportTo = job.get('reportTo').value;
    if (job.get('isManager').value === 1) {
      reportTo = 0;
    }

    this.emp = new employee(1, basic.get('name').value, basic.get('age').value, basic.get('gender').value,
      contact.get('contactNo').value, this.home, this.work, contact.get('ssn').value, contact.get('email').value,
      job.get('jobTitle').value, job.get('dept').value, job.get('salary').value, reportTo, job.get('isManager').value);

    console.log(this.emp);
    this.empService.addEmp(this.emp).subscribe();

    this.showEmpAddSucc("Employee Added...", 'Ok');

    this.router.navigateByUrl('/');
  }

  // SHOW Employee Added SUCCESS SNACKBAR
  showEmpAddSucc(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}