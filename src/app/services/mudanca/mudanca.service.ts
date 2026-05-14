import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';
import { IVisitante } from '../../entities/visitante';
import { IMudanca } from '../../entities/mudanca';

export type EntityResponseType = HttpResponse<IMudanca>;
export type EntityArrayResponseType = HttpResponse<IMudanca[]>;

@Injectable({
  providedIn: 'root'
})
export class MudancaService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/mudanca`);
  }
  
  create(mudanca: IMudanca): Observable<EntityResponseType> {
    return this.http.post<IMudanca>(this.resourceUrl + '/save', mudanca, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMudanca>(`${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IMudanca[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<IMudanca[]> {
    return this.http.get<IMudanca[]>(`${this.resourceUrl}/findAllNotPage`);
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IMudanca[]>(
      `${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(mudanca: IMudanca): Observable<EntityResponseType> {
    return this.http.put<IMudanca>(`${this.resourceUrl}/update`, mudanca, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
