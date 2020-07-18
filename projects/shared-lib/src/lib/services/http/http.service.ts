import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable()

export class HttpService {

  private readonly auth = 'x-Token';
  private readonly content = 'Content-type';
  private readonly accept = 'Accept';
  private readonly type = 'application/ls+json';
  private readonly default = 'application/ld+json';

  constructor(
    private http: HttpClient
  ) {
  }

  public get<T>(url: string,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, {headers: this.createHeaders(headers), params});
  }

  public post<T>(url: string,
                 body: any | null,
                 headers?: HttpHeaders,
                 params?: HttpParams): Observable<T> {
    return this.http.post<T>(url, body, {headers: this.createHeaders(headers), params});
  }

  public put<T>(url: string,
                body: any | null,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.put<T>(url, body, {headers: this.createHeaders(headers), params});
  }

  public delete<T>(url: string,
                   headers?: HttpHeaders,
                   params?: HttpParams): Observable<T> {
    return this.http.delete<T>(url, {headers: this.createHeaders(headers), params});
  }

// tslint:disable-next-line: variable-name
  private createHeaders(_headers?: HttpHeaders): HttpHeaders {
    const contentType = _headers ? (_headers.get(this.type) || this.default) : this.default;
    const accept = _headers ? (_headers.get(this.accept) || this.default) : this.default;
    const headers = _headers || new HttpHeaders();

    const token = AuthService.getToken();
    const httpHeaders = headers
      .set(this.content, contentType)
      .set(this.accept, accept);
    if (token){
      httpHeaders
        .set(this.auth, token)
    }
    return httpHeaders;
  }
}
