import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';

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

  put(url: string, params: any){
    return this.httpClient.put(`${environment.apiUrl}` + url, params);
  }

  delete(url: string){
    return this.httpClient.delete(`${environment.apiUrl}` + url);
  }

  uploadCV(params: any) {

    let formData = new FormData();
    formData.append('cv', params.cv, params.cv.name);
    formData.append('tokenID', params.tokenID);

    if (params.candidate_id) {
      formData.append('candidate_id', params.candidate_id);
    }

    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Accept": "application/json" })
    }
    return this.httpClient.post(`${environment.apiUrl}` + 'upload_cv', formData, HttpUploadOptions);
  }
}
