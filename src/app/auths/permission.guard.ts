import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function permissionGuard(
  routerName : string
): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const permissions : string[] = authService.getPermission();
    if(permissions.includes(routerName)) {
      return true;
    }
    router.navigate(['/forbidden']);
    return false;
  };
}
