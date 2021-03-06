import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url='http://localhost:80/BE/';
  url = 'http://13.233.221.76/BE/'; // use AWS instance

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  post(path,data) {
    return this.httpClient.post(this.url + path, JSON.stringify(data), this.httpOptions)
    .map(res => (res as any));
  }
}
