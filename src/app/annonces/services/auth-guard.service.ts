import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as firebase from 'firebase';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
          (resolve, reject) => {
            firebase.auth().onAuthStateChanged(
              (user) => {
                if(user) {
                  resolve(true);
                } else {
                  this.router.navigate(['/auth', 'signin']);
                  resolve(false);
                }
              }
            );
          }
        );
      }
    }