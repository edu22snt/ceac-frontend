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
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { IVeiculo } from '../../../entities/veiculo';
import { MatNativeDateModule, MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: 'app-veiculo-form',
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
    MatOption,
    MatSelect,
    MatDatepickerModule,
    MatNativeDateModule,
],
  templateUrl: './veiculo-form.component.html',
  styleUrl: './veiculo-form.component.scss'
})
export class VeiculoFormComponent implements OnInit {

  form: FormGroup;
  isViewMode = false;
  isEditMode = false;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: VeiculoService
    ) {
    this.form = this.fb.group({
      id: [''],
      tipo: [''],
      modelo: [''],
      marca: [''],
      cor: [''],
      ano: [''],
      placa: ['', 
        [
          Validators.minLength(7),
          Validators.maxLength(8),
          Validators.required,
          Validators.pattern(/^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/)
        ]
      ]
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
      const veiculo: IVeiculo = this.form.value;
      this.service.create(veiculo).subscribe({
        next: () => {
          this.voltar();
          this.snackBar.open('Salvo com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: () => {

          this.snackBar.open('Erro ao salvar, possivelmente já exista um veiculo com essa placa.', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  update(): void {
    if (this.form.valid) {
      const veiculo: IVeiculo = this.form.value;
      this.service.update(veiculo).subscribe({
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
    this.router.navigate(['/veiculo']);
  }

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }

  formatarAno(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length > 4) {
      valor = valor.substring(0, 4);
    }

    event.target.value = valor;
    this.form.get('ano')?.setValue(valor, { emitEvent: false });
  }

  formatarPlaca(event: any): void {
    let valor = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');

    if (valor.length <= 3) {
      event.target.value = valor;
      this.form.get('placa')?.setValue(valor, { emitEvent: false });
      return;
    }

    if (/^[A-Z]{3}[0-9]/.test(valor)) {
      valor =
        valor.substring(0, 3) +
        '-' +
        valor.substring(3, 7);
    }

    valor = valor.substring(0, 8);

    event.target.value = valor;

    this.form.get('placa')?.setValue(valor, {
      emitEvent: false
    });
  }

}
