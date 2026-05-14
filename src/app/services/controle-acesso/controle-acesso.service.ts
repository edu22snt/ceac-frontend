import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { IControleAcesso } from '../../entities/controle-acesso';

export type EntityResponseType = HttpResponse<IControleAcesso>;
export type EntityArrayResponseType = HttpResponse<IControleAcesso[]>;

@Injectable({
  providedIn: 'root'
})
export class ControleAcessoService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/controleAcesso`);
  }

  create(prestacao: IControleAcesso): Observable<EntityResponseType> {
    return this.http.post<IControleAcesso>(this.resourceUrl + '/save', prestacao, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IControleAcesso>(`${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IControleAcesso[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<IControleAcesso[]> {
    return this.http.get<IControleAcesso[]>(`${this.resourceUrl}/findAllNotPage`);
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IControleAcesso[]>(
      `${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(prestacao: IControleAcesso): Observable<EntityResponseType> {
    return this.http.put<IControleAcesso>(
      `${this.resourceUrl}/update`, prestacao, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
