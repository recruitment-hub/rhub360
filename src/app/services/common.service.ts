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

}
