import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RelatorioService } from '../../services/relatorio/relatorio.service';
import { IVisitante } from '../../entities/visitante';
import { VisitanteService } from '../../services/visitante/visitante.service';

@Component({
  selector: 'app-visitante',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    DatePipe,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    RouterLink
],
  templateUrl: './visitante.component.html',
  styleUrl: './visitante.component.scss'
})
export class VisitanteComponent implements OnInit {

  displayedColumns: string[] = [
    'nome',
    'documento',
    'telefone',
    'unidade',
    'veiculo',
    'dataEntrada',
    'acoes'
  ];

  dataSource = new MatTableDataSource<IVisitante>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';
  totalComissaoGi3 = 0;
  totalComissaoLiquida = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: VisitanteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private relatorioService: RelatorioService

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.findAll(this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IVisitante[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  searchByKeyword(): void {
    this.pageIndex = 0;
    this.service.searchByKeyword(this.searchItem, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IVisitante[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  private clearList(): void {
    this.dataSource.data = [];
  }

  protected onSuccess(data: any): void {
    this.clearList();
    this.dataSource.data = [...(data?.content || [])];
    this.totalElements = data?.totalElements || 0;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe({
      next: (res) => {
        console.log('Resposta da exclusão:', res);
        this.loadData();
        this.snackBar.open('Excluído com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error('Erro ao excluir:', err);
        this.snackBar.open('Erro ao excluir', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  new(): void {
    this.router.navigate(['/visitante-form']);
  }

  imprimir(): void {
    this.relatorioService.relatorioBancorbras(this.searchItem);
  }

}
