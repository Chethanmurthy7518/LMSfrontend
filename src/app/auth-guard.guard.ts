import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles = route.data['role'] as Array<string>;
    console.log(roles);

    const userDetails = this.auth.getUserDetails();
    console.log(userDetails);

    if (userDetails && roles.includes(userDetails.role)) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
