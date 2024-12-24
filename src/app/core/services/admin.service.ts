import { Injectable } from '@angular/core';
import { BASE_URL } from '../api';
import { HttpClient } from '@angular/common/http';
import { UserResponse, Users } from '../models/all-user.model';
import { Observable } from 'rxjs';
import { FilterRequestPayload } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getAllUsers(filter: FilterRequestPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/v1/admin/list/`,
      {
        "order": "ASC",
        "order_by": "company",
        "types": "user",
        "page": filter.page ?? 0,
        "max_size": filter.size ?? 10
      }
    );
  }
}
