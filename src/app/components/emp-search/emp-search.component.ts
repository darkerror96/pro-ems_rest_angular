import { Component, OnInit, Input } from '@angular/core';

import { employee } from 'src/app/model/employee';

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css']
})
export class EmpSearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmps();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.getEmp(id);
    }
  }

  // UPDATE EMPLOYEE
  updateEmp(empId: number, name: string) {
    this.showEmpId("Employee Id - ( " + empId + ' ) ' + name, '');
    this.router.navigateByUrl('/updateEmp');
  }

  // DELETE EMPLOYEE
  deleteEmp(empId: number) {
    this.empService.deleteEmp(empId).subscribe();
    console.log("Deleted " + empId);
    this.showEmpAddSucc("Employee Deleted...", 'Ok');
    this.router.navigateByUrl('/');
  }

  // GET ALL EMPLOYEE
  emps: employee[];

  getEmps(): void {
    this.empService.getEmps()
      .subscribe(emps => this.emps = emps);
  }

  // GET EMPLOYEE based on EID
  emp: employee;

  getEmp(id: number): void {
    this.empService.getEmp(id)
      .subscribe(emp => this.emp = emp);
  }

  // SHOW Employee Added SUCCESS SNACKBAR
  showEmpAddSucc(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // SHOW Employee Id SNACKBAR
  showEmpId(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
