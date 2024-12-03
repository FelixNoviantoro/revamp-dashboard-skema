import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCount, ProvinceCount } from '../models/all-count.model';
import { FilterRequestPayload } from '../models/request.model';
import { ArticleResponse } from '../models/article.model';
import { GEO_BASE_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private baseUrl = GEO_BASE_URL;

  constructor(private http: HttpClient) {}

  getGeoJsonData(): Observable<any> {
    return this.http.get<any>('assets/map.json');
  }

  getGeoJsonDataCities(): Observable<any> {
    return this.http.get<any>('assets/kota-kabupaten.json');
  }

  getGeoJsonDataProv(): Observable<any> {
    return this.http.get<any>('assets/indonesia-province.json');
  }

  getAllCount(filter: FilterRequestPayload): Observable<AllCount> {
    return this.http.post<AllCount>(`${this.baseUrl}/v2/all-count/`, {
      ...filter,
      maxSize: null,
      type_location: filter.type_location ?? 'article',
    });
  }

  getAllCountProv(filter: FilterRequestPayload, prov: string): Observable<ProvinceCount> {
    const params = {
      // start_date: filter.start_date ? `${filter.start_date} ${filter.start_time}` : '',
      // end_date: filter.end_date ? `${filter.end_date} ${filter.end_time}` : '',
      start_date: filter.start_date ? `${filter.start_date}` : '',
      end_date: filter.end_date ? `${filter.end_date}` : '',
      category_id: filter.category_id ?? '',
      category_set: filter.category_set ?? '',
      user_media_type_id: filter.user_media_type_id ?? '',
      type_location: 'article',
      province: prov ?? '',
    };
    return this.http.get<ProvinceCount>(`${this.baseUrl}/v1/provinces/articles/count`, {params});
  }

  getArticleByGeo(filter: FilterRequestPayload): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(`${this.baseUrl}/v2/article-by-geo/`, {
      size: 10,
      page: 0,
      ...filter,
      max_size: 16,
      type_location: filter.type_location ?? 'article',
    });
  }
}
