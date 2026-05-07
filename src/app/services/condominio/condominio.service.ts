import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { ICondominio } from '../../entities/condominio';

export type EntityResponseType = HttpResponse<ICondominio>;
export type EntityArrayResponseType = HttpResponse<ICondominio[]>;

@Injectable({
  providedIn: 'root'
})
export class CondominioService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/condominio');
  }

  create(contrato: ICondominio): Observable<EntityResponseType> {
    return this.http.post<ICondominio>(this.domain + this.resourceUrl + '/save', contrato, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICondominio>(`${this.domain}${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<ICondominio[]>(`${this.domain}${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<ICondominio[]>(`${this.domain}${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(contrato: ICondominio): Observable<EntityResponseType> {
    return this.http.put<ICondominio>(
      `${this.domain}${this.resourceUrl}/update`, contrato, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
