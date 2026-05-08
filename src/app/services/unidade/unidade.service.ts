import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { IUnidade } from '../../entities/unidade';

export type EntityResponseType = HttpResponse<IUnidade>;
export type EntityArrayResponseType = HttpResponse<IUnidade[]>;

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/unidade');
  }

  create(unidade: IUnidade): Observable<EntityResponseType> {
    return this.http.post<IUnidade>(this.domain + this.resourceUrl + '/save', unidade, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUnidade>(`${this.domain}${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IUnidade[]>(`${this.domain}${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<IUnidade[]> {
    return this.http.get<IUnidade[]>(`${this.domain}${this.resourceUrl}/findAllNotPage`);
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IUnidade[]>(`${this.domain}${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(unidade: IUnidade): Observable<EntityResponseType> {
    return this.http.put<IUnidade>(
      `${this.domain}${this.resourceUrl}/update`, unidade, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
