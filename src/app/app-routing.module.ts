import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpSearchComponent } from './components/emp-search/emp-search.component';
import { EmpAddComponent } from './components/emp-add/emp-add.component';
import { EmpUpdateComponent } from './components/emp-update/emp-update.component';
import { EmpDeleteComponent } from './components/emp-delete/emp-delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/getEmps', pathMatch: 'full' },
  { path: 'addEmp', component: EmpAddComponent },
  { path: 'getEmps', component: EmpSearchComponent },
  { path: 'getEmp/:id', component: EmpSearchComponent },
  { path: 'updateEmp', component: EmpUpdateComponent },
  { path: 'deleteEmp', component: EmpDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }