import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get(`${environment.apiUrl}` + url);
  }

  post(url: string, params: any) {
    return this.httpClient.post(`${environment.apiUrl}` + url, params);
  }

  patch(url: string, params: any){
    return this.httpClient.patch(`${environment.apiUrl}` + url, params);
  }

  put(url: string, params: any){
    return this.httpClient.put(`${environment.apiUrl}` + url, params);
  }

  delete(url: string){
    return this.httpClient.delete(`${environment.apiUrl}` + url);
  }

  postFileWithParams(url: string, params: Record<string, any>): Observable<any> {
    const formData = new FormData();
    // Append additional fields
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (params[key] === null || params[key] === undefined) {
          continue;
        }

        if (key === 'contact') {
          formData.append('region_code', params[key]['dialCode']);
          formData.append('contact', params[key]['e164Number'].split(params[key]['dialCode'])[1]);
        } else if (key === 'other_contact') {
          formData.append('other_region_code', params[key]['dialCode']);
          formData.append('other_contact', params[key]['e164Number'].split(params[key]['dialCode'])[1]);
        } else {
          formData.append(key, params[key]);
        }
      }
    }
    return this.httpClient.post(`${environment.apiUrl}${url}`, formData);
  }
}
