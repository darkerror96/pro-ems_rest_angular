import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { homedir } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EMS AngulaRest';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        icon: 'group_add',
        label: 'Add Employee',
        link: './addEmp',
        index: 0
      }, {
        icon: 'edit',
        label: 'Update Employee',
        link: './updateEmp',
        index: 1
      }, {
        icon: 'search',
        label: 'Search Employee',
        link: './getEmps',
        index: 2
      },
      {
        icon: 'delete_forever',
        label: 'Delete Employee',
        link: './deleteEmp',
        index: 3
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}