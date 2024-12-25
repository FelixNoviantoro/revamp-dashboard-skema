import { Injectable } from '@angular/core';
import { BASE_URL } from '../api';
import { HttpClient } from '@angular/common/http';
import { UserResponse, Users } from '../models/all-user.model';
import { Observable } from 'rxjs';
import { FilterRequestPayload } from '../models/request.model';
import { CompanyResponse } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  fetchUserList(filter: FilterRequestPayload): Observable<UserResponse> {
    console.log(`filter page ${filter.page}`)
    return this.http.post<UserResponse>(`${this.baseUrl}/v1/admin/list/`,
      {
        "order": "ASC",
        "order_by": "company",
        "types": 'user',
        "page": filter.page ?? 0,
        "max_size": filter.size ?? 10
      }
    );
  }

  fetchCompanyList(filter: FilterRequestPayload): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${this.baseUrl}/v1/admin/list/`,
      {
        "order": "ASC",
        "order_by": "company",
        "types": 'company',
        "page": filter.page ?? 0,
        "max_size": filter.size ?? 10
      }
    );
  }
}
