import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { IPortao } from '../../entities/portao';

export type EntityResponseType = HttpResponse<IPortao>;
export type EntityArrayResponseType = HttpResponse<IPortao[]>;

@Injectable({
  providedIn: 'root'
})
export class PortaoService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/portao`);
  }

  create(contrato: IPortao): Observable<EntityResponseType> {
    return this.http.post<IPortao>(this.resourceUrl + '/save', contrato, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPortao>(`${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IPortao[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<IPortao[]> {
    return this.http.get<IPortao[]>(`${this.resourceUrl}/findAllNotPage`);
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IPortao[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  searchByNumeroContrato(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IPortao[]>(`${this.resourceUrl}/searchByNumeroContrato?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(contrato: IPortao): Observable<EntityResponseType> {
    return this.http.put<IPortao>(
      `${this.resourceUrl}/update`, contrato, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
