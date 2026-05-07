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
import { ControleAcessoService } from '../../../services/controle-acesso/controle-acesso.service';
import { MatSelect, MatOption } from "@angular/material/select";
import { IControleAcesso } from '../../../entities/controle-acesso';
import { IPortao } from '../../../entities/portao';
import { PortaoService } from '../../../services/portao/portao.service';

@Component({
  selector: 'app-controle-acesso-form',
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
  templateUrl: './controle-acesso-form.component.html',
  styleUrl: './controle-acesso-form.component.scss'
})
export class ControleAcessoFormComponent implements OnInit {

  form: FormGroup;
  isViewMode = false;
  isEditMode = false;
  portoes: IPortao[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: ControleAcessoService,
    private portaoService: PortaoService
  ) {
    this.form = this.fb.group({
      id: [''],
      tag: ['', Validators.required],
      numero: ['', Validators.required],
      portao: ['', Validators.required]
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

    this.loadPortoes();
  }

  salvar(): void {
    if (this.form.valid) {
      const prestacaoServico: IControleAcesso = this.form.value;
      this.service.create(prestacaoServico).subscribe({
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
      const prestacaoServico: IControleAcesso = this.form.value;
      this.service.update(prestacaoServico).subscribe({
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
    this.router.navigate(['/controle-acesso']);
  }

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }

  loadPortoes(): void {
    this.portaoService.findAll().subscribe({
      next: (data) => {
        this.onSuccess(data.body);
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de portão', error);
      }
    });
  }

  protected onSuccess(data: any): void {
    this.portoes = data.content;
  }

}
