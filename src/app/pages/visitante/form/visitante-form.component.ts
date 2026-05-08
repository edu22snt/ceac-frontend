import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardTitle, MatCardContent, MatCardActions, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { VisitanteService } from '../../../services/visitante/visitante.service';
import { IVisitante } from '../../../entities/visitante';
import { IVeiculo } from '../../../entities/veiculo';
import { IUnidade } from '../../../entities/unidade';
import { MatSelect } from '@angular/material/select';
import { UnidadeService } from '../../../services/unidade/unidade.service';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';

@Component({
  selector: 'app-visitante-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatCardActions,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelect,
    MatOption
],
  templateUrl: './visitante-form.component.html',
  styleUrl: './visitante-form.component.scss'
})
export class VisitanteFormComponent implements OnInit {

    form: FormGroup;
    isViewMode = false;
    isEditMode = false;
    veiculos: IVeiculo[] = [];
    unidades: IUnidade[] = [];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: VisitanteService,
      private unidadeService: UnidadeService,
      private veiculoService: VeiculoService
    ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: ['', Validators.required],
      unidade: ['', Validators.required],
      veiculo: [''],
      dataEntrada: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.routeConfig?.path;
    this.isViewMode = url?.includes('view') || false;
    this.isEditMode = url?.includes('edit') || false;

    if (id) {
      this.loadById(+id);
    }
    if (this.isViewMode) {
      this.form.disable();
    }
    this.loadUnidades();
    this.loadVeiculos();
  }

  salvar(): void {
    if (this.form.valid) {
      const visitante: IVisitante = this.form.value;
      this.service.create(visitante).subscribe({
        next: () => {
        this.voltar();
        this.snackBar.open('Salvo com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        },
        error: () => {
        this.snackBar.open('Erro ao salvar', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        }
      });
    }
  }

  update(): void {
    if (this.form.valid) {
      const visitante: IVisitante = this.form.value;
      this.service.update(visitante).subscribe({
        next: () => {
        this.voltar();
        this.snackBar.open('Alterado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        },
        error: () => {
        this.snackBar.open('Erro ao alterar', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        }
      });
    }
  }

  voltar(): void {
    this.form.reset();
    this.router.navigate(['/visitante']);
  }  

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }

  formatarTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

    valor = valor.substring(0, 15);

    this.form.get('telefone')?.setValue(valor, {
      emitEvent: false
    });
  }

  loadUnidades(): void {
    this.unidadeService.findAllNotPage().subscribe({
      next: (data) => {
        this.unidades = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de unidades', error);
      }
    });
  }

  loadVeiculos(): void {
    this.veiculoService.findAllNotPage().subscribe({
      next: (data) => {
        this.veiculos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de veículos', error);
      }
    });
  }

}
