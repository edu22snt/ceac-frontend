import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';
import { IVisitante } from '../../entities/visitante';

export type EntityResponseType = HttpResponse<IVisitante>;
export type EntityArrayResponseType = HttpResponse<IVisitante[]>;

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/visitante');
  }
  
  create(visitante: IVisitante): Observable<EntityResponseType> {
    return this.http.post<IVisitante>(this.domain + this.resourceUrl + '/save', visitante, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVisitante>(`${this.domain}${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IVisitante[]>(`${this.domain}${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<IVisitante[]> {
    return this.http.get<IVisitante[]>(`${this.domain}${this.resourceUrl}/findAllNotPage`);
  }

  recuperarListaVisitantesDiario(page: number = 0, size: number = 10) {
    return this.http.get<IVisitante[]>(`${this.domain}${this.resourceUrl}/recuperarListaVisitantesDiario?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IVisitante[]>(
      `${this.domain}${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(visitante: IVisitante): Observable<EntityResponseType> {
    return this.http.put<IVisitante>(`${this.domain}${this.resourceUrl}/update`, visitante, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
