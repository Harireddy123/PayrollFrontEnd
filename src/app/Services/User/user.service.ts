import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpService) {}

  reg(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
    return this.httpService.postService(
      'http://localhost:5000/api/Employee/Add',
      reqData,
      false,
      header
    );
  }
}
