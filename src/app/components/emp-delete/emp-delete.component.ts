import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

// IMPORTS FOR DIALOG

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  empId: number;
}

@Component({
  selector: 'app-emp-delete',
  templateUrl: './emp-delete.component.html',
  styleUrls: ['./emp-delete.component.css']
})
export class EmpDeleteComponent implements OnInit {

  constructor(private empService: EmployeeService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    // TO OPEN DIALOG BOX ON PAGE LOAD
    this.openDialog();
  }

  ngOnInit() {
  }

  deleteEmp() {
    this.empService.deleteEmp(this.empId).subscribe();
    this.showEmpAddSucc("Employee Deleted...", 'Ok');
    this.router.navigateByUrl('/getEmps');
  }

  // DIALOG BOX FOR EMPLOYEE ID

  empId: number;

  openDialog(): void {
    const dialogRef = this.dialog.open(empIDialogD, {
      width: '240px',
      height: '242px',
      data: { empId: this.empId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.empId = result;
      if (result !== undefined) {
        this.deleteEmp();
      }
    });
  }

  // SHOW Employee Added SUCCESS SNACKBAR
  showEmpAddSucc(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}

// DIALOG TO ENTER EMPOLYEE ID

@Component({
  selector: 'empIDialogD',
  templateUrl: 'empIDialogD.html',
})
export class empIDialogD {

  constructor(
    public dialogRef: MatDialogRef<empIDialogD>,
    @Inject(MAT_DIALOG_DATA) public emp: DialogData) { }
}