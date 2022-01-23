import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from '../_common/const';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  createSession(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/user/admin`, body);
  }
}
