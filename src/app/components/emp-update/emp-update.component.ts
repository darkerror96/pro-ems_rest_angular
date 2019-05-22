import { Component, OnInit, Inject } from '@angular/core';

// IMPORTS FOR DIALOG

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  empId: number;
}

// IMPORTS FOR FORM

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
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class EmpUpdateComponent implements OnInit {

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
    private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {

    // TO OPEN DIALOG BOX ON PAGE LOAD
    this.openDialog();
  }

  ngOnInit() {
    this.empForm = this.fb.group({
      empArray: this.fb.array([
        this.fb.group({
          name: [, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
          age: [, Validators.required],
          gender: [, Validators.required]
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
          isManager: [],
          jobTitle: [, Validators.required],
          dept: [, Validators.required],
          salary: [, Validators.required],
          reportTo: [, [Validators.required, Validators.min(0)]]
        })
      ])
    });
  }

  // INIT EMP FORM WITH EXISTING DATA FIELD

  empDb: employee;

  initEmp() {
    this.empService.getEmp(this.empId)
      .subscribe(empResult => {
        // CONVERT JSON TO ENUM

        var empGender, empJob, empDept;
        // GENDER 
        if (empResult.gender.toString() === "FEMALE")
          empGender = 0;
        else if (empResult.gender.toString() === "MALE")
          empGender = 1;
        else
          empGender = 2;

        // JOB TITLE
        if (empResult.jobTitle.toString() === "FULL_STACK_DEVELOPER")
          empJob = 0;
        else if (empResult.jobTitle.toString() === "JAVA_DEVELOPER")
          empJob = 1;
        else
          empJob = 2;

        // DEPARTMENT
        if (empResult.dept.toString() === "DEVELOPER")
          empDept = 0;
        else if (empResult.dept.toString() === "HR")
          empDept = 1;
        else
          empDept = 2;

        this.empDb = new employee(empResult.eId, empResult.name, empResult.age, empGender, empResult.contactNo, empResult.aHome, empResult.aWork, empResult.ssn, empResult.email, empJob, empDept, empResult.salary, empResult.reportTo, empResult.isManager);

        this.initEmpForm();
      });
  }

  initEmpForm() {

    this.empForm = this.fb.group({
      empArray: this.fb.array([
        this.fb.group({
          name: [this.empDb.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
          age: [this.empDb.age, Validators.required],
          gender: [this.empDb.gender, Validators.required]
        }),
        this.fb.group({
          contactNo: [this.empDb.contactNo, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
          ssn: [this.empDb.ssn, [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
          email: [this.empDb.email, [Validators.required, Validators.email, Validators.maxLength(30)]]
        }),
        this.fb.group({
          hstreetAddress: [this.empDb.aHome.streetAddress, [Validators.required, Validators.maxLength(30)]],
          hcity: [this.empDb.aHome.city, [Validators.required, Validators.maxLength(25)]],
          hstate: [this.empDb.aHome.state, [Validators.required, Validators.maxLength(25)]],
          hcountry: [this.empDb.aHome.country, [Validators.required, Validators.maxLength(25)]],
          hzipCode: [this.empDb.aHome.zipCode, [Validators.required, Validators.min(1), Validators.max(99999)]]
        }),
        this.fb.group({
          wstreetAddress: [this.empDb.aWork.streetAddress, [Validators.required, Validators.maxLength(30)]],
          wcity: [this.empDb.aWork.city, [Validators.required, Validators.maxLength(25)]],
          wstate: [this.empDb.aWork.state, [Validators.required, Validators.maxLength(25)]],
          wcountry: [this.empDb.aWork.country, [Validators.required, Validators.maxLength(25)]],
          wzipCode: [this.empDb.aWork.zipCode, [Validators.required, Validators.min(1), Validators.max(99999)]]
        }),
        this.fb.group({
          isManager: [this.empDb.isManager],
          jobTitle: [this.empDb.jobTitle, Validators.required],
          dept: [this.empDb.dept, Validators.required],
          salary: [this.empDb.salary, Validators.required],
          reportTo: [this.empDb.reportTo, [Validators.required, Validators.min(0)]]
        })
      ])
    });
  }

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

    this.emp = new employee(this.empDb.eId, basic.get('name').value, basic.get('age').value, basic.get('gender').value,
      contact.get('contactNo').value, this.home, this.work, contact.get('ssn').value, contact.get('email').value,
      job.get('jobTitle').value, job.get('dept').value, job.get('salary').value, reportTo, job.get('isManager').value);

    console.log(this.emp);
    this.empService.updateEmp(this.emp).subscribe();

    this.showEmpAddSucc("Employee Updated...", 'Ok');

    this.router.navigateByUrl('/');
  }

  // SHOW Employee Added SUCCESS SNACKBAR
  showEmpAddSucc(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
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

  // DIALOG BOX FOR EMPLOYEE ID

  empId: number;

  openDialog(): void {
    const dialogRef = this.dialog.open(empIDialogU, {
      width: '240px',
      height: '242px',
      data: { empId: this.empId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.empId = result;
      if (result !== undefined) {
        this.initEmp();
      }
    });
  }
}

// DIALOG TO ENTER EMPOLYEE ID

@Component({
  selector: 'empIDialogU',
  templateUrl: 'empIDialogU.html',
})
export class empIDialogU {

  constructor(
    public dialogRef: MatDialogRef<empIDialogU>,
    @Inject(MAT_DIALOG_DATA) public emp: DialogData) { }

}