import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryChosen, CategoryResponse } from '../models/category.model';
import {
  MediaGroup,
  MediaListUpdate,
  MediaResponse,
} from '../models/media.model';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  private baseUrl = 'https://api.skema.co.id/api';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      `${this.baseUrl}/v1/user/categories/`
    );
  }

  createCategory(group_name: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/v1/user/create/group-category`,
      { group_name }
    );
  }

  deleteCategory(category_set: number): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/v1/user/delete/group-category`,
      { category_set }
    );
  }

  updateCategoryName(
    category_set: number,
    group_name: string
  ): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/v1/user/update/group-category`,
      { category_set, group_name }
    );
  }

  getSubCategoriesChosen(
    category_set: number
  ): Observable<{ data: CategoryChosen[] }> {
    return this.http.post<{ data: CategoryChosen[] }>(
      `${this.baseUrl}/v1/user/subcategory-chosen`,
      { category_set }
    );
  }

  updateSubCategoriesChosen(
    category_set: number,
    category_list: CategoryChosen[]
  ): Observable<{ data: CategoryChosen[] }> {
    return this.http.post<{ data: CategoryChosen[] }>(
      `${this.baseUrl}/v1/user/group-sub-category/update`,
      { category_set, category_list }
    );
  }

  getSubCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      `${this.baseUrl}/v1/user/subcategories/0`
    );
  }

  getMedias(): Observable<MediaResponse> {
    return this.http.get<MediaResponse>(`${this.baseUrl}/v1/user/medias/`);
  }

  getMediaGroups(
    user_media_type_id: number
  ): Observable<{ data: MediaGroup[] }> {
    return this.http.post<{ data: MediaGroup[] }>(
      `${this.baseUrl}/v1/user/media-groups/`,
      { user_media_type_id }
    );
  }

  updateSelectedMediaGroups(
    user_media_type_id: number,
    media_list: MediaListUpdate[]
  ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/user/media-chosen/update`, {
      user_media_type_id,
      media_list,
    });
  }

  createMedia(user_media_type_name_def: string): Observable<MediaResponse> {
    return this.http.post<MediaResponse>(
      `${this.baseUrl}/v1/user/media-group/create`,
      { user_media_type_name_def }
    );
  }

  updateMedia(
    user_media_type_id: number,
    user_media_type_name_def: string
  ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/user/media-group/update`, {
      user_media_type_id,
      user_media_type_name_def,
    });
  }

  deleteMedia(user_media_type_id: number): Observable<MediaResponse> {
    return this.http.post<MediaResponse>(
      `${this.baseUrl}/v1/user/media-group/delete`,
      { user_media_type_id }
    );
  }
}
