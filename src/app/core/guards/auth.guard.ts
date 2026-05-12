import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const jwt = localStorage.getItem('jwt');

  if (authService.isAdmin()) {
    return true;
  }

  if (!jwt) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
