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
import { IVeiculo } from '../../../entities/veiculo';
import { IUnidade } from '../../../entities/unidade';
import { MatSelect } from '@angular/material/select';
import { MudancaService } from '../../../services/mudanca/mudanca.service';
import { IMudanca } from '../../../entities/mudanca';
import { IMorador } from '../../../entities/morador';
import { MoradorService } from '../../../services/morador/morador.service';

@Component({
  selector: 'app-mudanca-form',
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
  templateUrl: './mudanca-form.component.html',
  styleUrl: './mudanca-form.component.scss'
})
export class MudancaFormComponent implements OnInit {

    form: FormGroup;
    isViewMode = false;
    isEditMode = false;
    moradores: IMorador[] = [];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: MudancaService,
      private moradorService: MoradorService
    ) {
    this.form = this.fb.group({
      id: [''],
      morador: ['', Validators.required],
      tipo: ['', Validators.required],
      data: [''],
      hora: ['']
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
    this.loadMoradores();
  }

  salvar(): void {
    if (this.form.valid) {
      this.service.create(this.configurarDataHora()).subscribe({
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

  configurarDataHora(): IMudanca {
      const data = this.form.get('data')?.value;
      const hora = this.form.get('hora')?.value;
      const dataFormatada =`${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}T${hora}:00`;
      const mudanca: IMudanca = { ...this.form.value, data: dataFormatada };
      return mudanca;
  }

  update(): void {
    if (this.form.valid) {
      const mudanca: IMudanca = this.form.value;
      this.service.update(mudanca).subscribe({
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
    this.router.navigate(['/mudanca']);
  }  

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }

  loadMoradores(): void {
    this.moradorService.findAllNotPage().subscribe({
      next: (data) => {
        this.moradores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de moradores', error);
      }
    });
  }

}
