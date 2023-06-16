import {
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthenticationStatus().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};

export const authGuard: CanActivateFn = (route, state) => {
  console.log({ route, state });
  return checkAuthStatus();
};
export const authMatchGuard: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
};
