import { Injectable } from '@angular/core';
import { BASE_URL } from '../api';
import { HttpClient } from '@angular/common/http';
import { DetailUser, UserLevel, UserResponse, Users } from '../models/all-user.model';
import { map, Observable } from 'rxjs';
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

  fetchUserAccessMenu(): Observable<string[]> {
    return this.http.get<{ data: string[] }>(`${this.baseUrl}/v1/admin/menu/list/`).pipe(
      map((response: { data: string[]; }) => response.data)
    );
  }

  fetchUserLevels(): Observable<UserLevel[]> {
    return this.http.get<{ data: UserLevel[] }>(`${this.baseUrl}/v1/admin/level/list/`).pipe(
      map((response: { data: UserLevel[]; }) => response.data)
    );
  }

  saveUser(payload : {
    company: number;
    email: string;
    full_name: string;
    username: string;
    level_menu: number;
    password: string;
    menu: string[];
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/admin/user/create/`, payload);
  }

  detailUser(id: number): Observable<DetailUser> {
    const payload = {
      id: id,
      types: 'user'
    }

    return this.http.post<{ data: DetailUser[] }>(`${this.baseUrl}/v1/admin/detail/`, payload).pipe(
      map((response: { data: DetailUser[]; }) => response.data[0])
    );
  }

  deleteUser(user: Users): Observable<any> {
    const payload = {
      id: user.id,
      username: user.usrname
    }
    return this.http.post<any>(`${this.baseUrl}/v1/admin/user/delete/`, payload);
  }
}
