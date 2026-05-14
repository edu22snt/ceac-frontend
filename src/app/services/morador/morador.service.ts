import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';
import { IMorador } from '../../entities/morador';

export type EntityResponseType = HttpResponse<IMorador>;
export type EntityArrayResponseType = HttpResponse<IMorador[]>;

@Injectable({
  providedIn: 'root'
})
export class MoradorService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/morador`);
  }

  create(repasse: IMorador): Observable<EntityResponseType> {
    return this.http.post<IMorador>(this.resourceUrl + '/save', repasse, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMorador>(`${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IMorador[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<IMorador[]> {
    return this.http.get<IMorador[]>(`${this.resourceUrl}/findAllNotPage`);
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IMorador[]>(
      `${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(repasse: IMorador): Observable<EntityResponseType> {
    return this.http.put<IMorador>(`${this.resourceUrl}/update`, repasse, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
