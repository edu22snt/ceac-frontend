import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelect, MatOption } from "@angular/material/select";
import { UnidadeService } from '../../../services/unidade/unidade.service';
import { IUnidade } from '../../../entities/unidade';
import { ICondominio } from '../../../entities/condominio';

@Component({
  selector: 'app-unidade-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardActions,
    MatFormFieldModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelect,
    MatOption
],
  templateUrl: './unidade-form.component.html',
  styleUrl: './unidade-form.component.scss'
})
export class UnidadeFormComponent implements OnInit {

  form: FormGroup;
  isViewMode = false;
  isEditMode = false;
  condominios: ICondominio[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: UnidadeService
    ) {
    this.form = this.fb.group({
      id: [''],
      bloco: ['', Validators.required],
      apartamento: ['', Validators.required],
      condominio: ['', Validators.required],
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
  }
  
  salvar(): void {
    if (this.form.valid) {
      const unidade: IUnidade = this.form.value;
      this.service.create(unidade).subscribe({
        next: () => {
          this.voltar();
          this.snackBar.open('Salvo com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: () => {

          this.snackBar.open('Erro ao salvar, possivelmente já exista essa unidade', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  update(): void {
    if (this.form.valid) {
      const unidade: IUnidade = this.form.value;
      this.service.update(unidade).subscribe({
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
    this.router.navigate(['/unidade']);
  }

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }


}
