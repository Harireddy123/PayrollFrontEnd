import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpService) {}

  Register(reqData: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.PostService(
      'http://localhost:5000/api/Employee/Add',
      reqData,
      headers
    );
  }

  getEmployees() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.getService(
      'http://localhost:5000/api/Employee/GetAllEmployees',
      headers
    );
  }

  deleteEmployee(id: number) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.deleteService(
      `http://localhost:5000/api/Employee/Delete/${id}`,
      headers
    );
  }

  updateEmployee(id: number, reqData: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.putService(
      `http://localhost:5000/api/Employee/Update/${id}`,
      reqData,
      headers
    );
  }
  // getEmployeeById(id: number) {
  //   let headers = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.getServiceById(`https://localhost:7138/api/employee/${id}`, headers);
  // }

  getEmployeeById(id: number) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    const url = `https://localhost:7138/api/employee/${id}`;
    return this.http.getServiceById(url, headers);
  }
}
