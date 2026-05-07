import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';
import { IVeiculo } from '../../entities/veiculo';

export type EntityResponseType = HttpResponse<IVeiculo>;
export type EntityArrayResponseType = HttpResponse<IVeiculo[]>;

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/veiculo');
  }
  
  create(veiculo: IVeiculo): Observable<EntityResponseType> {
    return this.http.post<IVeiculo>(this.domain + this.resourceUrl + '/save', veiculo, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVeiculo>(`${this.domain}${this.resourceUrl}/veiculo/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IVeiculo[]>(`${this.domain}${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IVeiculo[]>(
      `${this.domain}${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(veiculo: IVeiculo): Observable<EntityResponseType> {
    return this.http.put<IVeiculo>(`${this.domain}${this.resourceUrl}/update`, veiculo, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
