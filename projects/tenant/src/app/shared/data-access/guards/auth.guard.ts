import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.authService.getLoggedUserStorage();

    if (currentUser) return true;

    return this.authService.fetchLoggedUser().pipe(
      tap((user) => this.authService.setLoggedUserStorage(user)),
      map(() => true),
      catchError((err) => {
        return of(err).pipe(map(() => this.router.createUrlTree(["/login"])));
      })
    );
  }
}
