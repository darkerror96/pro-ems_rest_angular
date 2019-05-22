import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { employee } from '../model/employee';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmp(emp: employee): Observable<string> {
    return this.http.post<string>('http://localhost:8080/employee/create', emp).pipe(
      catchError(this.handleError<string>('addEmp')));
  }

  updateEmp(emp: employee): Observable<string> {
    return this.http.put<string>('http://localhost:8080/employee/update?empId=' + emp.eId, emp).pipe(
      catchError(this.handleError<string>('updateEmp')));
  }

  deleteEmp(empId: number): Observable<string> {
    return this.http.delete<string>('http://localhost:8080/employee/delete?empId=' + empId).pipe(
      catchError(this.handleError<string>('deleteEmp')));
  }

  getEmp(id: number): Observable<employee> {
    return this.http.get<employee>('http://localhost:8080/employee/getId?empId=' + id).pipe(
      catchError(this.handleError<employee>('getEmpById')));
  }

  getEmps(): Observable<employee[]> {
    return this.http.get<employee[]>('http://localhost:8080/employee/getAll').pipe(
      catchError(this.handleError<employee[]>('getEmps')));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}