import { Component, OnInit } from '@angular/core';
import { VisitanteService } from '../../services/visitante/visitante.service';
import { HttpResponse } from '@angular/common/http';
import { IVisitante } from '../../entities/visitante';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IMudanca } from '../../entities/mudanca';
import { MudancaService } from '../../services/mudanca/mudanca.service';
import { DatePipe } from '@angular/common';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatPaginator],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  displayedVisitantesColumns: string[] = ['nome', 'unidade', 'veiculo'];
  displayedMudancasColumns: string[] = ['Morador', 'unidade', 'tipo', 'data'];

  dataSourceVisitantes = new MatTableDataSource<IVisitante>();
  dataSourceMudancas = new MatTableDataSource<IMudanca>();

  pageSizeVisitante = 10;
  pageIndexVisitante = 0;
  pageSizeMudanca = 10;
  pageIndexMudanca = 0;
  totalElementsVisitante = 0;
  totalElementsMudanca = 0;

  constructor(
    private visitanteService: VisitanteService,
    private mudancaService: MudancaService
  ) { }

  ngOnInit(): void {
    this.loadDataVisitante();
    this.loadMudancas();
  }

  loadDataVisitante(): void {
    this.visitanteService.recuperarListaVisitantesDiario(this.pageIndexVisitante, this.pageSizeVisitante).subscribe({
      next: (res: HttpResponse<IVisitante[]>) => {
        this.onSuccessVisitante(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  protected onSuccessVisitante(data: any): void {
    this.dataSourceVisitantes.data = [...(data?.content || [])];
    this.totalElementsVisitante = data?.totalElements || 0;
  }

  loadMudancas(): void {
    this.mudancaService.findAll(this.pageIndexMudanca, this.pageSizeMudanca).subscribe({
      next: (res: HttpResponse<IMudanca[]>) => {
        this.onSuccessMudanca(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  protected onSuccessMudanca(data: any): void {
    this.dataSourceMudancas.data = [...(data?.content || [])];
    this.totalElementsMudanca = data?.totalElements || 0;
  }

  onPageChangeVisitante(event: PageEvent): void {
    this.pageIndexVisitante = event.pageIndex;
    this.pageSizeVisitante = event.pageSize;
    this.loadDataVisitante();
  }

  onPageChangeMudanca(event: PageEvent): void {
    this.pageIndexMudanca = event.pageIndex;
    this.pageSizeMudanca = event.pageSize;
    this.loadMudancas();
  }

}
  