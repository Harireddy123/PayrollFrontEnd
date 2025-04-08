import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  postService(
    url: string,
    reqData: any,
    httpOptions: any = {},
    header: unknown
  ) {
    return this.httpClient.post(url, reqData, httpOptions);
  }

  postServiceReset(url: string, reqData: any, httpOptions: any = {}) {
    return this.httpClient.post(url, reqData, httpOptions);
  }

  getService(url: string, httpOptions: any = {}) {
    return this.httpClient.get(url, httpOptions);
  }

  putService(url: string, reqData: any, httpOptions: any = {}) {
    return this.httpClient.put(url, reqData, httpOptions);
  }
}
