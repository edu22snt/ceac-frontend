import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Authority } from './core/config/authority.constants';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
    import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'principal',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'condominio',
        loadComponent: () =>
          import('./pages/condominio/condominio.component')
            .then(m => m.CondominioComponent)
      },
      {
        path: 'condominio-form',
        loadComponent: () =>
          import('./pages/condominio/form/condominio-form.component')
            .then(m => m.CondominioFormComponent)
      },
      {
        path: 'condominio/view/:id',
        loadComponent: () =>
          import('./pages/condominio/form/condominio-form.component')
            .then(m => m.CondominioFormComponent)
      },
      {
        path: 'condominio/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/condominio/form/condominio-form.component')
            .then(m => m.CondominioFormComponent)
      },
      {
        path: 'controle-acesso',
        loadComponent: () =>
          import('./pages/controle-acesso/controle-acesso.component')
            .then(m => m.ControleAcessoComponent)
      },
      {
        path: 'controle-acesso-form',
        loadComponent: () =>
          import('./pages/controle-acesso/form/controle-acesso-form.component')
            .then(m => m.ControleAcessoFormComponent)
      },
      {
        path: 'controle-acesso/view/:id',
        loadComponent: () =>
          import('./pages/controle-acesso/form/controle-acesso-form.component')
            .then(m => m.ControleAcessoFormComponent)
      },
      {
        path: 'controle-acesso/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/controle-acesso/form/controle-acesso-form.component')
            .then(m => m.ControleAcessoFormComponent)
      },
      {
        path: 'morador',
        loadComponent: () =>
          import('./pages/morador/morador.component')
            .then(m => m.MoradorComponent)
      },
      {
        path: 'morador-form',
        loadComponent: () =>
          import('./pages/morador/form/morador-form.component')
            .then(m => m.MoradorFormComponent)
      },
      {
        path: 'morador-form/view/:id',
        loadComponent: () =>
          import('./pages/morador/form/morador-form.component')
            .then(m => m.MoradorFormComponent)
      },
      {
        path: 'morador-form/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/morador/form/morador-form.component')
            .then(m => m.MoradorFormComponent)
      },
      {
        path: 'portao',
        loadComponent: () =>
          import('./pages/portao/portao.component')
            .then(m => m.PortaoComponent)
      },
      {
        path: 'portao-form',
        loadComponent: () =>
          import('./pages/portao/form/portao-form.component')
            .then(m => m.PortaoFormComponent)
      },
      {
        path: 'portao-form/view/:id',
        loadComponent: () =>
          import('./pages/portao/form/portao-form.component')
            .then(m => m.PortaoFormComponent)
      },
      {
        path: 'portao-form/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/portao/form/portao-form.component')
            .then(m => m.PortaoFormComponent)
      },
      {
        path: 'unidade',
        loadComponent: () =>
          import('./pages/unidade/unidade.component')
            .then(m => m.UnidadeComponent)
      },
      {
        path: 'unidade-form',
        loadComponent: () =>
          import('./pages/unidade/form/unidade-form.component')
            .then(m => m.UnidadeFormComponent)
      },
      {
        path: 'unidade/view/:id',
        loadComponent: () =>
          import('./pages/unidade/form/unidade-form.component')
            .then(m => m.UnidadeFormComponent)
      },
      {
        path: 'unidade/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/unidade/form/unidade-form.component')
            .then(m => m.UnidadeFormComponent)
      },
      {
        path: 'veiculo',
        loadComponent: () =>
          import('./pages/veiculo/veiculo.component')
            .then(m => m.VeiculoComponent)
      },
      {
        path: 'veiculo-form',
        loadComponent: () =>
          import('./pages/veiculo/form/veiculo-form.component')
            .then(m => m.VeiculoFormComponent)
      },
      {
        path: 'veiculo/view/:id',
        loadComponent: () =>
          import('./pages/veiculo/form/veiculo-form.component')
            .then(m => m.VeiculoFormComponent)
      },
      {
        path: 'veiculo/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/veiculo/form/veiculo-form.component')
            .then(m => m.VeiculoFormComponent)
      },
      {
        path: 'usuario',
        loadComponent: () =>
          import('./pages/usuario/usuario.component')
            .then(m => m.UsuarioComponent)
      },
      {
        path: 'usuario-form',
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: 'usuario-form/view/:id',
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: 'usuario-form/edit/:id',
        data: {
          authorities: [Authority.ADMIN],
        },
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];