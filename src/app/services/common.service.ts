import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${url}`, data);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${url}`, data);
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${url}`);
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}${url}`);
  }

  public fileUpload(context: string, fileToUpload): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<any>(environment.apiUrl + context, formData);
  }

  presentToast(message) {
    this.snackbar.open(message, '', {
      duration: 3000
    });
  }

  emitChange() {
    this.emitChangeSource.next();
  }
  getEnrichmentData(linkedin) {
    return this.http.get(`https://api.peopledatalabs.com/v5/person/enrich?pretty=true&api_key=48a7d6de5276f50b8e4e4e709c7d9cb2d208e6ab75fbbbb3cecc57297ffb6357&profile=www.linkedin.com/in/seanthorne`)
  }
}
