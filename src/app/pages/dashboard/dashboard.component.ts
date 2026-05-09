import { Component, OnInit } from '@angular/core';
import { VisitanteService } from '../../services/visitante/visitante.service';
import { HttpResponse } from '@angular/common/http';
import { IVisitante } from '../../entities/visitante';
import { MatTableModule } from '@angular/material/table';
import { IMudanca } from '../../entities/mudanca';
import { MudancaService } from '../../services/mudanca/mudanca.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  visitantes: IVisitante[] = [];
  mudancas: IMudanca[] = [];
  displayedVisitantesColumns: string[] = ['nome', 'unidade', 'veiculo'];
  displayedMudancasColumns: string[] = ['Morador', 'tipo', 'data'];

  constructor(
    private service: VisitanteService,
    private mudancaService: MudancaService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.loadMudancas();
  }

  loadData(): void {
    this.service.recuperarListaVisitantesDiario().subscribe({
      next: (data) => {
        this.visitantes = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de visitantes', error);
      }
    });
  }

  loadMudancas(): void {
    this.mudancaService.findAllNotPage().subscribe({
      next: (data) => {
        this.mudancas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de mudanças', error);
      }
    });
  }

}
  