import { Component, OnInit } from '@angular/core';
import { VisitanteService } from '../../services/visitante/visitante.service';
import { HttpResponse } from '@angular/common/http';
import { IVisitante } from '../../entities/visitante';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  visitantes: IVisitante[] = [];
  displayedVisitantesColumns: string[] = ['nome', 'unidade', 'veiculo'];
  displayedMudancasColumns: string[] = ['nome', 'unidade', 'veiculo'];

  constructor(
    private service: VisitanteService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.recuperarListaVisitantesDiario().subscribe({
      next: (data) => {
        this.visitantes = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de veículos', error);
      }
    });
  }

}
  