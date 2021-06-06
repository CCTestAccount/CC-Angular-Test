import firebase from "firebase/app";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { EventBusService } from "./event-bus.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggedIn: boolean = false
  currentUser?: firebase.User | null;

  constructor(
    public router: Router,
    private _snackBar: MatSnackBar,
    public db: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    public eventBusService: EventBusService
  ) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (!user) {
        router.navigate(['/login'])
        this.eventBusService.emit('on-deactivate-spinner')
      }
      this.currentUser = user
      this.isLoggedIn = (user != null)
    });
  }

  get = () => {
    return this.db.database.ref("users").get()
  }

  logout = () => {
    this.fireAuth.signOut()
    .then(() => {
      this._snackBar.open("Abgemeldet", "", {
        duration: 3000
      });
    })
  }

  login = (mail: string, password: string) => {
    this.fireAuth
      .signInWithEmailAndPassword(mail, password)
      .then((credentials: firebase.auth.UserCredential) => {
        this.onAuthorized(credentials)
      })
      .catch((ex) => {
        console.log(ex);
        this._snackBar.open(ex.code, "", {
          duration: 3000
        });
      });
  }

  register = (mail: string, password: string) => {
    this.fireAuth
      .createUserWithEmailAndPassword(mail, password)
      .then((credentials: firebase.auth.UserCredential) => {
        this.onAuthorized(credentials)
      })
      .catch((ex) => {
        console.log(ex);
        this._snackBar.open(ex.code, "", {
          duration: 3000
        });
      });
  };

  onAuthorized(credentials: firebase.auth.UserCredential) {
    this.currentUser = credentials.user;
    this.router.navigate(["/"]);
    this._snackBar.open(`Willkommen ${credentials.user?.email}!`, "", {
      duration: 3000
    });
  }
}
